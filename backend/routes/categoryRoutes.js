import express from "express";
import admin from "firebase-admin";

const router = express.Router();

// CREATE
// -----------------------------------------------------
// Create a new category
router.post("/", async (req, res) => {
  try {
    const categoryData = req.body; // The category data from the request
    const ref = admin.database().ref("categories").push();
    await ref.set(categoryData);

    res.status(200).json({ id: ref.key, message: "Category created successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// -----------------------------------------------------

// READ / GET
// -----------------------------------------------------
// Get All Categories
router.get("/", async (req, res) => {
  try {
    const snapshot = await admin.database().ref("categories").once("value");
    const categories = snapshot.val();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// -----------------------------------------------------

// Get a category by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the category ID from the URL
    const snapshot = await admin.database().ref(`categories/${id}`).once("value");

    if (snapshot.exists()) {
      res.status(200).json(snapshot.val());
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// -----------------------------------------------------

// UPDATE
// -----------------------------------------------------
// Update a category by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the category ID from the URL
    const categoryData = req.body; // The new category data

    // Update the category data in the database
    await admin.database().ref(`categories/${id}`).update(categoryData);

    res.status(200).json({ message: "Category updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// -----------------------------------------------------

// DELETE
// -----------------------------------------------------
// Delete a category by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the category ID from the URL

    // Remove the category from the database
    await admin.database().ref(`categories/${id}`).remove();

    res.status(200).json({ message: "Category deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// -----------------------------------------------------

export default router;
