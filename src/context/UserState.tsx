import React, {createContext, useEffect} from "react";
import axiosInstance from "../api/AxiosInstance";

interface UserAccountInterface {
    token: string;
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
        token: "",
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
        token: "",
        account_id: '',
        name: '',
        surname: '',
        email: '',
        fiat_accounts: [],
        crypto_accounts: [],
        transactions: [],
    });

    // Check if the user is already logged in, and if so, validate the token
    useEffect(() => {
        if (!(sessionStorage.getItem('user'))) {
            console.log("No user found in session storage");
            return;
        }

        setUser(JSON.parse(sessionStorage.getItem('user') as string) as UserAccountInterface);

        axiosInstance.post("/api/validate")
            .then((result) => {
                    if (result.status === 200) {
                        // Token is valid, set the user's next spin time
                    }
                }
            ).catch((err: any) => {
            console.log(err);
            // Token is invalid, let's log the user out
            sessionStorage.removeItem('user');
            setUser(null as unknown as UserAccountInterface);
        });
    }, []);

    // Update the session storage when the user changes
    useEffect(() => {
        if(user.account_id && user.token) {
            sessionStorage.setItem('user', JSON.stringify(user));
        }
    }, [user]);

    return (
        <UserCtx.Provider value={{user, setUser}}>
            {children}
        </UserCtx.Provider>
    );
};

