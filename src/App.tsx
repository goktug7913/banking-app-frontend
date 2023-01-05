import React from 'react';
import {useContext} from "react";
import {Route, Routes } from 'react-router-dom';

import useToken from './hooks/useToken';
import CreateAccount from "./components/createAccount";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {UserCtx} from "./context/UserState";


function App() {

    const [token, saveToken] = useToken();

    if(!token) {
        console.log("App.tsx: token: ", token);
        // Redirect to login page
        //window.history.pushState({}, "", "/login");
        // refresh page
        //window.location.reload();
    }

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const UserContext = useContext(UserCtx);

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <UserContext.Provider value={{token, saveToken}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={[<Navbar key={"1"}/>,<Home key={"2"}/>]} />
                    <Route path="/dashboard" element={[<Navbar key={"1"}/>,<Dashboard key={"2"}/>]} />
                    <Route path="/login" element={[<Navbar key={"1"}/>,<Login key={"2"} setToken={saveToken} />]} />
                    <Route path="/logout" element={[<Navbar key={"1"}/>,<Home key={"2"}/>]} />
                    <Route path="/createAccount" element={[<Navbar key={"1"}/>,<CreateAccount key={"2"} token={token}/>]} />
                </Routes>
            </BrowserRouter>
            </UserContext.Provider>
        </ThemeProvider>
    );
}

export default App;
