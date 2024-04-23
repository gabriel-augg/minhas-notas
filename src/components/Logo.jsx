import logo from "../assets/logo.svg"
import { Link } from "react-router-dom"

export default function Logo(){
    return(
        <Link to="/">
            <img src={logo} width={100} alt="logo" />
        </Link>
    )
}