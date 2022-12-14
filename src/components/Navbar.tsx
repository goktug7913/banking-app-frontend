import React from "react";
import {useContext} from "react";
import "./Navbar.css";
import AppBar from '@mui/material/AppBar';
import {Button, Container, Link, Toolbar, Typography} from "@mui/material";
import {UserCtx} from "../context/UserState";

// Horizontal navigation bar
// Login and logout buttons, and a link to the home page
// Dashboard button is only visible when logged in
// Login button is only visible when logged out
// Logout button is only visible when logged in

export default function Navbar() {
    const UserContext = useContext(UserCtx);

    const logout = () => {
        sessionStorage.removeItem('user');
        // We will get redirected to the home page by a href
    }

    return(
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link href="/" color="inherit" underline="none">Banking App</Link>
                    </Typography>
                    {UserContext.user.account_id ? <Button color="primary" href="/dashboard">Dashboard</Button> : null}
                    {UserContext.user.account_id ? null : <Button color="primary" href="/login">Login</Button>}
                    {UserContext.user.account_id ? <Button color="primary" href="/logout" onClick={logout}>Logout</Button> : <Button color="primary" href="/register">Register</Button>}
                    {UserContext.user.account_id ? <Typography variant="body1">{UserContext.user.name + " " + UserContext.user.surname}</Typography> : null}
                </Toolbar>
            </Container>
        </AppBar>

    );
}