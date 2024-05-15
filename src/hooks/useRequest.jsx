import api from "../utils/api";
import { toast } from "react-toastify";

const useRequest = () => {
    async function request(url, options) {
        try {
            const response = await api.request({
                url,
                ...options,
            });

            return response;
        } catch (error) {
            if (!error.response?.data) {
                toast.error("Sem conexão com o servidor!");
                return;
            }
            const message = error.response.data.message;
            toast.error(message);
        }
    }

    return { request };
};

export default useRequest;
