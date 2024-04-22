import { Route, Routes } from "react-router-dom"
import Login from "../pages/Login";

const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/entrar" element={<Login/>} />
        </Routes>
    )
}

export default AppRoutes;