// IMPORT
// -----------------------------------------------------------
// React & Hooks
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Services
import { getSubcategoriesByCategory } from "../services/subcategoryService";
import { getProductTypeBySubcategory } from "../services/productTypeService";
import { createPendingProduct } from "../services/productService";

// Utility Functions
import { getCurrentDate, getCurrentTimeStamp } from "../utils/dateUtils";
import { prettifyTextInput, formatName } from "../utils/wordFormatUtils";

// Third-Party Components
import { Container, Form, Stack, FloatingLabel, InputGroup } from "react-bootstrap";
import Loader from "react-spinners/PropagateLoader";

// Internal Components
import NavigationBar from "../components/navigation/NavigationBar";
import Btn from "../components/button/Btn";
import Footer from "../components/navigation/Footer";
import StorePricingSpecialInput from "../components/input/StorePricingSpecialInput";

// Imagery
// -

// -----------------------------------------------------------

const AddProductPage = () => {
  const navigate = useNavigate();

  const [categoryId, setCategoryId] = useState("10000"); // Default is "Food"
  const [subcategoryId, setSubcategoryId] = useState("");
  const [typeId, setTypeId] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [productName, setProductName] = useState("");
  const [productAmount, setProductAmount] = useState("");
  const [productUnit, setProductUnit] = useState("kg");
  const [imageFile, setImageFile] = useState(null);

  // Price and Special fields for different stores
  const [pnpPrice, setPnpPrice] = useState("");
  const [pnpOnSpecial, setPnpOnSpecial] = useState(false);
  const [pnpSpecialDate, setPnpSpecialDate] = useState("");

  const [woolworthsPrice, setWoolworthsPrice] = useState("");
  const [woolworthsOnSpecial, setWoolworthsOnSpecial] = useState(false);
  const [woolworthsSpecialDate, setWoolworthsSpecialDate] = useState("");

  const [checkersPrice, setCheckersPrice] = useState("");
  const [checkersOnSpecial, setCheckersOnSpecial] = useState(false);
  const [checkersSpecialDate, setCheckersSpecialDate] = useState("");

  const [sparPrice, setSparPrice] = useState("");
  const [sparOnSpecial, setSparOnSpecial] = useState(false);
  const [sparSpecialDate, setSparSpecialDate] = useState("");

  // Loading & Error States
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch subcategories when category changes
  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const data = await getSubcategoriesByCategory(categoryId);
        // Filter subcategories to include only those with productTypes
        const filteredSubcategories = await Promise.all(
          Object.entries(data).map(async ([subId, subcategory]) => {
            const types = await getProductTypeBySubcategory(categoryId, subId);
            return types && Object.keys(types).length > 0 ? [subId, subcategory] : null;
          })
        );

        // Remove null values for subcategories with no productTypes
        setSubcategories(filteredSubcategories.filter(Boolean));

        // Set the first valid subcategory as selected if it exists
        if (filteredSubcategories.length > 0) {
          setSubcategoryId(filteredSubcategories[0][0]);
        } else {
          setSubcategoryId("");
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
    if (!subcategoryId || !categoryId) return;

    const fetchProductTypes = setTimeout(async () => {
      try {
        // console.log("categoryId:", categoryId);
        // console.log("subcategoryId:", subcategoryId);
        const data = await getProductTypeBySubcategory(categoryId, subcategoryId);
        setProductTypes(Object.entries(data));
        if (data && Object.keys(data).length > 0) {
          setTypeId(Object.keys(data)[0]);
        }
        setIsPageLoading(false);
      } catch (err) {
        console.error("Error fetching product types:", err);
        setIsPageLoading(false);
      }
    }, 400); // Delay (waiting for subcat to update)

    return () => clearTimeout(fetchProductTypes);
  }, [categoryId, subcategoryId]);

  // Handle form submission
  const handleCreateProduct = async () => {
    // If some fields are not filled in, show error
    if (
      !productName ||
      !productAmount ||
      !productUnit ||
      !categoryId ||
      !subcategoryId ||
      !typeId
    ) {
      setError("Please fill in all the product info fields.");
      return;
    } else if (!imageFile) {
      setError("Please upload an image for your product.");
      return;
    } else if (!pnpPrice && !woolworthsPrice && !checkersPrice && !sparPrice) {
      setError("Please enter atleast 1 price for your product.");
      return;
    }

    setIsSubmitLoading(true);
    setError(null);

    const formData = new FormData();

    let createdAt = getCurrentTimeStamp();

    const productData = {
      name: prettifyTextInput(productName),
      amount: productAmount,
      unit: productUnit,
      created: createdAt,
      adminDecisionDate: createdAt,
      pnp: {
        price: pnpPrice || 0,
        updated: pnpPrice ? getCurrentDate() : null,
        special: pnpOnSpecial ? pnpSpecialDate : null,
      },
      woolworths: {
        price: woolworthsPrice || 0,
        updated: woolworthsPrice ? getCurrentDate() : null,
        special: woolworthsOnSpecial ? woolworthsSpecialDate : null,
      },
      checkers: {
        price: checkersPrice || 0,
        updated: checkersPrice ? getCurrentDate() : null,
        special: checkersOnSpecial ? checkersSpecialDate : null,
      },
      spar: {
        price: sparPrice || 0,
        updated: sparPrice ? getCurrentDate() : null,
        special: sparOnSpecial ? sparSpecialDate : null,
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

    console.log("formData", formData);

    try {
      const response = await createPendingProduct(formData);
      console.log("Product created:", response);
      navigate("/groceries");
    } catch (err) {
      console.error("Failed to create product:", err);
      setError("Failed to create product. Please try again.");
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <>
      <NavigationBar admin />
      <Container className="mb-32">
        <div className="flex w-full justify-between pt-6 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl">Submit a Product</h2>
            {error && <p className="text-red-600 mb-2">{error}</p>}
          </div>
          <Stack direction="horizontal" gap={2} className="hidden md:flex">
            <Btn variant="secondary" onClick={() => navigate("/groceries")}>
              Cancel
            </Btn>
            <Btn variant="primary" onClick={handleCreateProduct} disabled={isSubmitLoading}>
              {isSubmitLoading ? "Submitting..." : "Submit"}
            </Btn>
          </Stack>
        </div>
        {isPageLoading || isSubmitLoading ? (
          <div className="w-full flex justify-center items-center mt-20 p-64">
            <Loader color="#C34534" size={20} loading={true} />
          </div>
        ) : (
          <Form className="mt-8 lg:mt-0">
            <div className="flex flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-6 lg:space-x-0">
              <div className="w-full p-0 lg:p-8">
                {/* Product Name */}
                <Form.Floating>
                  <FloatingLabel controlId="floatingInput" label="Product Name" className="mb-4">
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="input-style"
                      maxLength={40}
                    />
                  </FloatingLabel>
                </Form.Floating>
                {/* Measurement Amount */}
                <Form.Floating>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Measurement Amount"
                    className="mb-4"
                  >
                    <Form.Control
                      type="text"
                      inputMode="numeric"
                      placeholder=""
                      value={productAmount}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                        setProductAmount(numericValue);
                      }}
                      className="input-style"
                      maxLength={5}
                    />
                  </FloatingLabel>
                </Form.Floating>
                {/* Product Unit */}
                <Form.Floating>
                  <FloatingLabel controlId="floatingInput" label="Unit" className="mb-4">
                    <Form.Select
                      value={productUnit}
                      onChange={(e) => setProductUnit(e.target.value)}
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
                {/* Product Category */}
                <Form.Floating>
                  <FloatingLabel controlId="floatingInput" label="Category" className="mb-4">
                    <Form.Select
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
                {/* Product Subcategory */}
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
                          {formatName(subcategory.name)}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Form.Floating>
                {/* Product Type */}
                <Form.Floating>
                  <FloatingLabel controlId="floatingInput" label="Type" className="mb-4">
                    <Form.Select
                      value={typeId}
                      onChange={(e) => setTypeId(e.target.value)}
                      className="input-style"
                    >
                      {productTypes.map(([typeId, productType]) => (
                        <option key={typeId} value={typeId}>
                          {formatName(productType.name)}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Form.Floating>
                {/* Product Image */}
                <div
                  className="bg-neutral-100 rounded-xl h-64 flex flex-col items-center justify-center cursor-pointer pt-2 pb-8"
                  onClick={() => document.getElementById("imageUpload").click()}
                >
                  {imageFile ? (
                    <>
                      <small className="text-gray-500 w-full pl-4 mb-4">New Product Image</small>
                      <img
                        src={URL.createObjectURL(imageFile)}
                        alt="New Product"
                        className="object-contain h-full w-full rounded-xl"
                      />
                    </>
                  ) : (
                    <p className="text-gray-500">Upload a product image</p>
                  )}
                  <Form.Control
                    type="file"
                    id="imageUpload"
                    accept="image/webp, image/png, image/jpeg, image/jpg"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      const maxSizeInMB = 10;
                      const maxSizeInBytes = maxSizeInMB * 1024 * 1024; // Convert MB to bytes

                      if (file && file.size > maxSizeInBytes) {
                        alert(`File size should not exceed ${maxSizeInMB} MB.`);
                        e.target.value = ""; // Reset the input if the file is too large
                      } else {
                        setImageFile(file); // Set the file if size is within limit
                      }
                    }}
                    className="d-none"
                  />
                </div>
              </div>

              {/* Product Pricing */}
              <div className="w-full p-0 lg:p-8 space-y-8 ">
                {/* Pick n Pay Pricing */}
                <StorePricingSpecialInput
                  storeKey="pnp"
                  storePrice={pnpPrice}
                  setStorePrice={setPnpPrice}
                  onSpecial={pnpOnSpecial}
                  setOnSpecial={setPnpOnSpecial}
                  storeSpecialDate={pnpSpecialDate}
                  setStoreSpecialDate={setPnpSpecialDate}
                />
                {/* Woolworths Section */}
                <StorePricingSpecialInput
                  storeKey="woolworths"
                  storePrice={woolworthsPrice}
                  setStorePrice={setWoolworthsPrice}
                  onSpecial={woolworthsOnSpecial}
                  setOnSpecial={setWoolworthsOnSpecial}
                  storeSpecialDate={woolworthsSpecialDate}
                  setStoreSpecialDate={setWoolworthsSpecialDate}
                />
                {/* Checkers Section */}
                <StorePricingSpecialInput
                  storeKey="checkers"
                  storePrice={checkersPrice}
                  setStorePrice={setCheckersPrice}
                  onSpecial={checkersOnSpecial}
                  setOnSpecial={setCheckersOnSpecial}
                  storeSpecialDate={checkersSpecialDate}
                  setStoreSpecialDate={setCheckersSpecialDate}
                />
                {/* Spar Section */}
                <StorePricingSpecialInput
                  storeKey="spar"
                  storePrice={sparPrice}
                  setStorePrice={setSparPrice}
                  onSpecial={sparOnSpecial}
                  setOnSpecial={setSparOnSpecial}
                  storeSpecialDate={sparSpecialDate}
                  setStoreSpecialDate={setSparSpecialDate}
                />
              </div>
            </div>
          </Form>
        )}
        <Stack direction="horizontal" gap={2} className="flex md:hidden mt-8">
          <Btn variant="secondary" onClick={() => navigate("/groceries")} className="px-10">
            Cancel
          </Btn>
          <Btn
            variant="primary"
            onClick={handleCreateProduct}
            disabled={isSubmitLoading}
            className="w-full"
          >
            {isSubmitLoading ? "Submitting..." : "Submit"}
          </Btn>
        </Stack>
      </Container>
      <Footer />
    </>
  );
};

export default AddProductPage;
