import { Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute";
import EditUser from "../pages/EditUser";

const AppRoutes = () => {
  return (
    <Routes>      
      <Route path="/cadastrar" element={<Register />} />
      <Route path="/entrar" element={<Login />} />
      <Route path="/editar" element={ <PrivateRoute><EditUser /></PrivateRoute> } />
      <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>} />
    </Routes>
  );
};

export default AppRoutes;
