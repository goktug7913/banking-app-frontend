import React from 'react';
import axios from "axios";
import {backendUrl} from "../../backendConfig";
import "./Dashboard.css";

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

    return(
        <div className="dashboard">
            <h2>Dashboard</h2>
            <p>Welcome back {dashboard.name}.</p>
            <p>Here you can see your accounts and transactions.</p>
            <div className="dashboard__accounts">
                <div className="dashboard__accounts__fiat">
                    <h4>Fiat accounts</h4>
                    <ul>
                        {dashboard.fiat_accounts.map((account, index) => {
                            return <li key={index}>{account}</li>
                        })}
                    </ul>
                </div>
                <div className="dashboard__accounts__crypto">
                    <h4>Crypto accounts</h4>
                    <ul>
                        {dashboard.crypto_accounts.map((account, index) => {
                            return <li key={index}>{account}</li>
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}