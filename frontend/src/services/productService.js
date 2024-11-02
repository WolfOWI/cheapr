import axios from "axios";

// URL for your backend API
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

// CREATE
// -----------------------------------------------------
// Create APPROVED product (admin)
// - - - - - - - - - - - - - - - - - - - -
export const createApprovedProduct = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/products/approved`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
// - - - - - - - - - - - - - - - - - - - -

// Create PENDING product (normal user)
// - - - - - - - - - - - - - - - - - - - -
export const createPendingProduct = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/products/pending`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
// - - - - - - - - - - - - - - - - - - - -

// -----------------------------------------------------

// GET
// -----------------------------------------------------
// GET All APPROVED Products
// - - - - - - - - - - - - - - - - - - - -
export const getAllApprovedProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products/approved`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// - - - - - - - - - - - - - - - - - - - -

// Get All APPROVED products under a specific group (category / subcategory / product)
// - - - - - - - - - - - - - - - - - - - -
export const getProductsByGroupId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/approved/group/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// - - - - - - - - - - - - - - - - - - - -

// GET All PENDING Products
// - - - - - - - - - - - - - - - - - - - -
export const getAllPendingProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products/pending`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// - - - - - - - - - - - - - - - - - - - -

// GET All REJECTED Products
// - - - - - - - - - - - - - - - - - - - -
export const getAllRejectedProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products/rejected`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// - - - - - - - - - - - - - - - - - - - -

// GET All FLAGGED Products
// - - - - - - - - - - - - - - - - - - - -
export const getAllFlaggedProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products/flagged`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// - - - - - - - - - - - - - - - - - - - -

// Get Any Product by ID
// - - - - - - - - - - - - - - - - - - - -
export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// - - - - - - - - - - - - - - - - - - - -
// -----------------------------------------------------

// UPDATE
// -----------------------------------------------------
// Update a product by ID (approved, pending, or rejected)
// - - - - - - - - - - - - - - - - - - - -
export const updateProductById = async (productId, formData) => {
  try {
    const response = await axios.put(`${API_URL}/products/${productId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update the prices of a product by ID
// - - - - - - - - - - - - - - - - - - - -
export const updateProductPricesById = async (productId, priceData) => {
  try {
    const response = await axios.put(`${API_URL}/products/${productId}/prices`, priceData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// - - - - - - - - - - - - - - - - - - - -

// STATUS
// - - - - - - - - - - - - - - - - - - - -
// Super Approve Product (Move from pending to approved)
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const superApproveProductById = async (productId) => {
  try {
    const response = await axios.put(`${API_URL}/products/superapprove/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error super-approving product:", error);
    throw error;
  }
};
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Approve Product (Move from pending to approved)
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const approveProductById = async (productId) => {
  try {
    const response = await axios.put(`${API_URL}/products/approve/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error approving product:", error);
    throw error;
  }
};
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Reject Product (Move from pending to rejected)
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const rejectProductById = async (productId) => {
  try {
    const response = await axios.put(`${API_URL}/products/reject/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error rejecting product:", error);
    throw error;
  }
};
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Reject Flagged Product (Move from flagged to rejected)
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const rejectFlaggedProductById = async (productId) => {
  try {
    const response = await axios.put(`${API_URL}/products/rejectflagged/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error rejecting the flagged product:", error);
    throw error;
  }
};
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Flag Product (Move from approved to flagged with flagMessage)
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const flagProductById = async (productId, flagMessage) => {
  try {
    const response = await axios.put(`${API_URL}/products/flag/${productId}`, {
      flagMessage,
    });
    return response.data;
  } catch (error) {
    console.error("Error flagging product:", error);
    throw error;
  }
};
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Unflag Product (Move from flagged to approved, remove flagMessage)
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const unflagProductById = async (productId) => {
  try {
    const response = await axios.put(`${API_URL}/products/unflag/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error unflagging product:", error);
    throw error;
  }
};
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// - - - - - - - - - - - - - - - - - - - -

// -----------------------------------------------------

// DELETE
// -----------------------------------------------------
// Delete a product by ID (approved, pending, or rejected)
export const deleteProductById = async (productId) => {
  try {
    const response = await axios.delete(`${API_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// -----------------------------------------------------
