import axiosInstance from "./AxiosInstance";

export const getMasterAccount = async (token: string) => {
    const response = await axiosInstance.get('/account/master', {
        headers: {
            'authorization': `${token}`
        }
    });
}