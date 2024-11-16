import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const token = sessionStorage.getItem("token");
  const user = localStorage.getItem("user");
  return token && user ? children : <Navigate to="/admin-login" />;
};

export default PrivateRoutes;
