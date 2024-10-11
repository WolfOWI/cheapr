import express from "express";
import admin from "firebase-admin";

const router = express.Router();

// CREATE
// -----------------------------------------------------
// Create Subcategory
router.post("/category/:categoryId/subcategory", async (req, res) => {
  try {
    const { categoryId } = req.params; // Extract category ID
    const subcategoryData = req.body; // The subcategory data from the request
    const subcategoriesRef = admin.database().ref(`categories/${categoryId}/subcategories`).push(); // Generate a new subcategory ID
    subcategoryData.id = subcategoriesRef.key; // Set the generated ID in the data
    await subcategoriesRef.set(subcategoryData);

    res.status(200).json({
      id: subcategoriesRef.key,
      message: "Subcategory created successfully!",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create Product Type
router.post("/category/:categoryId/subcategory/:subcatId/type", async (req, res) => {
  try {
    const { categoryId, subcatId } = req.params; // Extract category and subcategory IDs
    const typeData = req.body; // The product type data from the request
    const typesRef = admin
      .database()
      .ref(`categories/${categoryId}/subcategories/${subcatId}/types`)
      .push(); // Generate a new type ID
    typeData.id = typesRef.key; // Set the generated ID in the data
    await typesRef.set(typeData);

    res.status(200).json({
      id: typesRef.key,
      message: "Product type created successfully!",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// -----------------------------------------------------

// GET ALL
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

// Get All Subcategories Under Category
router.get("/category/:categoryId/subcategories", async (req, res) => {
  try {
    const { categoryId } = req.params;
    const snapshot = await admin
      .database()
      .ref(`categories/${categoryId}/subcategories`)
      .once("value");
    const subcategories = snapshot.val();
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all Products Under Subcategory
router.get("/category/:categoryId/subcategory/:subcatId/types", async (req, res) => {
  try {
    const { categoryId, subcatId } = req.params;
    const snapshot = await admin
      .database()
      .ref(`categories/${categoryId}/subcategories/${subcatId}/types`)
      .once("value");
    const types = snapshot.val();
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// -----------------------------------------------------

// UPDATE
// -----------------------------------------------------
// Update a subcategory by ID
router.put("/category/:categoryId/subcategory/:subcatId", async (req, res) => {
  try {
    const { categoryId, subcatId } = req.params;
    const updatedData = req.body;
    await admin
      .database()
      .ref(`categories/${categoryId}/subcategories/${subcatId}`)
      .update(updatedData);

    res.status(200).json({ message: "Subcategory updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a product type by ID
router.put("/category/:categoryId/subcategory/:subcatId/type/:typeId", async (req, res) => {
  try {
    const { categoryId, subcatId, typeId } = req.params;
    const updatedData = req.body;
    await admin
      .database()
      .ref(`categories/${categoryId}/subcategories/${subcatId}/types/${typeId}`)
      .update(updatedData);

    res.status(200).json({ message: "Product type updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// -----------------------------------------------------

// DELETE
// -----------------------------------------------------
// Delete a subcategory by ID
router.delete("/category/:categoryId/subcategory/:subcatId", async (req, res) => {
  try {
    const { categoryId, subcatId } = req.params;
    await admin.database().ref(`categories/${categoryId}/subcategories/${subcatId}`).remove();

    res.status(200).json({ message: "Subcategory deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a product type by ID
router.delete("/category/:categoryId/subcategory/:subcatId/type/:typeId", async (req, res) => {
  try {
    const { categoryId, subcatId, typeId } = req.params;
    await admin
      .database()
      .ref(`categories/${categoryId}/subcategories/${subcatId}/types/${typeId}`)
      .remove();

    res.status(200).json({ message: "Product type deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// -----------------------------------------------------

export default router;
