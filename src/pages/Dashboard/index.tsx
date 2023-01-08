import React, {useContext} from 'react';
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
import {UserCtx} from "../../context/UserState";




export default function Dashboard() {
    const UserContext = useContext(UserCtx).user;

    function CreateNewAccount() {
        // Redirect to creation page
        window.history.pushState({}, "", "/createAccount");
        window.location.reload();
    }

    return(
        <Container sx={{}}>
            <Typography variant="h4">Dashboard</Typography>
            <Typography variant="h6">Welcome back {UserContext.name}.</Typography>
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
                            {UserContext && !UserContext.fiat_accounts.length && <Typography variant="body1">No fiat accounts yet.</Typography>}
                            {UserContext.fiat_accounts.map((account, index) => {
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
                            {UserContext && !UserContext.crypto_accounts.length && <Typography variant="body1">No crypto accounts yet.</Typography>}
                            {UserContext.crypto_accounts.map((account, index) => {
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