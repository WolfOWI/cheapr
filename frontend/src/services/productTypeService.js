import axios from "axios";

// URL for your backend API
const API_URL = process.env.API_URL || "http://localhost:3001/categories";

// CREATE
// -----------------------------------------------------
// Create a new product type
export const createProductType = async (categoryId, subcategoryId, productTypeName) => {
  try {
    const response = await axios.post(
      `${API_URL}/category/${categoryId}/subcategory/${subcategoryId}/type`,
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
