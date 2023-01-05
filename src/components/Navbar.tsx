import React from "react";
import "./Navbar.css";
import AppBar from '@mui/material/AppBar';
import {Button, Container, Link, Toolbar, Typography} from "@mui/material";

// Horizontal navigation bar
// Login and logout buttons, and a link to the home page
// Dashboard button is only visible when logged in
// Login button is only visible when logged out
// Logout button is only visible when logged in

export default function Navbar() {
    return(
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link href="/" color="inherit" underline="none">Banking App</Link>
                    </Typography>
                    <Button color="inherit" href="/dashboard">Dashboard</Button>
                    <Button color="inherit" href="/login">Login</Button>
                    <Button color="inherit" href="/logout">Logout</Button>
                </Toolbar>
            </Container>
        </AppBar>

    );
}