import { Route, Routes } from "react-router-dom"
import Login from "../pages/Login";
import Home from "../pages/Home";

const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/entrar" element={<Login/>} />
            <Route path="/" element={<Home/>}/>
        </Routes>
    )
}

export default AppRoutes;