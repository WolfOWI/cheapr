import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import app from "../firebaseConfig";
import { useState, useEffect } from "react";
import { getDatabase, ref, get, child } from "firebase/database"; // Real-time database

const auth = getAuth(app);
const db = getDatabase(app);

function PrivateRoute({ children, isAdmin = false }) {
  const [user, loading] = useAuthState(auth); // Track auth state
  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    if (user) {
      // Fetch user details from the database
      const userRef = ref(db, `users/${user.uid}`);
      get(child(userRef, "isAdmin")).then((snapshot) => {
        if (snapshot.exists()) {
          setIsAdminUser(snapshot.val());
        }
      });
    }
  }, [user]);

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (isAdmin && !isAdminUser) {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;
