import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;