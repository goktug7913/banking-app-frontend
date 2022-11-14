import React, {useState} from "react";
import axios from "axios";
import {backendUrl} from "../../backendConfig";
import PropTypes from 'prop-types';
import './Login.css';

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

    const onSubmit = (e: any) => {
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
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={onSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUser({...user, account_id: e.target.value})}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setUser({...user, password: e.target.value})}/>
                </label>
                <div>
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </div>
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