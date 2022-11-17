import axios from "axios";
import {backendUrl} from "../backendConfig";

export const getIdFromToken = async (token: string) => {
    const response = await axios.get(backendUrl + '/account/id', {
        headers: {
            'authorization': `${token}`
        }
    });
    return response.data;
}