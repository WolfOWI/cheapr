import express from "express";
import admin from "firebase-admin";

const router = express.Router();

// GET
// -----------------------------------------------------
// Fetch the current user's details
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const userSnapshot = await admin.database().ref(`users/${userId}`).once("value");
    if (userSnapshot.exists()) {
      res.status(200).json(userSnapshot.val());
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all products in the current user's cart
router.get("/cart/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const userSnapshot = await admin.database().ref(`users/${userId}`).once("value");
    if (userSnapshot.exists()) {
      const cart = userSnapshot.val().cart || [];
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// -----------------------------------------------------

// UPDATE
// -----------------------------------------------------
// Add product to the current user's cart
router.post("/cart/add", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const userSnapshot = await admin.database().ref(`users/${userId}`).once("value");
    if (userSnapshot.exists()) {
      let cart = userSnapshot.val().cart || [];

      const existingProductIndex = cart.findIndex((item) => item.productId === productId);
      if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += quantity;
      } else {
        cart.push({ productId, quantity });
      }

      await admin.database().ref(`users/${userId}`).update({ cart });
      res.status(200).json({ message: "Product added to cart successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// -----------------------------------------------------

// DELETE
// -----------------------------------------------------
// Remove product from the current user's cart
router.post("/cart/remove", async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const userSnapshot = await admin.database().ref(`users/${userId}`).once("value");
    if (userSnapshot.exists()) {
      let cart = userSnapshot.val().cart || [];
      cart = cart.filter((item) => item.productId !== productId);

      await admin.database().ref(`users/${userId}`).update({ cart });
      res.status(200).json({ message: "Product removed from cart successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Clear the current user's cart
router.post("/cart/clear", async (req, res) => {
  const { userId } = req.body;

  try {
    const userSnapshot = await admin.database().ref(`users/${userId}`).once("value");
    if (userSnapshot.exists()) {
      await admin.database().ref(`users/${userId}/cart`).remove(); // Remove the cart key
      res.status(200).json({ message: "Cart cleared successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// -----------------------------------------------------

export default router;
