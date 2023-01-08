import React from 'react';
import {useContext} from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {UserCtx, UserProvider} from "./context/UserState";
import useToken from './hooks/useToken';

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import {Register} from "./pages/Register";
import Navbar from "./components/Navbar";
import CreateAccount from "./components/createAccount";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import darkScrollbar from '@mui/material/darkScrollbar';

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
        components: {
            MuiCssBaseline: {
                styleOverrides: (themeParam) => ({
                    body: themeParam.palette.mode === 'dark' ? darkScrollbar() : null,
                }),
            },
        },
    });

    const UserContext = useContext(UserCtx);

    return (
        <UserProvider>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline enableColorScheme={true} />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={[<Navbar key={"1"}/>,<Home key={"2"}/>]} />
                        <Route path="/dashboard" element={[<Navbar key={"1"}/>,<Dashboard key={"2"}/>]} />
                        <Route path="/login" element={[<Navbar key={"1"}/>,<Login key={"2"} />]} />
                        <Route path="/logout" element={[<Navbar key={"1"}/>,<Home key={"2"} />]} />
                        <Route path="/register" element={[<Navbar key={"1"}/>,<Register key={"2"} />]} />
                        <Route path="/createAccount" element={[<Navbar key={"1"}/>,<CreateAccount key={"2"} token={token}/>]} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </UserProvider>
    );
}

export default App;
