import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUTsweJ2n9l2my7eT4bQHijXWLtM7ypbs",
  authDomain: "cheapr-fc010.firebaseapp.com",
  databaseURL: "https://cheapr-fc010-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cheapr-fc010",
  storageBucket: "cheapr-fc010.appspot.com",
  messagingSenderId: "197284313526",
  appId: "1:197284313526:web:4188ad03e366c745d9a917",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
