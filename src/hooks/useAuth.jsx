import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../utils/api"
import useRequest from "./useRequest"

const useAuth = () => {
    const [authenticated, setAuthenticated] = useState(false)
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const { request } = useRequest()

    useEffect(()=>{
        const token = localStorage.getItem("token")
        if(token){
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            request("/users/check-user", {
                method: "get"
            })
            .then(({data})=> {
                setUser(data.user)
                setAuthenticated(true)
            })
        }

    },[])

    async function authUser(token){
        localStorage.setItem("token", JSON.stringify(token))
        api.defaults.headers.Authorization = `Bearer ${token}`
        request("/users/check-user", {
            method:"get"
        })
        .then(({data}) => {
            setUser(data.user)
            setAuthenticated(true)
            navigate("/")
        })
    }


    async function signUp(user){
        const { data } = await request("/auth/sign-up", {
            method: "post",
            data: user
        })
        await authUser(data.token)
    }

    return { user, authenticated, signUp }

}

export default useAuth;