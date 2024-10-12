import express from "express";
import admin from "firebase-admin";
import multer from "multer";

const router = express.Router();

// Initialize multer for file uploads
const storage = multer.memoryStorage(); // Store the image in memory temporarily
const upload = multer({ storage: storage });

// CREATE
// -----------------------------------------------------
// Create a APPROVED product
router.post("/approved", upload.single("image"), async (req, res) => {
  try {
    const { productData, categoryId, subcategoryId, typeId } = req.body;
    const file = req.file; // Uploaded image

    let imageUrl = "";
    if (file) {
      const bucket = admin.storage().bucket();
      const fileName = `product_images/${Date.now()}_${file.originalname}`;
      const fileUpload = bucket.file(fileName);

      // Upload the image to Firebase Storage
      await fileUpload.save(file.buffer);

      // Get the image URL
      const [url] = await fileUpload.getSignedUrl({
        action: "read",
        expires: "12-31-2025",
      });

      imageUrl = url;
    }

    // Add the image URL to the product data
    const newProductData = {
      ...JSON.parse(productData),
      image: imageUrl, // Add image URL to the product
      created: new Date().toISOString(),
      adminDecisionDate: new Date().toISOString(),
    };

    // Add product to the "approved" node
    const ref = admin.database().ref("products/approved").push();
    const productId = ref.key; // Get generated ID
    await ref.set(newProductData); // Save product data

    // Add the productId underneath category, subcategory, and type
    const typeRef = admin
      .database()
      .ref(`categories/${categoryId}/subcategories/${subcategoryId}/types/${typeId}/productIds`);
    const typeSnapshot = await typeRef.once("value");

    const productIds = typeSnapshot.val() || [];
    productIds.push(productId); // Add new product ID to the list

    await typeRef.set(productIds); // Save updated list

    res.status(200).json({ id: productId, message: "Product added successfully!" });
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
