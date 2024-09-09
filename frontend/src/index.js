// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { initializeApp } from "firebase/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "./theme/themeOptions";

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

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Global reset for consistent styling */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
