import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// Import Routes
import productRoutes from "./routes/productRoutes.js";
import categoryOperationsRoutes from "./routes/categoryOperationsRoutes.js";
import breadcrumbRoutes from "./routes/breadcrumbRoutes.js";
import userRoutes from "./routes/userRoutes.js";

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
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Example route to check backend is working
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// ROUTES
// -----------------------------------------------------
// Category Routes
app.use("/categories", categoryOperationsRoutes);

// Breadcrumb Routes
app.use("/breadcrumb", breadcrumbRoutes);

// Product Routes
app.use("/products", productRoutes);

// User Routes
app.use("/user", userRoutes);
// -----------------------------------------------------

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
