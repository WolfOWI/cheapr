import express from "express";
import admin from "firebase-admin";

const router = express.Router();

// CREATE
// -----------------------------------------------------
// Create a new product
router.post("/", async (req, res) => {
  try {
    const productData = req.body;
    const ref = admin.database().ref("products").push();
    await ref.set(productData);

    res.status(200).json({ id: ref.key, message: "Product added successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// -----------------------------------------------------

// READ / GET
// -----------------------------------------------------
// Get All Products
router.get("/", async (req, res) => {
  try {
    const snapshot = await admin.database().ref("products").once("value");
    const products = snapshot.val();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// -----------------------------------------------------

// UPDATE
// -----------------------------------------------------
// Update a product by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the product ID from the URL
    const productData = req.body; // The new product data

    // Update the product data in database
    await admin.database().ref(`products/${id}`).update(productData);

    res.status(200).json({ message: "Product updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// -----------------------------------------------------

// DELETE
// -----------------------------------------------------
// Delete a product by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the product ID from the URL

    // Remove the product from database
    await admin.database().ref(`products/${id}`).remove();

    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// -----------------------------------------------------

export default router;
