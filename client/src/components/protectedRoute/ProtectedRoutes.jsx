import { Navigate, useLocation } from "react-router-dom";
import getAuthState from "../../services/getAuth";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const location = useLocation();
  const { isAuthed, user } = getAuthState();

  if (!isAuthed) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (adminOnly && !user?.isAdmin) {
    return <Navigate to="/403" replace />;
  }

  return children;
}
