import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import app from "../firebaseConfig";
import { useState, useEffect } from "react";
import { getDatabase, ref, get, child } from "firebase/database"; // For real-time database
import Loader from "react-spinners/ClipLoader";

const auth = getAuth(app);
const db = getDatabase(app);

function PrivateRoute({ children, isAdmin = false }) {
  const [user, loading] = useAuthState(auth); // Track auth state
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [loadingAdminStatus, setLoadingAdminStatus] = useState(true); // New loading state for admin check

  useEffect(() => {
    if (user) {
      const userRef = ref(db, `users/${user.uid}`);
      get(child(userRef, "isAdmin"))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setIsAdminUser(snapshot.val());
          }
          setLoadingAdminStatus(false); // Stop loading after checking admin status
        })
        .catch((error) => {
          console.error("Error fetching admin status:", error);
          setLoadingAdminStatus(false);
        });
    } else {
      setLoadingAdminStatus(false); // If no user, stop admin status check
    }
  }, [user]);

  if (loading || loadingAdminStatus) {
    return (
      <div className="w-full flex justify-center items-center mt-20">
        <Loader color="#C34534" loading={true} />
      </div>
    );
  } // Wait for both auth and admin status

  // Redirect non-logged-in users to the login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Redirect non-admins trying to access admin routes
  if (isAdmin && !isAdminUser) {
    return <Navigate to="/" />;
  }

  // Render children if authorised
  return children;
}

export default PrivateRoute;
