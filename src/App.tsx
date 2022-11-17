import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import useToken from './hooks/useToken';
import './App.css';
import CreateAccount from "./components/createAccount";

function App() {

    const [token, saveToken] = useToken();

    if(!token) {
        console.log("App.tsx: token: ", token);
        // Redirect to login page
        window.history.pushState({}, "", "/login");
        // refresh page
        window.location.reload();
    }

    return (
        <div className="wrapper">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={[<Navbar key={"1"}/>,<Home key={"2"}/>]} />
                    <Route path="/dashboard" element={[<Navbar key={"1"}/>,<Dashboard key={"2"}/>]} />
                    <Route path="/login" element={[<Navbar key={"1"}/>,<Login key={"2"} setToken={saveToken} />]} />
                    <Route path="/logout" element={[<Navbar key={"1"}/>,<Home key={"2"}/>]} />
                    <Route path="/createAccount" element={[<Navbar key={"1"}/>,<CreateAccount key={"2"} token={token}/>]} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
