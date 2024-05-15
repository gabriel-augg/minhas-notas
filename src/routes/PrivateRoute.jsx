import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

/// ATENÇÃO: O código possui um sistema de loading implementado no projeto.
/// Se a API estiver hospedada no localhost, o loading não será exibido.
/// Se quiser testar o loading, hospede a API em um servidor externo 
/// ou então implemente um delay nas requisições.

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
    <div className="h-screen flex justify-center items-center">
        <div className="loading loading-bars bg-lime-200 loading-lg"></div>
    </div>
);
};

export default PrivateRoute;
