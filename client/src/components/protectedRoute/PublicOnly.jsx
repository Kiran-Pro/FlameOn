import { Navigate, useLocation } from "react-router-dom";
import getAuthState from "../../services/getAuth";

export default function PublicOnly({ children }) {
  const { isAuthed } = getAuthState();
  const location = useLocation();
  return isAuthed ? (
    <Navigate to="/profile" replace state={{ from: location }} />
  ) : (
    children
  );
}
