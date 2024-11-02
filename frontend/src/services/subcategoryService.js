import axios from "axios";

// URL for your backend API
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

// CREATE
// -----------------------------------------------------
// Create a new subcategory
export const createSubcategory = async (categoryId, subcategoryName) => {
  try {
    const response = await axios.post(`${API_URL}/categories/category/${categoryId}/subcategory`, {
      name: subcategoryName, // Send the subcategory name
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
// -----------------------------------------------------

// GET
// -----------------------------------------------------
// Fetch subcategories based on category
export const getSubcategoriesByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${API_URL}/categories/category/${categoryId}/subcategories`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// -----------------------------------------------------
