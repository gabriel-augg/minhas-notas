import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import { useNavigate } from "react-router-dom"


const Private = ({children}) => {
    const { authenticated } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(()=>{
        if(!authenticated) {
            navigate("/login")
        }
    },[authenticated])


    return authenticated ? children : <></>
}

export default Private;