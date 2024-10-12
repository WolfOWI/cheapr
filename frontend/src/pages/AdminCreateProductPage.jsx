// IMPORT
// -----------------------------------------------------------
// React & Hooks
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Services
import { getSubcategoriesByCategory } from "../services/subcategoryService";
import { getProductTypeBySubcategory } from "../services/productTypeService";
import { createApprovedProduct } from "../services/productService";

// Utility Functions
import { getCurrentDate, getCurrentTimeStamp } from "../utils/dateUtils";

// Third-Party Components
import { Container, Form, Stack, FloatingLabel, InputGroup } from "react-bootstrap";

// Internal Components
import NavigationBar from "../components/navigation/NavigationBar";
import Btn from "../components/button/Btn";
import StoreLogo from "../components/building-blocks/StoreLogo";
import Footer from "../components/navigation/Footer";
import StorePricingSpecialInput from "../components/input/StorePricingSpecialInput";

// Imagery
// -

// -----------------------------------------------------------

const AdminCreateProductPage = () => {
  const navigate = useNavigate();

  const [categoryId, setCategoryId] = useState("10000"); // Default is "Food"
  const [subcategoryId, setSubcategoryId] = useState("");
  const [typeId, setTypeId] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [productName, setProductName] = useState("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("kg");
  const [imageFile, setImageFile] = useState(null);

  // Price and Special fields for different stores
  const [pnpPrice, setPnpPrice] = useState("");
  const [pnpSpecial, setPnpSpecial] = useState(false);
  const [pnpSpecialDate, setPnpSpecialDate] = useState("");

  const [woolworthsPrice, setWoolworthsPrice] = useState("");
  const [woolworthsSpecial, setWoolworthsSpecial] = useState(false);
  const [woolworthsSpecialDate, setWoolworthsSpecialDate] = useState("");

  const [checkersPrice, setCheckersPrice] = useState("");
  const [checkersSpecial, setCheckersSpecial] = useState(false);
  const [checkersSpecialDate, setCheckersSpecialDate] = useState("");

  const [sparPrice, setSparPrice] = useState("");
  const [sparSpecial, setSparSpecial] = useState(false);
  const [sparSpecialDate, setSparSpecialDate] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch subcategories when category changes
  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const data = await getSubcategoriesByCategory(categoryId);
        setSubcategories(Object.entries(data));
        if (data && Object.keys(data).length > 0) {
          setSubcategoryId(Object.keys(data)[0]);
        }
      } catch (err) {
        console.error("Error fetching subcategories:", err);
        setError("Failed to fetch subcategories.");
      }
    };

    fetchSubcategories();
  }, [categoryId]);

  // Fetch product types when subcategory changes
  useEffect(() => {
    if (!subcategoryId) return;
    const fetchProductTypes = async () => {
      try {
        const data = await getProductTypeBySubcategory(categoryId, subcategoryId);
        setProductTypes(Object.entries(data));
        if (data && Object.keys(data).length > 0) {
          setTypeId(Object.keys(data)[0]);
        }
      } catch (err) {
        console.error("Error fetching product types:", err);
        setError("Failed to fetch product types.");
      }
    };

    fetchProductTypes();
  }, [categoryId, subcategoryId]);

  // Handle form submission
  const handleCreateProduct = async () => {
    console.log("categoryId:", categoryId);
    console.log("subcategoryId:", subcategoryId);
    console.log("typeId:", typeId);

    if (
      !productName ||
      !amount ||
      !unit ||
      !categoryId ||
      !subcategoryId ||
      !typeId ||
      !imageFile
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();

    let createdAt = getCurrentTimeStamp();

    const productData = {
      name: productName,
      amount,
      unit,
      created: createdAt,
      adminDecisionDate: createdAt,
      pnp: {
        price: pnpPrice || 0,
        updated: pnpPrice ? getCurrentDate() : null,
        special: pnpSpecial ? pnpSpecialDate : null,
      },
      woolworths: {
        price: woolworthsPrice || 0,
        updated: woolworthsPrice ? getCurrentDate() : null,
        special: woolworthsSpecial ? woolworthsSpecialDate : null,
      },
      checkers: {
        price: checkersPrice || 0,
        updated: checkersPrice ? getCurrentDate() : null,
        special: checkersSpecial ? checkersSpecialDate : null,
      },
      spar: {
        price: sparPrice || 0,
        updated: sparPrice ? getCurrentDate() : null,
        special: sparSpecial ? sparSpecialDate : null,
      },
    };

    // Append product data and image file to FormData
    formData.append("productData", JSON.stringify(productData));
    formData.append("categoryId", categoryId);
    formData.append("subcategoryId", subcategoryId);
    formData.append("typeId", typeId);
    if (imageFile) {
      formData.append("image", imageFile); // Append the image file
    }

    try {
      const response = await createApprovedProduct(formData, categoryId, subcategoryId, typeId);
      console.log("Product created:", response);
      navigate("/admin");
    } catch (err) {
      console.error("Failed to create product:", err);
      setError("Failed to create product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavigationBar admin />
      <Container className="mb-32">
        <div className="flex w-full justify-between pt-6">
          <h2>Create a Product</h2>
          <Stack direction="horizontal" gap={2}>
            <Btn variant="secondary" onClick={() => navigate("/create")}>
              Cancel
            </Btn>
            <Btn variant="primary" onClick={handleCreateProduct} disabled={isLoading}>
              {isLoading ? "Creating..." : "Create"}
            </Btn>
          </Stack>
        </div>
        <div>
          <Form>
            <div className="flex">
              <div className="w-full p-8">
                <Form.Floating>
                  <FloatingLabel controlId="floatingInput" label="Product Name" className="mb-4">
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="input-style"
                    />
                  </FloatingLabel>
                </Form.Floating>
                <Form.Floating>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Measurement Amount"
                    className="mb-4"
                  >
                    <Form.Control
                      type="number"
                      placeholder=""
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="input-style"
                    />
                  </FloatingLabel>
                </Form.Floating>
                <Form.Floating>
                  <FloatingLabel controlId="floatingInput" label="Unit" className="mb-4">
                    <Form.Select
                      aria-label="Floating label select example"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="input-style"
                    >
                      <option value="mg">Miligrams</option>
                      <option value="g">Grams</option>
                      <option value="kg">Kilograms</option>
                      <option value="ml">Milliliters</option>
                      <option value="l">Liters</option>
                      <option value="pcs">Piece(s)</option>
                      <option value="pk">Pack(s)</option>
                    </Form.Select>
                  </FloatingLabel>
                </Form.Floating>
                <Form.Floating>
                  <FloatingLabel controlId="floatingInput" label="Category" className="mb-4">
                    <Form.Select
                      aria-label="Floating label select example"
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      className="input-style"
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
                      value={subcategoryId}
                      onChange={(e) => setSubcategoryId(e.target.value)}
                      className="input-style"
                    >
                      {subcategories.map(([subId, subcategory]) => (
                        <option key={subId} value={subId}>
                          {subcategory.name}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Form.Floating>
                <Form.Floating>
                  <FloatingLabel controlId="floatingInput" label="Type" className="mb-4">
                    <Form.Select
                      aria-label="Floating label select example"
                      value={typeId}
                      onChange={(e) => setTypeId(e.target.value)}
                      className="input-style"
                    >
                      {productTypes.map(([typeId, productType]) => (
                        <option key={typeId} value={typeId}>
                          {productType.name}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Form.Floating>
                <div className="bg-neutral-100 rounded-xl h-32 flex items-center justify-center">
                  <Form.Floating>
                    <FloatingLabel controlId="imageUpload" label="Product Image" className="mb-4">
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                        className="input-style"
                      />
                    </FloatingLabel>
                  </Form.Floating>
                </div>
              </div>

              <div className="w-full p-8">
                {/* Pick n Pay Pricing */}
                <StorePricingSpecialInput
                  storeName="Pick n Pay"
                  storeKey="pnp"
                  storePrice={pnpPrice}
                  setStorePrice={setPnpPrice}
                  storeSpecial={pnpSpecial}
                  setStoreSpecial={setPnpSpecial}
                  storeSpecialDate={pnpSpecialDate}
                  setStoreSpecialDate={setPnpSpecialDate}
                />
                {/* Woolworths Section */}
                <StorePricingSpecialInput
                  storeName="Woolworths"
                  storeKey="woolworths"
                  storePrice={woolworthsPrice}
                  setStorePrice={setWoolworthsPrice}
                  storeSpecial={woolworthsSpecial}
                  setStoreSpecial={setWoolworthsSpecial}
                  storeSpecialDate={woolworthsSpecialDate}
                  setStoreSpecialDate={setWoolworthsSpecialDate}
                />
              </div>

              <div className="w-full p-8">
                {/* Checkers Section */}
                <StorePricingSpecialInput
                  storeName="Checkers"
                  storeKey="checkers"
                  storePrice={checkersPrice}
                  setStorePrice={setCheckersPrice}
                  storeSpecial={checkersSpecial}
                  setStoreSpecial={setCheckersSpecial}
                  storeSpecialDate={checkersSpecialDate}
                  setStoreSpecialDate={setCheckersSpecialDate}
                />
                {/* Spar Section */}
                <StorePricingSpecialInput
                  storeName="Spar"
                  storeKey="spar"
                  storePrice={sparPrice}
                  setStorePrice={setSparPrice}
                  storeSpecial={sparSpecial}
                  setStoreSpecial={setSparSpecial}
                  storeSpecialDate={sparSpecialDate}
                  setStoreSpecialDate={setSparSpecialDate}
                />
              </div>
            </div>
          </Form>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default AdminCreateProductPage;
