import axios from "axios";

// URL for your backend API
const API_URL = process.env.API_URL || "http://localhost:3001/products";

// CREATE
// -----------------------------------------------------
// Create APPROVED product
export const createApprovedProduct = async (productData, categoryId, subcategoryId, typeId) => {
  try {
    const response = await axios.post(`${API_URL}/approved`, {
      productData,
      categoryId,
      subcategoryId,
      typeId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
// -----------------------------------------------------
