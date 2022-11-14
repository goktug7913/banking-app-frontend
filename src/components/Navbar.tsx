import React from "react";
import "./Navbar.css";

// Horizontal navigation bar
// Login and logout buttons, and a link to the home page
// Dashboard button is only visible when logged in
// Login button is only visible when logged out
// Logout button is only visible when logged in

export default function Navbar() {
    return(
        <div className="navbar">
            <p className="title">Bank App</p>
            <a className="a" href="/">Home</a>
            <a className="a" href="/dashboard">Dashboard</a>
            <a className="a" href="/login">Login</a>
            <a className="a" href="/logout">Logout</a>
        </div>
    );
}