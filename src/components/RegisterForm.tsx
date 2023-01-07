import useToken from "../hooks/useToken";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../api/AxiosInstance";
import {Alert, Box, Button, Checkbox, Container, FormControlLabel, Select, TextField} from "@mui/material";
export const RegisterForm = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [token, saveToken] = useToken();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== password2) {
            setError("Passwords do not match");
        }
        else {
            try {
                const response = await axiosInstance.post("/register", {
                    name: name,
                    surname: surname,
                    email: email,
                    password: password
                });
                console.log(response.data);
                saveToken(response.data.token);
                navigate("/dashboard");
            } catch (e) {
                setError("An error occurred");
            }
        }
    };

    return (
        <Container>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <h1>Register</h1>
                <TextField margin="normal" required fullWidth autoFocus
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                />
                <TextField margin="normal" required fullWidth
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    placeholder="Surname"
                />
                <TextField margin="normal" required fullWidth
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <TextField margin="normal" required fullWidth
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <TextField margin="normal" required fullWidth
                    type="password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    placeholder="Confirm password"
                />
                <FormControlLabel control={<Checkbox value="tos" color="primary" />} label="I agree to the Terms of Service"/>
                {error && <Alert severity="error">{error}</Alert>}
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Register</Button>
            </Box>
        </Container>
    );
};