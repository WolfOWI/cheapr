import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, set, get, child } from "firebase/database"; // For real-time database operation
import app from "../firebaseConfig";

const auth = getAuth(app); // Initialize Firebase Auth
const db = getDatabase(app); // Initialize Firebase Realtime Database

export { auth };

// Sign up a new user and save their additional info
export const signUpUser = async (email, password, firstName, lastName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save additional user information in the Realtime Database
    const userRef = ref(db, `users/${user.uid}`);
    await set(userRef, {
      userId: user.uid,
      firstName,
      lastName,
      email: user.email,
      isAdmin: false, // Default to false for new users
      cart: [], // Empty cart by default
    });

    return user;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

// Log in a user (for both normal users and admin)
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Fetch user details from Realtime Database
    const userSnapshot = await get(child(ref(db), `users/${user.uid}`));
    if (userSnapshot.exists()) {
      return { ...user, ...userSnapshot.val() }; // Combine auth and database info
    } else {
      console.error("No user data found in database");
      return user; // Just return the auth user if no extra data is found
    }
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Log out the current user
export const logOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

// Function to check if user is authenticated
export const authStateListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};
