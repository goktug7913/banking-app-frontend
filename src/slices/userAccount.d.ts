// Type for userAccount slice
export interface UserAccountState {
    account_id: string;
    name: string;
    surname: string;
    email: string;
    fiat_accounts: string[];
    crypto_accounts: string[];
    transactions: string[];
}