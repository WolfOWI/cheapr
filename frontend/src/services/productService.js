import axios from "axios";

// URL for your backend API
const API_URL = process.env.API_URL || "http://localhost:3001";

// CREATE
// -----------------------------------------------------
// Create APPROVED product
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
// -----------------------------------------------------

// GET
// -----------------------------------------------------
// Get Any Product by ID
export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// GET All APPROVED Products
export const getAllApprovedProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products/approved`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// -----------------------------------------------------

// UPDATE
// -----------------------------------------------------
// Update a product by ID (approved, pending, or rejected)
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
