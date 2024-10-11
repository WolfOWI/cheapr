// IMPORT
// -----------------------------------------------------------
// React & Hooks
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Services
import { getSubcategoriesByCategory } from "../services/subcategoryService";
import { createProductType } from "../services/productTypeService";

// Utility Functions
// -

// Third-Party Components
import { Container, Form, Stack, FloatingLabel } from "react-bootstrap";

// Internal Components
import NavigationBar from "../components/navigation/NavigationBar";
import Btn from "../components/button/Btn";
import Footer from "../components/navigation/Footer";

// Imagery
// -

// -----------------------------------------------------------

const AdminCreatePTypePage = () => {
  const navigate = useNavigate();

  // State to track category, subcategory, product type input
  const [categoryId, setCategoryId] = useState("10000"); // Default is "Food"
  const [subcategoryId, setSubcategoryId] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [productTypeName, setProductTypeName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch subcategories when category changes
  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const data = await getSubcategoriesByCategory(categoryId);
        setSubcategories(Object.entries(data)); // Convert object to array of key-value pairs
        if (data && Object.keys(data).length > 0) {
          setSubcategoryId(Object.keys(data)[0]); // Set the first subcategory by default
        }
      } catch (err) {
        console.error("Error fetching subcategories:", err);
        setError("Failed to fetch subcategories.");
      }
    };

    fetchSubcategories();
  }, [categoryId]);

  // Handle form submission
  const handleCreateProductType = async () => {
    if (!productTypeName) {
      setError("Please provide a product type name.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await createProductType(categoryId, subcategoryId, productTypeName);
      console.log("Product type created:", response);
      navigate("/create");
    } catch (err) {
      console.error("Failed to create product type:", err);
      setError("Failed to create product type. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavigationBar admin />
      <Container className="mb-32 mt-6 w-[30%]">
        <div className="">
          <h2 className="text-center">Create Product Type</h2>
          <p className="text-center">
            Please select which category and subcategory the new product type would fall under.
          </p>
        </div>
        <Form className="mt-8">
          <Form.Floating>
            <FloatingLabel controlId="floatingInput" label="Category" className="mb-4">
              <Form.Select
                aria-label="Floating label select example"
                className="input-style"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)} // Update categoryId on selection
              >
                <option value="10000">Food</option>
                <option value="20000">Drinks</option>
                <option value="30000">Household</option>
              </Form.Select>
            </FloatingLabel>
          </Form.Floating>

          <Form.Floating>
            <FloatingLabel controlId="floatingInput" label="Subcategory" className="mb-4">
              <Form.Select
                aria-label="Floating label select example"
                className="input-style"
                value={subcategoryId}
                onChange={(e) => setSubcategoryId(e.target.value)} // Update subcategoryId on selection
              >
                {subcategories.length > 0 ? (
                  subcategories.map(([subId, subcategory]) => (
                    <option key={subId} value={subId}>
                      {subcategory.name}
                    </option>
                  ))
                ) : (
                  <option>No subcategories found</option>
                )}
              </Form.Select>
            </FloatingLabel>
          </Form.Floating>

          <Form.Floating>
            <FloatingLabel controlId="floatingInput" label="New Product Type Name" className="mb-4">
              <Form.Control
                type="text"
                placeholder="Enter Product Type"
                className="input-style"
                value={productTypeName}
                onChange={(e) => setProductTypeName(e.target.value)} // Update productTypeName on input
              />
            </FloatingLabel>
          </Form.Floating>

          {error && <p className="text-red-600">{error}</p>}

          <Stack direction="horizontal" gap={2} className="w-full">
            <Btn variant="secondary" onClick={() => navigate("/create")}>
              Cancel
            </Btn>
            <Btn
              variant="primary"
              className="w-full"
              onClick={handleCreateProductType}
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create"}
            </Btn>
          </Stack>
        </Form>
      </Container>
      <Footer />
    </>
  );
};

export default AdminCreatePTypePage;
