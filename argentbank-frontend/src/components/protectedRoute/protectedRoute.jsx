import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
  const token = useSelector((state) => state.user.token);

  if (!token) {
    return <Navigate to="/signin" />;
  }

  return children;
}

export default ProtectedRoute;
