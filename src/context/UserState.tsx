import React, {createContext} from "react";

interface UserAccountInterface {
    account_id: string;
    name: string;
    surname: string;
    email: string;
    fiat_accounts: string[];
    crypto_accounts: string[];
    transactions: string[];
}

interface ContextProps {
    user: UserAccountInterface;
    setUser: React.Dispatch<React.SetStateAction<UserAccountInterface>>;
}

export const UserCtx = createContext<ContextProps>({
    user: {
        account_id: '',
        name: '',
        surname: '',
        email: '',
        fiat_accounts: [],
        crypto_accounts: [],
        transactions: [],
    },
    setUser: () => {},
});

// For Child Components
type Props = {
    children?: React.ReactNode
};

export const UserProvider: React.FC<Props> = ({children}) => {
    const [user, setUser] = React.useState<UserAccountInterface>({
        account_id: '',
        name: '',
        surname: '',
        email: '',
        fiat_accounts: [],
        crypto_accounts: [],
        transactions: [],
    });

    return (
        <UserCtx.Provider value={{user, setUser}}>
            {children}
        </UserCtx.Provider>
    );
};