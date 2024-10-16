import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:3001";

// Get breadcrumb by Product ID
export const getBreadcrumbByProductId = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/breadcrumb/product/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get breadcrumb by Subcategory ID
export const getBreadcrumbBySubcategoryId = async (subcatId) => {
  try {
    const response = await axios.get(`${API_URL}/breadcrumb/subcategory/${subcatId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get breadcrumb by Product Type ID
export const getBreadcrumbByTypeId = async (typeId) => {
  try {
    const response = await axios.get(`${API_URL}/breadcrumb/type/${typeId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
