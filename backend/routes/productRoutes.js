import express from "express";
import admin from "firebase-admin";
import multer from "multer";

const router = express.Router();

// Initialize multer for file uploads
const storage = multer.memoryStorage(); // Store the image in memory temporarily
const upload = multer({ storage: storage });

// CREATE
// -----------------------------------------------------
// Create an APPROVED product (admin)
// - - - - - - - - - - - - - - - - - - - -
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
// - - - - - - - - - - - - - - - - - - - -

// Create an PENDING product (normal user)
// - - - - - - - - - - - - - - - - - - - -
router.post("/pending", upload.single("image"), async (req, res) => {
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

    // Add product to the "pending" node
    const ref = admin.database().ref("products/pending").push();
    const productId = ref.key; // Get generated ID
    console.log("Generated Product ID:", productId);

    await ref.set(newProductData); // Save product data
    console.log("Product data saved under 'pending' node.");

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
// - - - - - - - - - - - - - - - - - - - -

// -----------------------------------------------------

// READ / GET
// -----------------------------------------------------
// Get All APPROVED Products
// - - - - - - - - - - - - - - - - - - - -
router.get("/approved", async (req, res) => {
  try {
    const snapshot = await admin.database().ref("products/approved").once("value");
    const products = snapshot.val();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// - - - - - - - - - - - - - - - - - - - -

// Get all APPROVED products by ID of section (category, subcategory, or type)
// - - - - - - - - - - - - - - - - - - - -
router.get("/approved/group/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productsById = {}; // Create an object to store products by ID

    // Fetch the category node to check if the ID corresponds to a category
    const categorySnapshot = await admin.database().ref(`categories/${id}`).once("value");
    const categoryData = categorySnapshot.val();

    // If the ID corresponds to a category
    if (categoryData) {
      // Gather all product IDs from subcategories and types
      const productIds = [];
      Object.values(categoryData.subcategories || {}).forEach((subcategory) => {
        Object.values(subcategory.types || {}).forEach((type) => {
          if (type.productIds) {
            productIds.push(...type.productIds);
          }
        });
      });

      if (productIds.length > 0) {
        // Fetch all the products by their IDs
        const productPromises = productIds.map((productId) =>
          admin.database().ref(`products/approved/${productId}`).once("value")
        );
        const productSnapshots = await Promise.all(productPromises);

        // Assign products to the productsById object using product IDs as keys
        productSnapshots.forEach((snapshot) => {
          const productData = snapshot.val();
          if (productData) {
            productsById[snapshot.key] = productData; // Key by product ID
          }
        });

        return res.status(200).json(productsById);
      }
    }

    // Attempt to find the ID in subcategories
    const subcategorySnapshot = await admin.database().ref(`categories`).once("value");
    const categories = subcategorySnapshot.val();

    if (categories) {
      const productIds = [];
      Object.values(categories).forEach((category) => {
        const subcategory = category.subcategories && category.subcategories[id];
        if (subcategory) {
          Object.values(subcategory.types || {}).forEach((type) => {
            if (type.productIds) {
              productIds.push(...type.productIds);
            }
          });
        }
      });

      if (productIds.length > 0) {
        const productPromises = productIds.map((productId) =>
          admin.database().ref(`products/approved/${productId}`).once("value")
        );
        const productSnapshots = await Promise.all(productPromises);

        // Assign products to the productsById object using product IDs as keys
        productSnapshots.forEach((snapshot) => {
          const productData = snapshot.val();
          if (productData) {
            productsById[snapshot.key] = productData;
          }
        });

        return res.status(200).json(productsById);
      }
    }

    // Attempt to find the ID in types
    const typeSnapshot = await admin.database().ref(`categories`).once("value");
    const categoriesForTypes = typeSnapshot.val();

    if (categoriesForTypes) {
      const productIds = [];

      // Iterate through all categories and subcategories to find the type
      Object.values(categoriesForTypes).forEach((category) => {
        Object.values(category.subcategories || {}).forEach((subcategory) => {
          const type = subcategory.types && subcategory.types[id];
          if (type && type.productIds) {
            productIds.push(...type.productIds);
          }
        });
      });

      if (productIds.length > 0) {
        const productPromises = productIds.map((productId) =>
          admin.database().ref(`products/approved/${productId}`).once("value")
        );

        const productSnapshots = await Promise.all(productPromises);

        // Assign products to the productsById object using product IDs as keys
        productSnapshots.forEach((snapshot) => {
          const productData = snapshot.val();
          if (productData) {
            productsById[snapshot.key] = productData;
          }
        });

        return res.status(200).json(productsById);
      }
    }

    // If ID does not match any category, subcategory, or type, return not found
    return res.status(404).json({ message: "No products found for the provided ID" });
  } catch (error) {
    console.error("Error fetching products by ID:", error);
    res.status(500).json({ error: error.message });
  }
});
// - - - - - - - - - - - - - - - - - - - -

// Get All PENDING Products
// - - - - - - - - - - - - - - - - - - - -
router.get("/pending", async (req, res) => {
  try {
    const snapshot = await admin.database().ref("products/pending").once("value");
    const products = snapshot.val();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// - - - - - - - - - - - - - - - - - - - -

// Get All REJECTED Products
// - - - - - - - - - - - - - - - - - - - -
router.get("/rejected", async (req, res) => {
  try {
    const snapshot = await admin.database().ref("products/rejected").once("value");
    const products = snapshot.val();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// - - - - - - - - - - - - - - - - - - - -

// Get All FLAGGED Products
// - - - - - - - - - - - - - - - - - - - -
router.get("/flagged", async (req, res) => {
  try {
    const snapshot = await admin.database().ref("products/flagged").once("value");
    const products = snapshot.val();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// - - - - - - - - - - - - - - - - - - - -

// Get Any Product by ID (approved, pending, or rejected)
// - - - - - - - - - - - - - - - - - - - -
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
// - - - - - - - - - - - - - - - - - - - -
// -----------------------------------------------------

// UPDATE
// -----------------------------------------------------
// Update a product's details by ID (approved, pending, or rejected)
// - - - - - - - - - - - - - - - - - - - -
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
// - - - - - - - - - - - - - - - - - - - -

// STATUS
// - - - - - - - - - - - - - - - - - - - -
// SUPER Approve a product by ID (rejected -> approved)
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
router.put("/superapprove/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the product ID from the URL

    // Fetch the product from the rejected node
    const rejectedSnapshot = await admin.database().ref(`products/rejected/${id}`).once("value");

    if (!rejectedSnapshot.exists()) {
      return res.status(404).json({ message: "Product not found in rejected" });
    }

    const productData = rejectedSnapshot.val(); // The product data in rejected

    // Copy the product data to the approved node
    const approvedRef = admin.database().ref(`products/approved/${id}`);
    await approvedRef.set(productData); // Save the product in the approved node

    console.log("Product moved to approved node.");

    // Remove the product from the rejected node
    await admin.database().ref(`products/rejected/${id}`).remove();

    console.log("Product removed from rejected node.");

    res.status(200).json({ message: "Product super-approved successfully!" });
  } catch (error) {
    console.error("Error super-approving product:", error.message);
    res.status(500).json({ error: error.message });
  }
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Approve a product by ID (pending -> approved)
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
router.put("/approve/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the product ID from the URL

    // Fetch the product from the pending node
    const pendingSnapshot = await admin.database().ref(`products/pending/${id}`).once("value");

    if (!pendingSnapshot.exists()) {
      return res.status(404).json({ message: "Product not found in pending" });
    }

    const productData = pendingSnapshot.val(); // The product data in pending

    // Copy the product data to the approved node
    const approvedRef = admin.database().ref(`products/approved/${id}`);
    await approvedRef.set(productData); // Save the product in the approved node

    console.log("Product moved to approved node.");

    // Remove the product from the pending node
    await admin.database().ref(`products/pending/${id}`).remove();

    console.log("Product removed from pending node.");

    res.status(200).json({ message: "Product approved successfully!" });
  } catch (error) {
    console.error("Error approving product:", error.message);
    res.status(500).json({ error: error.message });
  }
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Reject a product by ID (pending -> rejected)
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
router.put("/reject/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the product ID from the URL

    // Fetch the product from the pending node
    const pendingSnapshot = await admin.database().ref(`products/pending/${id}`).once("value");

    if (!pendingSnapshot.exists()) {
      return res.status(404).json({ message: "Product not found in pending" });
    }

    const productData = pendingSnapshot.val(); // The product data in pending

    // Copy the product data to the rejected node
    const rejectedRef = admin.database().ref(`products/rejected/${id}`);
    await rejectedRef.set(productData); // Save the product in the rejected node

    console.log("Product moved to rejected node.");

    // Remove the product from the pending node
    await admin.database().ref(`products/pending/${id}`).remove();

    console.log("Product removed from pending node.");

    res.status(200).json({ message: "Product rejected successfully!" });
  } catch (error) {
    console.error("Error rejecting product:", error.message);
    res.status(500).json({ error: error.message });
  }
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Flag a product by ID (approved -> flagged with flagMessage)
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
router.put("/flag/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the product ID from the URL
    const { flagMessage } = req.body; // Get the flag message from the request body

    // Fetch the product from the approved node
    const approvedSnapshot = await admin.database().ref(`products/approved/${id}`).once("value");

    if (!approvedSnapshot.exists()) {
      return res.status(404).json({ message: "Product not found in approved." });
    }

    const productData = approvedSnapshot.val(); // The product data in approved

    // Add the flagMessage to the product data
    const flaggedProductData = {
      ...productData,
      flagMessage, // Add flag message to product data
    };

    // Copy the product data to the flagged node
    const flaggedRef = admin.database().ref(`products/flagged/${id}`);
    await flaggedRef.set(flaggedProductData); // Save the product in the flagged node

    console.log("Product moved to flagged node with flagMessage.");

    // Remove the product from the approved node
    await admin.database().ref(`products/approved/${id}`).remove();

    console.log("Product removed from approved node.");

    res.status(200).json({ message: "Product flagged successfully!" });
  } catch (error) {
    console.error("Error flagging product:", error.message);
    res.status(500).json({ error: error.message });
  }
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// - - - - - - - - - - - - - - - - - - - -
// -----------------------------------------------------

// DELETE
// -----------------------------------------------------
// Delete a product by ID (approved, pending, or rejected)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the product ID from the URL

    // Find the product in approved, pending, or rejected
    const approvedSnapshot = await admin.database().ref(`products/approved/${id}`).once("value");
    const pendingSnapshot = await admin.database().ref(`products/pending/${id}`).once("value");
    const rejectedSnapshot = await admin.database().ref(`products/rejected/${id}`).once("value");

    let productRef;
    let productData;

    if (approvedSnapshot.exists()) {
      productRef = admin.database().ref(`products/approved/${id}`);
      productData = approvedSnapshot.val();
    }
    if (pendingSnapshot.exists()) {
      productRef = admin.database().ref(`products/pending/${id}`);
      productData = pendingSnapshot.val();
    }
    if (rejectedSnapshot.exists()) {
      productRef = admin.database().ref(`products/rejected/${id}`);
      productData = rejectedSnapshot.val();
    }

    if (productRef) {
      let found = false;
      let categoryId = "";
      let subcategoryId = "";
      let typeId = "";

      // Fetch all categories
      const categoriesSnapshot = await admin.database().ref("categories").once("value");
      const categories = categoriesSnapshot.val();

      // Iterate through categories to find the one containing the product ID
      for (const [catId, category] of Object.entries(categories)) {
        for (const [subId, subcategory] of Object.entries(category.subcategories || {})) {
          for (const [typeIdKey, type] of Object.entries(subcategory.types || {})) {
            if (type.productIds && type.productIds.includes(id)) {
              categoryId = catId;
              subcategoryId = subId;
              typeId = typeIdKey;
              found = true;
              break;
            }
          }
          if (found) break;
        }
        if (found) break;
      }

      if (!found) {
        console.log("Category, Subcategory, or Type not found for Product ID:", id);
        return res.status(404).json({ message: "Category path not found for the product" });
      }

      const path = `categories/${categoryId}/subcategories/${subcategoryId}/types/${typeId}/productIds`;
      console.log("Deleting product ID from category path:", path);

      // Remove the product ID from the category, subcategory, and type
      await admin
        .database()
        .ref(path)
        .transaction((productIds) => {
          console.log("Current product IDs before deletion:", productIds);
          if (productIds) {
            const index = productIds.indexOf(id);
            if (index !== -1) {
              productIds.splice(index, 1);
              console.log("Removed product ID from category path.");
            }
          }
          console.log("Product IDs after deletion:", productIds);
          return productIds;
        });

      // Check if the product has an associated image and delete it from Firebase Storage
      if (productData.image) {
        const bucket = admin.storage().bucket();

        // Extract the file path from the full image URL
        const filePath = productData.image.split("/").slice(-1)[0].split("?")[0]; // Extract the file name before query parameters
        const file = bucket.file(`product_images/${filePath}`); // Construct the path in the bucket

        try {
          await file.delete();
          console.log("Image deleted from Firebase Storage:", filePath);
        } catch (error) {
          console.error("Error deleting image from Firebase Storage:", error.message);
        }
      }

      // Remove the product data
      await productRef.remove();
      console.log("Product data removed successfully");

      res.status(200).json({ message: "Product and image deleted successfully!" });
    } else {
      console.log("Product not found for ID:", id);
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// -----------------------------------------------------

export default router;
