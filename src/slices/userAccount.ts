import {createSlice} from '@reduxjs/toolkit';
import {UserAccountState} from './userAccount.d'; // use type from userAccount.d.ts

// Define the initial state using that type
const initialState: UserAccountState = {
    account_id: '',
    name: '',
    surname: '',
    email: '',
    fiat_accounts: [],
    crypto_accounts: [],
    transactions: [],
}

export const userAccountSlice = createSlice({
    name: 'userAccount',
    initialState,
    reducers: {
        // Define a reducer
        setAccount: (state, action) => {
            state.account_id = action.payload.account_id;
            state.name = action.payload.name;
            state.surname = action.payload.surname;
            state.email = action.payload.email;
            state.fiat_accounts = action.payload.fiat_accounts;
            state.crypto_accounts = action.payload.crypto_accounts;
            state.transactions = action.payload.transactions;
        },
        resetAccount: (state) => {
            state.account_id = '';
            state.name = '';
            state.surname = '';
            state.email = '';
            state.fiat_accounts = [];
            state.crypto_accounts = [];
            state.transactions = [];
        }
    }
});