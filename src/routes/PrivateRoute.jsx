import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { authenticated, loading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!authenticated) {
        navigate("/entrar");
      }
    }
  }, [loading]);

return authenticated ? children : (
    <div className="min-h-screen flex justify-center items-center">
        <div className="loading loading-bars bg-lime-200 loading-lg"></div>
    </div>
);
};

export default PrivateRoute;
