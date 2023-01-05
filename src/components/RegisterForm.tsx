import useToken from "../hooks/useToken";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
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
        // Check ToS checkbox
        else {
            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    surname,
                    email,
                    password,
                }),
            });
            const content = await response.json();
            if (content.error) {
                setError(content.error);
            } else {
                saveToken(content.token);
                navigate("/dashboard");
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