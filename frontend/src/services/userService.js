import { getDatabase, ref, get, set, update, child } from "firebase/database";
import { auth } from "./firebaseAuthService";

// Helper function to get current user ID
const getUserId = () => {
  const user = auth.currentUser;
  if (user) {
    return user.uid;
  } else {
    throw new Error("User not authenticated");
  }
};

// GET
// -----------------------------------------------------
// Fetch the current user's details
export const getUserDetails = async () => {
  try {
    const userId = getUserId();
    const db = getDatabase();
    const userRef = ref(db, `users/${userId}`);
    const userSnapshot = await get(userRef);
    return userSnapshot.val();
  } catch (error) {
    throw error;
  }
};

// Get all products in the current user's cart
export const getUserCart = async () => {
  try {
    const userId = getUserId();
    const db = getDatabase();
    const cartRef = ref(db, `users/${userId}/cart`);
    const cartSnapshot = await get(cartRef);
    return cartSnapshot.val() || [];
  } catch (error) {
    throw error;
  }
};

// POST
// -----------------------------------------------------
// Add product to the current user's cart
export const addToCart = async (productId, quantity) => {
  try {
    const userId = getUserId();
    const db = getDatabase();
    const userRef = ref(db, `users/${userId}`);
    const userSnapshot = await get(userRef);

    let cart = userSnapshot.val().cart || [];
    const existingProductIndex = cart.findIndex((item) => item.productId === productId);

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }

    await update(userRef, { cart });
    return { message: "Product added to cart successfully" };
  } catch (error) {
    throw error;
  }
};

// DELETE
// -----------------------------------------------------
// Remove product from the current user's cart
export const removeFromCart = async (productId) => {
  try {
    const userId = getUserId();
    const db = getDatabase();
    const userRef = ref(db, `users/${userId}`);
    const userSnapshot = await get(userRef);

    let cart = userSnapshot.val().cart || [];
    cart = cart.filter((item) => item.productId !== productId);

    await update(userRef, { cart });
    return { message: "Product removed from cart successfully" };
  } catch (error) {
    throw error;
  }
};
