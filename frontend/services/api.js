// src/services/api.js
const BASE_URL = "http://localhost:5000/api";

export const submitProduct = async (productName, productPrice) => {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: productName,
        price: productPrice,
      }),
    });

    if (!response.ok) {
      throw new Error("Error adding product");
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
