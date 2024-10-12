import axios from "axios";

// URL for your backend API
const API_URL = process.env.API_URL || "http://localhost:3001";

// CREATE
// -----------------------------------------------------
// Create a new product type
export const createProductType = async (categoryId, subcategoryId, productTypeName) => {
  try {
    const response = await axios.post(
      `${API_URL}/categories/category/${categoryId}/subcategory/${subcategoryId}/type`,
      {
        name: productTypeName,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
// -----------------------------------------------------

// GET
// -----------------------------------------------------
// Fetch product types based on subcategory
export const getProductTypeBySubcategory = async (categoryId, subcategoryId) => {
  try {
    const response = await axios.get(
      `${API_URL}/categories/category/${categoryId}/subcategory/${subcategoryId}/types`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
// -----------------------------------------------------
