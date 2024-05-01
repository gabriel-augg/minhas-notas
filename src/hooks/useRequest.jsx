import api from "../utils/api"

const useRequest = () => {
    async function request(url, options){
        try {
            const response = await api.request({
                url,
                ...options
            })

            
            return response
        } catch (error) {

        }
    }

    return { request }
}

export default useRequest;