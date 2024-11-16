import { Navigate } from "react-router-dom";

const MasterRoutes = ({ children }) => {
  const isMaster = localStorage.getItem("isMaster");
  const token = sessionStorage.getItem("token");
  const user = localStorage.getItem("user");
  return isMaster === "true" && token && user ? (
    children
  ) : (
    <Navigate to="/not-found" />
  );
};

export default MasterRoutes;
