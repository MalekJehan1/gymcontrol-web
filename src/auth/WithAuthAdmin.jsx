import { Navigate } from "react-router-dom";
import { getToken, getUsuario } from "./Autenticacao";

const WithAuthAdmin = (Component) => {
  const AdminRoute = () => {
    const isAuth = getToken() ? true : false;
    const usuario = getUsuario();

    if (!isAuth) {
      return <Navigate to="/login" />;
    }

    if (usuario?.tipo !== "admin") {
      return <Navigate to="/home" />; // bloqueia acesso
    }

    return <Component />;
  };

  return AdminRoute;
};

export default WithAuthAdmin;
