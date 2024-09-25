import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";

// Load .env variables in
dotenv.config();

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Example route to check backend is working
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// Product Routes
app.use("/products", productRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
