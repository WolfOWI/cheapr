// IMPORT
// -----------------------------------------------------------
// React & Hooks
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Services
import { getSubcategoriesByCategory } from "../services/subcategoryService";
import { createProductType, getProductTypeBySubcategory } from "../services/productTypeService";

// Utility Functions
import { formatName, formatToSnake } from "../utils/wordFormatUtils";

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

  // State to track category, subcategory, and product type input
  const [categoryId, setCategoryId] = useState("10000"); // Default is "Food"
  const [subcategoryId, setSubcategoryId] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [productTypeName, setProductTypeName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateLoading, setIsCreateLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch subcategories when category changes
  useEffect(() => {
    const fetchSubcategories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getSubcategoriesByCategory(categoryId);
        setSubcategories(Object.entries(data)); // Convert object to array of key-value pairs
        if (data && Object.keys(data).length > 0) {
          setSubcategoryId(Object.keys(data)[0]);
        } else {
          setSubcategoryId("");
        }
      } catch (err) {
        console.error("Error fetching subcategories:", err);
        setError("Failed to fetch subcategories.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubcategories();
  }, [categoryId]);

  // Fetch product types when subcategory changes
  useEffect(() => {
    if (!subcategoryId || !categoryId) return;

    const fetchProductTypes = setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getProductTypeBySubcategory(categoryId, subcategoryId);
        setProductTypes(Object.entries(data));
      } catch (err) {
        setProductTypes([]);
        console.error("Error fetching product types:", err);
        // setError("Failed to fetch product types.");
        setProductTypes([]);
      } finally {
        setIsLoading(false);
      }
    }, 400); // Delay (waiting for subcat to update)

    return () => clearTimeout(fetchProductTypes);
  }, [subcategoryId, categoryId]);

  // useEffect(() => {
  //   console.log("productTypeName:", productTypeName);
  // }, [productTypeName]);

  // Handle Create
  const handleCreateProductType = async () => {
    if (!productTypeName) {
      setError("Please provide a product type name.");
      return;
    }

    setIsCreateLoading(true);
    setError(null);

    try {
      const response = await createProductType(
        categoryId,
        subcategoryId,
        formatToSnake(productTypeName)
      );
      console.log("Product type created:", response);
      navigate("/create");
    } catch (err) {
      console.error("Failed to create product type:", err);
      setError("Failed to create product type. Please try again.");
    } finally {
      setIsCreateLoading(false);
    }
  };

  return (
    <>
      <NavigationBar admin />
      <Container className="mb-32 mt-8 md:w-[60%] lg:w-[50%] xl:w-[40%]">
        <div>
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
                onChange={(e) => setCategoryId(e.target.value)}
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
                onChange={(e) => setSubcategoryId(e.target.value)}
                disabled={!subcategories.length}
              >
                {subcategories.length > 0 ? (
                  subcategories.map(([subId, subcategory]) => (
                    <option key={subId} value={subId}>
                      {formatName(subcategory.name)}
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
                onChange={(e) => setProductTypeName(e.target.value.replace(/[^a-zA-Z\s-]/g, ""))} // Allows only letters, dashes, and spaces
                maxLength={25}
              />
            </FloatingLabel>
          </Form.Floating>

          <h5>Existing Product Types</h5>
          <div className="flex flex-wrap gap-2 w-full my-2">
            {productTypes.length > 0 ? (
              productTypes.map(([typeId, productType]) => (
                <small
                  key={typeId}
                  className="bg-highlight text-neutral-700 px-2 py-1 rounded-md text-center"
                >
                  {formatName(productType.name)}
                </small>
              ))
            ) : (
              <p>No product types listed</p>
            )}
          </div>

          <Stack direction="horizontal" gap={2} className="w-full">
            <Btn variant="secondary" onClick={() => navigate("/create")}>
              Cancel
            </Btn>
            <Btn
              variant="primary"
              className="w-full"
              onClick={handleCreateProductType}
              disabled={isCreateLoading}
            >
              {isCreateLoading ? "Creating..." : "Create"}
            </Btn>
          </Stack>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </Form>
      </Container>
      <Footer />
    </>
  );
};

export default AdminCreatePTypePage;
