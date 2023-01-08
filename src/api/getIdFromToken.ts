import axiosInstance from "./AxiosInstance";

export const getIdFromToken = async (token: string) => {
    // TODO: this might be totally unnecessary, as we already have the account id when we log in
    const response = await axiosInstance.get('/account/id', {
        headers: {
            'authorization': `${token}`
        }
    });
    return response.data;
}