import React, {createContext} from "react";

export interface UserAccountInterface {
    account_id: string;
    name: string;
    surname: string;
    email: string;
    fiat_accounts: string[];
    crypto_accounts: string[];
    transactions: string[];
}

export const UserCtx = createContext<UserAccountInterface | null>(null);