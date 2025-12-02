import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!user) {
    if (location.pathname === "/profile" || location.pathname === "/update-profile") {
      return <Navigate to="/user" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
