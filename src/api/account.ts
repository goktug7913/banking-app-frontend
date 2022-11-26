import axios from "axios";
import {backendUrl} from "../backendConfig";

export const getMasterAccount = async (token: string) => {
    const response = await axios.get(backendUrl + '/account/master', {
        headers: {
            'authorization': `${token}`
        }
    });
}