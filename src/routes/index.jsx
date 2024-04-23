import { Route, Routes } from "react-router-dom"
import Register from "../pages/Register";
import Home from "../pages/Home";

const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/cadastrar" element={<Register/>} />
            <Route path="/" element={<Home/>}/>
        </Routes>
    )
}

export default AppRoutes;