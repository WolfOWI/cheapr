import express from "express";
import admin from "firebase-admin";

const router = express.Router();

// Get breadcrumb by Product ID
router.get("/product/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    let breadcrumb = null;
    let foundProduct = false;

    const categoriesSnapshot = await admin.database().ref("categories").once("value");
    const categories = categoriesSnapshot.val();

    // Traverse through categories, subcategories, and product types
    for (const catKey in categories) {
      const category = categories[catKey];

      if (category.subcategories) {
        for (const subKey in category.subcategories) {
          const subcategory = category.subcategories[subKey];

          if (subcategory.types) {
            for (const typeKey in subcategory.types) {
              const productType = subcategory.types[typeKey];

              if (productType.productIds && productType.productIds.includes(productId)) {
                breadcrumb = {
                  categoryId: catKey, // Category ID (key)
                  category: category.name, // Category name
                  subcategoryId: subKey, // Subcategory ID (key)
                  subcategory: subcategory.name, // Subcategory name
                  typeId: typeKey, // Product type ID (key)
                  type: productType.name, // Product type name
                };
                foundProduct = true;
                break;
              }
            }
          }
          if (foundProduct) break;
        }
      }
      if (foundProduct) break;
    }

    if (breadcrumb) {
      res.status(200).json(breadcrumb);
    } else {
      res.status(404).json({ message: "Product not found in any category" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get breadcrumb by Subcategory ID
router.get("/subcategory/:subcatId", async (req, res) => {
  try {
    const { subcatId } = req.params;
    let breadcrumb = null;
    let foundSubcategory = false;

    const categoriesSnapshot = await admin.database().ref("categories").once("value");
    const categories = categoriesSnapshot.val();

    // Traverse through categories and subcategories
    for (const catKey in categories) {
      const category = categories[catKey];

      if (category.subcategories && category.subcategories[subcatId]) {
        const subcategory = category.subcategories[subcatId];
        breadcrumb = {
          categoryId: catKey, // Category ID (key)
          category: category.name, // Category name
          subcategory: subcategory.name, // Subcategory name
        };
        foundSubcategory = true;
        break;
      }
    }

    if (breadcrumb) {
      res.status(200).json(breadcrumb);
    } else {
      res.status(404).json({ message: "Subcategory not found in any category" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get breadcrumb by Product Type ID
router.get("/type/:typeId", async (req, res) => {
  try {
    const { typeId } = req.params;
    let breadcrumb = null;
    let foundType = false;

    const categoriesSnapshot = await admin.database().ref("categories").once("value");
    const categories = categoriesSnapshot.val();

    // Traverse through categories, subcategories, and product types
    for (const catKey in categories) {
      const category = categories[catKey];

      if (category.subcategories) {
        for (const subKey in category.subcategories) {
          const subcategory = category.subcategories[subKey];

          if (subcategory.types && subcategory.types[typeId]) {
            const productType = subcategory.types[typeId];
            breadcrumb = {
              categoryId: catKey, // Category ID (key)
              category: category.name, // Category name
              subcategoryId: subKey, // Subcategory ID (key)
              subcategory: subcategory.name, // Subcategory name
              type: productType.name,
            };
            foundType = true;
            break;
          }
        }
      }
      if (foundType) break;
    }

    if (breadcrumb) {
      res.status(200).json(breadcrumb);
    } else {
      res.status(404).json({ message: "Product type not found in any category" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
