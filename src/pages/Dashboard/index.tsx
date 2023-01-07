import React from 'react';
import axios from "axios";
import {backendUrl} from "../../backendConfig";
//import "./Dashboard.css";
//@ts-ignore
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {
    Button,
    Container,
    List,
    Stack,
    Typography,
    ListItem,
    Divider,
    Box,
    ListItemText,
    ListItemIcon,
} from "@mui/material";


function CreateNewAccount() {
    // Redirect to creation page
    window.history.pushState({}, "", "/createAccount");
}

export default function Dashboard() {
    // Let's define the state for the dashboard
    const [dashboard, setDashboard] = React.useState({
        "name": "",
        "surname": "",
        "email": "",
        "fiat_accounts": [],
        "crypto_accounts": [],
        "transactions": []
    });

    // Get the token from the local storage and convert it to JSON
    // @ts-ignore
    const token = JSON.parse(localStorage.getItem("token"));

    // Let's define the function to get the dashboard data
    const getDashboard = async () => {
        const response = await axios.get(`${backendUrl}/account`, {
            data: {
                "_id": token?._id
            }
        });
        console.log("Dashboard.tsx: response.data: ", response.data);
        setDashboard(response.data);
    }

    // useEffect hook to get the dashboard data
    React.useEffect(() => {
        getDashboard().then();
    });

    try {
        //getDashboard().then();
    }catch (e) {
        console.log("Dashboard.tsx: error: ", e);
    }

    return(
        <Container sx={{}}>
            <Typography variant="h4">Dashboard</Typography>
            <Typography variant="h6">Welcome back {dashboard.name}.</Typography>
            <p>Here you can see your accounts and transactions.</p>

            <Stack direction="row" gap={4} sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
            }}>
                <Box sx={{}}>
                    <Stack direction="column" gap={4} sx={{}}>
                        <Stack direction="row" gap={2}>
                            <Typography variant="h6">Fiat accounts</Typography>
                            <Button variant="outlined" className="create" onClick={CreateNewAccount}>New Account</Button>
                        </Stack>

                        <List>
                            {dashboard && !dashboard.fiat_accounts.length && <Typography variant="body1">No fiat accounts yet.</Typography>}
                            {dashboard.fiat_accounts.map((account, index) => {
                                return(
                                    <ListItem key={index} alignItems="center">
                                        <ListItemIcon children={<AccountBalanceWalletIcon/>}/>
                                        <ListItemText primary={"ID: " + account}  />
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Stack>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box sx={{}}>
                    <Stack direction="column" gap={4} sx={{}}>
                        <Stack direction="row" gap={2}>
                            <Typography variant="h6">Crypto accounts</Typography>
                            <Button variant="outlined" className="create" onClick={CreateNewAccount}>New Account</Button>
                        </Stack>

                        <List>
                            {dashboard && !dashboard.crypto_accounts.length && <Typography variant="body1">No crypto accounts yet.</Typography>}
                            {dashboard.crypto_accounts.map((account, index) => {
                                return(
                                <ListItem key={index} alignItems="center">
                                    <ListItemIcon children={<AccountBalanceWalletIcon/>}/>
                                    <ListItemText primary={"ID: " + account}  />
                                </ListItem>
                                )
                            })}
                        </List>
                    </Stack>
                </Box>

            </Stack>
        </Container>
    );
}