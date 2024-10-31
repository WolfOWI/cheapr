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
import { getCurrentDate } from "../utils/dateUtils";
import { prettifyTextInput, formatName } from "../utils/wordFormatUtils";

// Third-Party Components
import { Container, Stack, Form, FloatingLabel } from "react-bootstrap";
import Loader from "react-spinners/GridLoader";

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

  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

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
      if (newCategoryId) {
        try {
          const data = await getSubcategoriesByCategory(newCategoryId);
          setSubcategories(Object.entries(data));

          if (data && Object.keys(data).length > 0) {
            setNewSubcategoryId(Object.keys(data)[0]); // Set default subcategory ID
          } else {
            setNewSubcategoryId(""); // Reset if no subcategories found
          }
        } catch (error) {
          console.error("Failed to fetch subcategories", error);
        }
      }
    };

    fetchSubcategories();
  }, [newCategoryId]);

  // Fetch product types when both category and subcategory are set
  useEffect(() => {
    if (!newCategoryId || !newSubcategoryId) return;

    const fetchProductTypes = setTimeout(async () => {
      try {
        const data = await getProductTypeBySubcategory(newCategoryId, newSubcategoryId);
        setProductTypes(Object.entries(data));

        if (data && Object.keys(data).length > 0) {
          setNewTypeId(Object.keys(data)[0]);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch product types:", error);
        setIsLoading(false);
      }
    }, 400);

    return () => clearTimeout(fetchProductTypes);
  }, [newCategoryId, newSubcategoryId]); // Both dependencies are included
  // ----------------------------------------------

  // INPUTS & BUTTON HANDLERS
  // ----------------------------------------------
  // When a change has been made to the input fields
  const handleInputChange = (field, value) => {
    setIsChanged(true);

    if (field === "image") {
      const file = value.target.files[0];
      const maxSizeInMB = 10;
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

      if (file && file.size > maxSizeInBytes) {
        alert(`File size should not exceed ${maxSizeInMB} MB.`);
        value.target.value = ""; // Reset input if file is too large
      } else {
        setProduct((prevProduct) => ({
          ...prevProduct,
          image: file, // Set the image file if within size limit
        }));
        setImageFile(file); // Update state with valid image
      }
    } else if (field.includes("price") || field.includes("special")) {
      const storeKey = field.split(".")[0];
      setProduct((prevProduct) => ({
        ...prevProduct,
        [storeKey]: {
          ...prevProduct[storeKey],
          [field.split(".")[1]]: value,
          updated: getCurrentDate(),
        },
      }));
    } else if (field.includes("onSpecial")) {
      const storeKey = field.split(".")[0];
      setProduct((prevProduct) => ({
        ...prevProduct,
        [storeKey]: {
          ...prevProduct[storeKey],
          special: value ? getCurrentDate() : null,
          updated: getCurrentDate(),
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

  // Handle Save Changes (update)
  const handleSaveChanges = async () => {
    // Validate inputs before proceeding
    if (
      !product.name ||
      !product.amount ||
      !product.unit ||
      !newCategoryId ||
      !newSubcategoryId ||
      !newTypeId
    ) {
      setError("Please fill in all required fields.");
      return;
    } else if (!pnpPrice && !woolworthsPrice && !checkersPrice && !sparPrice) {
      setError("Please enter at least one price for your product.");
      return;
    }

    setIsUpdating(true);
    setError(null);

    try {
      const formData = new FormData();

      // Append product details to formData
      formData.append(
        "productData",
        JSON.stringify({
          name: prettifyTextInput(product.name),
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

      // console.log("Form data to update:", formData);

      // Call the service to update the product
      await updateProductById(productId, formData);

      // Navigate back to the previous page
      navigate(from);
    } catch (error) {
      console.error("Failed to save product changes:", error);
      setError("Failed to save changes. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };
  // ----------------------------------------------

  return (
    <>
      <NavigationBar admin />
      <Container className="mb-32">
        <div className="flex w-full justify-between pt-6">
          <div>
            <h2>Edit Product</h2>
            {error && <p className="text-red-600 mb-2">{error}</p>}
          </div>
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
        {isLoading ? (
          <div className="w-full flex justify-center items-center mt-20 p-16">
            <Loader color="#C34534" loading={true} />
          </div>
        ) : (
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
                        maxLength={40}
                      />
                    </FloatingLabel>
                  </Form.Floating>
                  <Form.Floating>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Measurement Amount"
                      className="mb-4"
                    >
                      {/* <Form.Control
                        type="number"
                        placeholder=""
                        
                        className="input-style"
                        onChange={(e) => handleInputChange("amount", e.target.value)}
                      /> */}
                      <Form.Control
                        type="text"
                        inputMode="numeric"
                        placeholder=""
                        value={product.amount || ""}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                          handleInputChange("amount", numericValue);
                        }}
                        className="input-style"
                        maxLength={5}
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
                        {subcategories.length > 0 &&
                          subcategories.map(([subId, subcategory]) => (
                            <option key={subId} value={subId}>
                              {formatName(subcategory.name)}
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
                        {productTypes.length > 0 &&
                          productTypes.map(([typeId, productType]) => (
                            <option key={typeId} value={typeId}>
                              {formatName(productType.name)}
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
        )}
      </Container>
      <Footer />
    </>
  );
}

export default AdminEditDash;
