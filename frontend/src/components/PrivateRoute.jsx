import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth"; // Firebase hooks to track auth state
import { getAuth } from "firebase/auth"; // Firebase auth
import app from "../firebaseConfig";

const auth = getAuth(app);

function PrivateRoute({ children, isAdmin = false }) {
  const [user, loading] = useAuthState(auth); // Track auth state

  if (loading) return <p>Loading...</p>;

  if (!user) {
    // If user is not logged in, redirect to login
    return <Navigate to="/login" />;
  }

  // If this is an admin-only route, check if the user is an admin
  if (isAdmin && user.email !== "admin@cheapr.com") {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;
