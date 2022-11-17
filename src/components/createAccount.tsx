import React from "react";
import Select from "react-select";
import {backendUrl} from "../backendConfig";
import axios from "axios";
import "./createAccount.css";
import {getIdFromToken} from "../api/getIdFromToken";

const account_types = [
    { value: "fiat", label: "Fiat" },
    { value: "crypto", label: "Crypto" }
]

const fiat_currencies=[
    { value: "EUR", label: "EUR" },
    { value: "USD", label: "USD" },
    { value: "GBP", label: "GBP" },
    { value: "CHF", label: "CHF" },
    { value: "JPY", label: "JPY" },
    { value: "CNY", label: "CNY" },
    { value: "RUB", label: "RUB" },
    { value: "TRY", label: "TRY" },
    { value: "UAH", label: "UAH" },
];

const crypto_currencies=[
    { value: "BTC", label: "BTC" },
    { value: "ETH", label: "ETH" },
    { value: "XRP", label: "XRP" },
    { value: "BCH", label: "BCH" },
    { value: "LTC", label: "LTC" },
    { value: "EOS", label: "EOS" },
    { value: "XLM", label: "XLM" },
    { value: "ADA", label: "ADA" },
    { value: "XMR", label: "XMR" },
    { value: "DASH", label: "DASH" },
    { value: "NEO", label: "NEO" },
    { value: "TRX", label: "TRX" },
];


export default function CreateAccount(token: any) {
    const [type, setType] = React.useState(account_types[0]);
    const [currency, setCurrency] = React.useState(fiat_currencies[0]);
    const [currencyList, setCurrencyList] = React.useState(fiat_currencies);
    const [name, setName] = React.useState("");

    const updateType = (e: any) => {
        setType(e);
        if (e.value === "fiat") {
            setCurrencyList(fiat_currencies);
        } else {
            setCurrencyList(crypto_currencies);
        }
    }

    const updateCurrency = (e: any) => {
        setCurrency(e);
    }

    const onSubmit = (e: any) => {
        e.preventDefault();

        getIdFromToken(token.token).then((id: any) => {
            const request = {
                master_id: id._id,
                name: name,
                currency: currency.value,
            }

            axios.post(backendUrl+"/account/crypto", request)
                .then(res => {
                    console.log("CreateAccount.tsx: onSubmit: res: ", res);
                    window.history.pushState({}, "", "/dashboard");
                })
        })
    }

    return(
        <div className="createAccount-wrapper">
            <h1>Create Account</h1>
            <form className="form" onSubmit={onSubmit}>
                <label>
                    <p>Type</p>
                    <Select onChange={updateType} options={account_types}></Select>
                </label>
                <label>
                    <p>Currency</p>
                    <Select onChange={updateCurrency} options={currencyList}></Select>
                </label>
                <label>
                    <input onChange={e => setName(e.target.value)} id="account_name" type="text" placeholder="Account Name" />
                </label>
                <div>
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </div>
    );
}