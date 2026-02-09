import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user =
    JSON.parse(localStorage.getItem("currentUser")) ||
    JSON.parse(sessionStorage.getItem("currentUser"));

  if (!user) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return children;
};

export default ProtectedRoute;
