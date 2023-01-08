import React, {useContext, useState} from "react";
import axios from "axios";
import {backendUrl} from "../../backendConfig";
import {
    Alert,
    Box,
    Button,
    Checkbox,
    Container,
    Fade,
    FormControlLabel,
    FormLabel, Link,
    TextField
} from "@mui/material";
import {UserCtx} from "../../context/UserState";

interface user {
    account_id: string,
    password: string
}

// @ts-ignore
export default function Login() {
    const [user, setUser] = useState<user>({account_id: "", password: ""});
    const [error, setError] = useState("");

    const UserContext = useContext(UserCtx);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Let's clear the error message if there is one
        setError("");

        loginUser(user).then(data => {
            console.log("Login.tsx: handleSubmit: data: ", data);
            // Set context
            UserContext.setUser(data);
            // Redirect to dashboard page
            window.history.pushState({}, "", "/dashboard");
            const navEvent = new PopStateEvent('popstate');
            window.dispatchEvent(navEvent);
        }).catch(err => {
            console.log("Login.tsx: handleSubmit: err: ", err);
            setError(err);
        });
    }

    function loginUser(credentials: any) {
        console.log("Login.tsx: loginUser: request: ", credentials);
        const url = backendUrl + "/login";
        return axios.post(url, credentials)
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err);
                setError(err.response.data);
            });
    }

    return(
        <Container>
            <h1>Please Log In</h1>
            <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
                <TextField margin="normal" required fullWidth autoFocus label="Username" type="text" onChange={e => setUser({...user, account_id: e.target.value})}/>
                <TextField margin="normal" required fullWidth label="Password" type="password" onChange={e => setUser({...user, password: e.target.value})}/>
                <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me"/>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Submit</Button>
                <FormLabel>No account yet? <Link href="/register">Register</Link></FormLabel>

                <Fade in={error !== ""} style={{transitionDuration: "500ms"}}>
                    <Alert severity="error">{error}</Alert>
                </Fade>

                <Fade in={true} style={{transitionDuration: "500ms"}}>
                    <Alert severity="info">
                        You can use the testing account <br/>
                        Username: test <br/>
                        Password: test
                    </Alert>
                </Fade>
            </Box>
        </Container>
    )
}