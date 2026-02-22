import { Navigate, Outlet } from "react-router";

// Make sure { isAuthenticated } is inside the brackets!
const ProtectedRoute = ({ isAuthenticated }) => {
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;