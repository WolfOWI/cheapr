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
    console.log("Received CategoryId:", categoryId);
    console.log("Received SubcategoryId:", subcategoryId);
    console.log("Received TypeId:", typeId);

    const productData = JSON.parse(req.body.productData); // Parse the stringified productData
    console.log("Parsed Product Data:", productData);

    const file = req.file; // Uploaded image
    console.log("Uploaded file:", file ? file.originalname : "No file uploaded");

    let imageUrl = "";
    if (file) {
      const bucket = admin.storage().bucket();
      const fileName = `product_images/${Date.now()}_${file.originalname}`;
      const fileUpload = bucket.file(fileName);
      console.log("File name for storage:", fileName);

      // Upload the image to Firebase Storage
      await fileUpload.save(file.buffer);
      console.log("File uploaded to Firebase Storage.");

      // Get the image URL
      const [url] = await fileUpload.getSignedUrl({
        action: "read",
        expires: "12-31-2025",
      });
      imageUrl = url;
      console.log("Generated Image URL:", imageUrl);
    }

    // Add the image URL to the product data
    const newProductData = {
      ...productData,
      image: imageUrl, // Add image URL to the product data
    };
    console.log("New Product Data with Image URL:", newProductData);

    // Add product to the "approved" node
    const ref = admin.database().ref("products/approved").push();
    const productId = ref.key; // Get generated ID
    console.log("Generated Product ID:", productId);

    await ref.set(newProductData); // Save product data
    console.log("Product data saved under 'approved' node.");

    // Add the productId underneath category, subcategory, and type
    const typeRef = admin
      .database()
      .ref(`categories/${categoryId}/subcategories/${subcategoryId}/types/${typeId}/productIds`);
    console.log("Type reference path:", typeRef.path);

    await typeRef.transaction((productIds = []) => {
      console.log("Current product IDs before addition:", productIds);

      if (!Array.isArray(productIds)) {
        productIds = [];
      }

      if (!productIds.includes(productId)) {
        productIds.push(productId); // Add the new product ID to the array
        console.log("Added new Product ID to the list.");
      } else {
        console.log("Product ID already exists in the list.");
      }

      console.log("Product IDs after addition:", productIds);
      return productIds;
    });

    console.log("Product ID added to category/type path successfully.");
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

    // The New & Old Categories, Subcategories and Product Types
    const { categoryId, oldCategoryId, subcategoryId, oldSubcategoryId, typeId, oldTypeId } =
      req.body;
    console.log("New CategoryId:", categoryId);
    console.log("Old CategoryId:", oldCategoryId);
    console.log("New SubcategoryId:", subcategoryId);
    console.log("Old SubcategoryId:", oldSubcategoryId);
    console.log("New TypeId:", typeId);
    console.log("Old TypeId:", oldTypeId);

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

    const updatedProductData = {
      ...productData,
      ...(imageUrl && { image: imageUrl }), // Only update image if a new one was uploaded
    };

    // Find the product in approved, pending, or rejected
    const approvedSnapshot = await admin.database().ref(`products/approved/${id}`).once("value");
    const pendingSnapshot = await admin.database().ref(`products/pending/${id}`).once("value");
    const rejectedSnapshot = await admin.database().ref(`products/rejected/${id}`).once("value");

    let productRef;
    if (approvedSnapshot.exists()) {
      productRef = admin.database().ref(`products/approved/${id}`);
    }
    if (pendingSnapshot.exists()) {
      productRef = admin.database().ref(`products/pending/${id}`);
    }
    if (rejectedSnapshot.exists()) {
      productRef = admin.database().ref(`products/rejected/${id}`);
    }

    if (productRef) {
      if (
        oldCategoryId !== categoryId ||
        oldSubcategoryId !== subcategoryId ||
        oldTypeId !== typeId
      ) {
        const oldPath = `categories/${oldCategoryId}/subcategories/${oldSubcategoryId}/types/${oldTypeId}/productIds`;
        console.log("Removing product ID from old path:", oldPath);

        await admin
          .database()
          .ref(oldPath)
          .transaction((productIds) => {
            console.log("Current product IDs at old path before removal:", productIds);
            if (productIds) {
              const index = productIds.indexOf(id);
              if (index !== -1) {
                productIds.splice(index, 1);
                console.log("Removed product ID from old path.");
              }
            }
            console.log("Product IDs at old path after removal:", productIds);
            return productIds;
          });
      }

      // Update product details in the relevant path (approved, pending, rejected)
      console.log("Updating product details at path:", productRef.path);
      await productRef.update(updatedProductData);

      // Add the product to the new category, subcategory, and type if it has changed
      const newPath = `categories/${categoryId}/subcategories/${subcategoryId}/types/${typeId}/productIds`;
      console.log("Adding product ID to new path:", newPath);

      await admin
        .database()
        .ref(newPath)
        .transaction((productIds = []) => {
          console.log("Current product IDs at new path before addition:", productIds);

          // Ensure productIds is an array if it is null or undefined
          if (!Array.isArray(productIds)) {
            productIds = [];
          }

          if (!productIds.includes(id)) {
            productIds.push(id);
            console.log("Added product ID to new path.");
          } else {
            console.log("Product ID already exists in the new path.");
          }

          console.log("Product IDs at new path after addition:", productIds);
          return productIds;
        });

      console.log("Product updated successfully with ID:", id);
      res.status(200).json({ message: "Product updated successfully!" });
    } else {
      console.log("Product not found for ID:", id);
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error updating product:", error); // Log the error for better debugging
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
