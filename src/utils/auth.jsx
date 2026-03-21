import { Navigate, useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

export const Logout = (navigate) => {
  localStorage.clear();
  navigate("/login");
};
