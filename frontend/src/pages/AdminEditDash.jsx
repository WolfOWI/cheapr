// IMPORT
// -----------------------------------------------------------
// React & Hooks
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom"; // To fetch product ID from URL

// Services
import { getProductById, updateProductById } from "../services/productService";
import { getBreadcrumbByProductId } from "../services/breadcrumbService";
import { getSubcategoriesByCategory } from "../services/subcategoryService";
import { getProductTypeBySubcategory } from "../services/productTypeService";

// Utility Functions
import { getCurrentDate, getCurrentTimeStamp } from "../utils/dateUtils";

// Third-Party Components
import { Container, Stack, Form, FloatingLabel, Button, InputGroup } from "react-bootstrap";

// Internal Components
import NavigationBar from "../components/navigation/NavigationBar";
import Btn from "../components/button/Btn";
import StoreLogo from "../components/building-blocks/StoreLogo";
import Footer from "../components/navigation/Footer";
import StorePricingSpecialInput from "../components/input/StorePricingSpecialInput";

// Imagery
// -

// -----------------------------------------------------------
function AdminEditDash() {
  const location = useLocation(); // Get location state
  const navigate = useNavigate(); // For navigation after saving
  const from = location.state?.from || "/admin"; // Get the previous page or default to admin

  const { productId } = useParams(); // Get the product ID from the URL

  const [product, setProduct] = useState({});
  const [breadcrumb, setBreadcrumb] = useState({}); // For category, subcategory, type
  const [subcategories, setSubcategories] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [newCategoryId, setNewCategoryId] = useState("");
  const [newSubcategoryId, setNewSubcategoryId] = useState("");
  const [newTypeId, setNewTypeId] = useState("");
  const [oldCategoryId, setOldCategoryId] = useState("");
  const [oldSubcategoryId, setOldSubcategoryId] = useState("");
  const [oldTypeId, setOldTypeId] = useState("");
  // TODO Show Image
  const [imageFile, setImageFile] = useState(null);

  // State for prices and special offer fields
  const [pnpPrice, setPnpPrice] = useState("");
  const [pnpUpdatedDate, setPnpUpdatedDate] = useState("");
  const [pnpOnSpecial, setPnpOnSpecial] = useState(false);
  const [pnpSpecialDate, setPnpSpecialDate] = useState("");

  const [woolworthsPrice, setWoolworthsPrice] = useState("");
  const [woolworthsUpdatedDate, setWoolworthsUpdatedDate] = useState("");
  const [woolworthsOnSpecial, setWoolworthsOnSpecial] = useState(false);
  const [woolworthsSpecialDate, setWoolworthsSpecialDate] = useState("");

  const [checkersPrice, setCheckersPrice] = useState("");
  const [checkersUpdatedDate, setCheckersUpdatedDate] = useState("");
  const [checkersOnSpecial, setCheckersOnSpecial] = useState(false);
  const [checkersSpecialDate, setCheckersSpecialDate] = useState("");

  const [sparPrice, setSparPrice] = useState("");
  const [sparUpdatedDate, setSparUpdatedDate] = useState("");
  const [sparOnSpecial, setSparOnSpecial] = useState(false);
  const [sparSpecialDate, setSparSpecialDate] = useState("");

  const [isChanged, setIsChanged] = useState(false);

  // GET
  // ----------------------------------------------

  // Fetch product details and breadcrumb when page loads
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productData = await getProductById(productId);
        setProduct(productData);

        // Fetch breadcrumb data
        const breadcrumbData = await getBreadcrumbByProductId(productId);
        setBreadcrumb(breadcrumbData);

        // Set the category, subcategory, and type IDs based on breadcrumb
        if (breadcrumbData) {
          setOldCategoryId(breadcrumbData.categoryId);
          setOldSubcategoryId(breadcrumbData.subcategoryId);
          setOldTypeId(breadcrumbData.typeId);
          setNewCategoryId(breadcrumbData.categoryId);
          setNewSubcategoryId(breadcrumbData.subcategoryId);
          setNewTypeId(breadcrumbData.typeId);
        }
      } catch (error) {
        console.error("Failed to fetch product or breadcrumb data", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  // Populate store prices on product data load
  useEffect(() => {
    if (product.pnp) {
      setPnpPrice(product.pnp.price || "");
      setPnpUpdatedDate(product.pnp.updated || "");
      if (product.pnp.special) {
        setPnpOnSpecial(true);
        setPnpSpecialDate(product.pnp.special);
      } else {
        setPnpOnSpecial(false);
        setPnpSpecialDate("");
      }
    }
    if (product.woolworths) {
      setWoolworthsPrice(product.woolworths.price || "");
      setWoolworthsUpdatedDate(product.woolworths.updated || "");
      if (product.woolworths.special) {
        setWoolworthsOnSpecial(true);
        setWoolworthsSpecialDate(product.woolworths.special);
      } else {
        setWoolworthsOnSpecial(false);
        setWoolworthsSpecialDate("");
      }
    }
    if (product.checkers) {
      setCheckersPrice(product.checkers.price || "");
      setCheckersUpdatedDate(product.checkers.updated || "");
      if (product.checkers.special) {
        setCheckersOnSpecial(true);
        setCheckersSpecialDate(product.checkers.special);
      } else {
        setCheckersOnSpecial(false);
        setCheckersSpecialDate("");
      }
    }
    if (product.spar) {
      setSparPrice(product.spar.price || "");
      setSparUpdatedDate(product.spar.updated || "");
      if (product.spar.special) {
        setSparOnSpecial(true);
        setSparSpecialDate(product.spar.special);
      } else {
        setSparOnSpecial(false);
        setSparSpecialDate("");
      }
    }
  }, [product]);

  // Fetch subcategories when category changes
  useEffect(() => {
    const fetchSubcategories = async () => {
      if (!newCategoryId) return;
      try {
        const data = await getSubcategoriesByCategory(newCategoryId);
        setSubcategories(Object.entries(data));
        if (data && Object.keys(data).length > 0) {
          setNewSubcategoryId(Object.keys(data)[0]); // Set default subcategory ID
        }
      } catch (error) {
        console.error("Failed to fetch subcategories", error);
      }
    };

    fetchSubcategories();
  }, [newCategoryId]);

  // Fetch product types when subcategory changes
  useEffect(() => {
    const fetchProductTypes = async () => {
      if (!newSubcategoryId) return;
      try {
        const data = await getProductTypeBySubcategory(newCategoryId, newSubcategoryId);
        setProductTypes(Object.entries(data));
        if (data && Object.keys(data).length > 0) {
          setNewTypeId(Object.keys(data)[0]); // Set default product type ID
        }
      } catch (error) {
        console.error("Failed to fetch product types", error);
      }
    };

    fetchProductTypes();
  }, [newCategoryId, newSubcategoryId]);
  // ----------------------------------------------

  // INPUTS
  // ----------------------------------------------
  // When a change has been made to the input fields
  const handleInputChange = (field, value) => {
    setIsChanged(true);

    if (field === "image") {
      setProduct((prevProduct) => ({
        ...prevProduct,
        image: value.target.files[0], // Set the image file
      }));
      setImageFile(value.target.files[0]); // Save the image file
    } else if (field.includes("price") || field.includes("special")) {
      // Changing price or special input fields
      const storeKey = field.split(".")[0]; // Get the store key (e.g., "pnp", "woolworths")

      setProduct((prevProduct) => ({
        ...prevProduct,
        [storeKey]: {
          ...prevProduct[storeKey],
          [field.split(".")[1]]: value, // Update the price or special field
          updated: getCurrentDate(), // Update the date when price/special changes
        },
      }));
    } else if (field.includes("onSpecial")) {
      // Changing checkbox (onSpecial)
      const storeKey = field.split(".")[0];
      setProduct((prevProduct) => ({
        ...prevProduct,
        [storeKey]: {
          ...prevProduct[storeKey],
          special: value ? getCurrentDate() : null, // Update the special date or set to null
          updated: getCurrentDate(), // Update date when special is toggled
        },
      }));
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [field]: value,
      }));
    }
  };

  // On changing category, subcategory, or type dropdowns
  const handleCategoryChange = (e) => {
    setIsChanged(true); // Mark form as changed
    setNewCategoryId(e.target.value);
  };

  const handleSubcategoryChange = (e) => {
    setIsChanged(true); // Mark form as changed
    setNewSubcategoryId(e.target.value);
  };

  const handleTypeChange = (e) => {
    setIsChanged(true); // Mark form as changed
    setNewTypeId(e.target.value);
  };

  // useEffect(() => {
  //   console.log("Category change:", categoryId);
  // }, [categoryId]);
  // useEffect(() => {
  //   console.log("Subcat change:", subcategoryId);
  // }, [subcategoryId]);
  // useEffect(() => {
  //   console.log("PType change:", typeId);
  // }, [typeId]);
  // useEffect(() => {
  //   console.log("Category:", categoryId);
  //   console.log("Subcat:", subcategoryId);
  //   console.log("PType:", typeId);
  // }, [categoryId, subcategoryId, typeId]);

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();

      // Append product details to formData
      formData.append(
        "productData",
        JSON.stringify({
          name: product.name,
          amount: product.amount,
          unit: product.unit,
          created: product.created,
          adminDecisionDate: product.adminDecisionDate,
          pnp: {
            price: pnpPrice || 0,
            updated: pnpPrice && pnpUpdatedDate,
            special: pnpOnSpecial ? pnpSpecialDate : null,
          },
          woolworths: {
            price: woolworthsPrice || 0,
            updated: woolworthsPrice && woolworthsUpdatedDate,
            special: woolworthsOnSpecial ? woolworthsSpecialDate : null,
          },
          checkers: {
            price: checkersPrice || 0,
            updated: checkersPrice && checkersUpdatedDate,
            special: checkersOnSpecial ? checkersSpecialDate : null,
          },
          spar: {
            price: sparPrice || 0,
            updated: sparPrice && sparUpdatedDate,
            special: sparOnSpecial ? sparSpecialDate : null,
          },
        })
      );

      // Append product data and image file to FormData
      formData.append("categoryId", newCategoryId);
      formData.append("subcategoryId", newSubcategoryId);
      formData.append("typeId", newTypeId);
      formData.append("oldCategoryId", oldCategoryId);
      formData.append("oldSubcategoryId", oldSubcategoryId);
      formData.append("oldTypeId", oldTypeId);
      if (imageFile) {
        formData.append("image", imageFile); // Append the image file
      }

      console.log("Form data to update:", formData);

      // Call the service to update the product
      await updateProductById(productId, formData);

      // Navigate back to the previous page
      navigate(from);
    } catch (error) {
      console.error("Failed to save product changes:", error);
    }
  };
  // ----------------------------------------------

  return (
    <>
      <NavigationBar admin />
      <Container className="mb-32">
        <div className="flex w-full justify-between pt-6">
          <h2>Edit Product</h2>
          <Stack direction="horizontal" gap={2}>
            <Btn variant="secondary" onClick={() => navigate(from)}>
              Cancel
            </Btn>
            {isChanged && (
              <Btn variant="primary" onClick={handleSaveChanges}>
                Save Changes
              </Btn>
            )}
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
                      value={product.name || ""}
                      className="input-style"
                      onChange={(e) => handleInputChange("name", e.target.value)}
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
                      value={product.amount || ""}
                      className="input-style"
                      onChange={(e) => handleInputChange("amount", e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Floating>
                <Form.Floating>
                  <FloatingLabel controlId="floatingInput" label="Unit" className="mb-4">
                    <Form.Select
                      aria-label="Floating label select example"
                      value={product.unit || ""}
                      className="input-style"
                      onChange={(e) => handleInputChange("unit", e.target.value)}
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
                      value={newCategoryId || ""}
                      className="input-style"
                      onChange={handleCategoryChange}
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
                      aria-label="Floating label select"
                      value={newSubcategoryId || ""}
                      className="input-style"
                      onChange={handleSubcategoryChange}
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
                      aria-label="Floating label select"
                      value={newTypeId || ""}
                      className="input-style"
                      onChange={handleTypeChange}
                    >
                      {productTypes.map(([typeId, productType]) => (
                        <option key={typeId} value={typeId}>
                          {productType.name}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Form.Floating>

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
                  ) : product.image ? (
                    <>
                      <small className="text-gray-500 w-full pl-4 mb-4">
                        Current Product Image
                      </small>
                      <img
                        src={product.image}
                        alt="Product"
                        className="object-contain h-full w-full rounded-xl"
                      />
                    </>
                  ) : (
                    <p className="text-gray-500">Click to upload an product image</p>
                  )}
                  <Form.Control
                    type="file"
                    id="imageUpload"
                    onChange={(e) => handleInputChange("image", e)}
                    className="d-none" // Hide the input element visually
                  />
                </div>
              </div>

              <div className="w-full p-8">
                {/* Pick n Pay Pricing */}
                <StorePricingSpecialInput
                  storeKey="pnp"
                  storePrice={pnpPrice}
                  setStorePrice={(value) => handleInputChange("pnp.price", value)}
                  onSpecial={pnpOnSpecial}
                  setOnSpecial={(value) => handleInputChange("pnp.special", value)}
                  storeSpecialDate={pnpSpecialDate}
                  setStoreSpecialDate={(value) => handleInputChange("pnp.special", value)}
                />
                {/* Woolworths Section */}
                <StorePricingSpecialInput
                  storeKey="woolworths"
                  storePrice={woolworthsPrice}
                  setStorePrice={(value) => handleInputChange("woolworths.price", value)}
                  onSpecial={woolworthsOnSpecial}
                  setOnSpecial={(value) => handleInputChange("woolworths.special", value)}
                  storeSpecialDate={woolworthsSpecialDate}
                  setStoreSpecialDate={(value) => handleInputChange("woolworths.special", value)}
                />
              </div>

              <div className="w-full p-8">
                {/* Checkers Section */}
                <StorePricingSpecialInput
                  storeKey="checkers"
                  storePrice={checkersPrice}
                  setStorePrice={(value) => handleInputChange("checkers.price", value)}
                  onSpecial={checkersOnSpecial}
                  setOnSpecial={(value) => handleInputChange("checkers.special", value)}
                  storeSpecialDate={checkersSpecialDate}
                  setStoreSpecialDate={(value) => handleInputChange("checkers.special", value)}
                />

                {/* Spar Section */}
                <StorePricingSpecialInput
                  storeKey="spar"
                  storePrice={sparPrice}
                  setStorePrice={(value) => handleInputChange("spar.price", value)}
                  onSpecial={sparOnSpecial}
                  setOnSpecial={(value) => handleInputChange("spar.special", value)}
                  storeSpecialDate={sparSpecialDate}
                  setStoreSpecialDate={(value) => handleInputChange("spar.special", value)}
                />
              </div>
            </div>
          </Form>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default AdminEditDash;
