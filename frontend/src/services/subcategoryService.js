import axios from "axios";

// URL for your backend API
const API_URL = process.env.API_URL || "http://localhost:3001/categories";

// CREATE
// -----------------------------------------------------
// Create a new subcategory
export const createSubcategory = async (categoryId, subcategoryName) => {
  try {
    const response = await axios.post(`${API_URL}/category/${categoryId}/subcategory`, {
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
    const response = await axios.get(`${API_URL}/category/${categoryId}/subcategories`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// -----------------------------------------------------
