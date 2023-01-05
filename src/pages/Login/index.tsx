import React, {useState} from "react";
import axios from "axios";
import {backendUrl} from "../../backendConfig";
import PropTypes from 'prop-types';
import './Login.css';
import {Box, Button, Checkbox, Container, FormControlLabel, FormLabel, TextField} from "@mui/material";

interface user {
    account_id: string,
    password: string
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};

// @ts-ignore
export default function Login({ setToken }) {
    const [user, setUser] = useState<user>({account_id: "", password: ""});

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Login.tsx: handleSubmit: user: ", user);
        loginUser(user).then(data => {
            console.log("Login.tsx: handleSubmit: data: ", data);
            setToken(data);
            // Redirect to dashboard page
            window.history.pushState({}, "", "/dashboard");
        });
    }

    console.log(user);

    return(
        <Container>
            <h1>Please Log In</h1>
            <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
                <TextField margin="normal" required fullWidth autoFocus label="Username" type="text" onChange={e => setUser({...user, account_id: e.target.value})}/>
                <TextField margin="normal" required fullWidth label="Password" type="password" onChange={e => setUser({...user, password: e.target.value})}/>
                <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me"/>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Submit</Button>
                <FormLabel>No account yet?</FormLabel> <a href="/register">Register</a>
            </Box>
        </Container>
    )
}

function loginUser(credentials: any) {
    console.log("Login.tsx: loginUser: request: ", credentials);
    const url = backendUrl + "/login";
    console.log("Login.tsx: loginUser: url: ", url);
    return axios.post(url, credentials)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.log(err);
        })
}