import express from "express";
import admin from "firebase-admin";
import multer from "multer";

const router = express.Router();

// Initialize multer for file uploads
const storage = multer.memoryStorage(); // Store the image in memory temporarily
const upload = multer({ storage: storage });

// CREATE
// -----------------------------------------------------
// Create an APPROVED product
router.post("/approved", upload.single("image"), async (req, res) => {
  try {
    // Extract data directly from req.body
    const { categoryId, subcategoryId, typeId } = req.body;
    const productData = JSON.parse(req.body.productData); // Parse the stringified productData
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
      ...productData,
      image: imageUrl, // Add image URL to the product data
    };

    // Add product to the "approved" node
    const ref = admin.database().ref("products/approved").push();
    const productId = ref.key; // Get generated ID
    await ref.set(newProductData); // Save product data

    // Add the productId underneath category, subcategory, and type
    const typeRef = admin
      .database()
      .ref(`categories/${categoryId}/subcategories/${subcategoryId}/types/${typeId}/productIds`);
    await typeRef.transaction((productIds = []) => {
      if (!productIds.includes(productId)) {
        productIds.push(productId); // Add the new product ID to the array
      }
      return productIds;
    });

    res.status(200).json({ id: productId, message: "Product added successfully!" });
  } catch (error) {
    console.error("Error creating product:", error.message); // Log error message for better debugging
    res.status(500).json({ error: error.message });
  }
});

// -----------------------------------------------------

// READ / GET
// -----------------------------------------------------
// Get All APPROVED Products
router.get("/approved", async (req, res) => {
  try {
    const snapshot = await admin.database().ref("products/approved").once("value");
    const products = snapshot.val();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Any Product by ID (approved, pending, or rejected)
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Search in all three categories (approved, pending, rejected)
    const approvedSnapshot = await admin.database().ref(`products/approved/${id}`).once("value");
    const pendingSnapshot = await admin.database().ref(`products/pending/${id}`).once("value");
    const rejectedSnapshot = await admin.database().ref(`products/rejected/${id}`).once("value");

    let product = approvedSnapshot.val() || pendingSnapshot.val() || rejectedSnapshot.val();

    if (product) {
      // Add the status (approved, pending, or rejected) to the product data
      product.status = approvedSnapshot.exists()
        ? "approved"
        : pendingSnapshot.exists()
        ? "pending"
        : "rejected";

      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// -----------------------------------------------------

// UPDATE
// -----------------------------------------------------
// Update a product by ID (approved, pending, or rejected)
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params; // Extract the product ID from the URL
    console.log("req.body", req.body);

    const { categoryId, subcategoryId, typeId } = req.body;
    console.log({ categoryId, subcategoryId, typeId });
    const productData = JSON.parse(req.body.productData); // Parse the stringified productData
    console.log("productData", JSON.parse(req.body.productData));

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

    const updatedProductData = {
      ...productData, // Spread the parsed product data
      ...(imageUrl && { image: imageUrl }), // Only update image if a new one was uploaded
    };

    // Find the product in approved, pending, or rejected
    const approvedSnapshot = await admin.database().ref(`products/approved/${id}`).once("value");
    const pendingSnapshot = await admin.database().ref(`products/pending/${id}`).once("value");
    const rejectedSnapshot = await admin.database().ref(`products/rejected/${id}`).once("value");

    let productRef;
    if (approvedSnapshot.exists()) productRef = admin.database().ref(`products/approved/${id}`);
    if (pendingSnapshot.exists()) productRef = admin.database().ref(`products/pending/${id}`);
    if (rejectedSnapshot.exists()) productRef = admin.database().ref(`products/rejected/${id}`);

    if (productRef) {
      // Remove the product from the old category, subcategory, and type
      const oldData = approvedSnapshot.val() || pendingSnapshot.val() || rejectedSnapshot.val();
      const oldCategoryId = oldData.categoryId;
      const oldSubcategoryId = oldData.subcategoryId;
      const oldTypeId = oldData.typeId;

      const oldPath = `categories/${oldCategoryId}/subcategories/${oldSubcategoryId}/types/${oldTypeId}/productIds`;
      await admin
        .database()
        .ref(oldPath)
        .transaction((productIds) => {
          if (productIds) {
            // Remove productId from array
            const index = productIds.indexOf(id);
            if (index !== -1) {
              productIds.splice(index, 1);
            }
          }
          return productIds;
        });

      // Update product details in the relevant path (approved, pending, rejected)
      await productRef.update(updatedProductData);

      // Add the product to the new category, subcategory, and type
      const newCategoryId = categoryId;
      const newSubcategoryId = subcategoryId;
      const newTypeId = typeId;

      const newPath = `categories/${newCategoryId}/subcategories/${newSubcategoryId}/types/${newTypeId}/productIds`;
      await admin
        .database()
        .ref(newPath)
        .transaction((productIds = []) => {
          if (!productIds.includes(id)) {
            productIds.push(id); // Add product ID to array
          }
          return productIds;
        });

      res.status(200).json({ message: "Product updated successfully!" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// -----------------------------------------------------

// DELETE
// -----------------------------------------------------
// Delete a product by ID (works for approved, pending, or rejected)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the product ID from the URL

    // Find the product in approved, pending, or rejected
    const approvedSnapshot = await admin.database().ref(`products/approved/${id}`).once("value");
    const pendingSnapshot = await admin.database().ref(`products/pending/${id}`).once("value");
    const rejectedSnapshot = await admin.database().ref(`products/rejected/${id}`).once("value");

    let productRef;
    if (approvedSnapshot.exists()) productRef = admin.database().ref(`products/approved/${id}`);
    if (pendingSnapshot.exists()) productRef = admin.database().ref(`products/pending/${id}`);
    if (rejectedSnapshot.exists()) productRef = admin.database().ref(`products/rejected/${id}`);

    if (productRef) {
      await productRef.remove();
      res.status(200).json({ message: "Product deleted successfully!" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// -----------------------------------------------------

export default router;
