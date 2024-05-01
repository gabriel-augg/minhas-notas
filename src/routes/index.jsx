import { Route, Routes } from "react-router-dom"
import Register from "../pages/Register";
import Home from "../pages/Home";
import Private from "./Private";

const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/cadastrar" element={<Register/>} />
            <Route path="/" element={ <Private><Home/></Private> }/>
        </Routes>
    )
}

export default AppRoutes;