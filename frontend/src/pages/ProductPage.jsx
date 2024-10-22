// IMPORT
// -----------------------------------------------------------
// React & Hooks
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

// Services
import {
  getProductById,
  flagProductById,
  updateProductPricesById,
} from "../services/productService";
import { getBreadcrumbByProductId } from "../services/breadcrumbService";
import { getUserDetails } from "../services/userService";

// Utility Functions
import { getCheapestPrice } from "../utils/priceUtils";
import { formatName } from "../utils/wordFormatUtils";
import { getCurrentDate, formatFullDateToSlashShort } from "../utils/dateUtils";

// Third-Party Components
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  Stack,
  Form,
  InputGroup,
  Button,
  Modal,
  FloatingLabel,
} from "react-bootstrap";

// Internal Components
import NavigationBar from "../components/navigation/NavigationBar";
import Btn from "../components/button/Btn";
import StoreLogo from "../components/building-blocks/StoreLogo";
import IconBtn from "../components/button/IconBtn";
import MiniStorePriceBlock from "../components/building-blocks/MiniStorePriceBlock";
import Footer from "../components/navigation/Footer";
import StorePricingSpecialInput from "../components/input/StorePricingSpecialInput";

// Imagery
//-

// -----------------------------------------------------------
function ProductPage() {
  const navigate = useNavigate();

  const { productId } = useParams();

  // STATES
  // ----------------------------------------------
  const [product, setProduct] = useState({});
  const [breadcrumb, setBreadcrumb] = useState({});
  const [formattedBreadcrumbArr, setFormattedBreadcrumbArr] = useState([]);
  const [prices, setPrices] = useState([]);
  const [cheapestStores, setCheapestStores] = useState([]);
  const [otherStores, setOtherStores] = useState([]);
  const [cheapestPrice, setCheapestPrice] = useState(null);
  const [savings, setSavings] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);
  // ----------------------------------------------

  // PRODUCT & PRICING
  // ----------------------------------------------
  // Fetch product details and breadcrumb when page loads
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Fetch product data
        const productData = await getProductById(productId);
        setProduct(productData);
        // // Fetch breadcrumb data
        const breadcrumbData = await getBreadcrumbByProductId(productId);
        setBreadcrumb(breadcrumbData);
      } catch (error) {
        console.error("Failed to fetch product or breadcrumb data", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  // Set Prices after product loaded
  useEffect(() => {
    // console.log(product);
    // If product exists
    if (Object.keys(product).length > 0) {
      const storePrices = [
        {
          store: "pnp",
          price: parseFloat(product.pnp.price) || null,
          updated: product.pnp.updated || "No data",
          specialDate: product.pnp?.special || "",
        },
        {
          store: "woolworths",
          price: parseFloat(product.woolworths.price) || null,
          updated: product.woolworths.updated || "No data",
          specialDate: product.woolworths?.special || "",
        },
        {
          store: "checkers",
          price: parseFloat(product.checkers.price) || null,
          updated: product.checkers.updated || "No data",
          specialDate: product.checkers?.special || "",
        },
        {
          store: "spar",
          price: parseFloat(product.spar.price) || null,
          updated: product.spar.updated || "No data",
          specialDate: product.spar?.special || "",
        },
      ];

      setPrices(storePrices);
    }
  }, [product]);

  // Pricing calculations after price loaded
  useEffect(() => {
    // console.log("prices", prices);
    // If prices exists
    if (prices.length > 0) {
      const { cheapestPrice, cheapestStores, otherStores } = getCheapestPrice(prices);
      setCheapestPrice(cheapestPrice);
      setCheapestStores(cheapestStores);
      setOtherStores(otherStores);

      // Calculate the savings if there are other stores
      if (otherStores.length > 0) {
        const maxOtherPrice = Math.max(...otherStores.map((store) => store.price || 0));
        const savings = maxOtherPrice - cheapestPrice;
        setSavings(savings > 0 ? savings.toFixed(2) : null);
      }
    }
  }, [prices]);

  // Special Icon Date (of 1 cheapest store only)
  const firstSpecialStore = cheapestStores.find(
    (store) => store.specialDate && store.specialDate !== ""
  );
  // ----------------------------------------------

  // BREADCRUMBS
  // ----------------------------------------------
  // Breadcrumb Formatting
  useEffect(() => {
    if (breadcrumb) {
      const formattedArray = [];

      // Conditionally add each part to the array only if it exists
      if (breadcrumb["category"]) {
        formattedArray.push({
          name: formatName(breadcrumb["category"]),
          id: breadcrumb["categoryId"],
        });
      }
      if (breadcrumb["subcategory"]) {
        formattedArray.push({
          name: formatName(breadcrumb["subcategory"]),
          id: breadcrumb["subcategoryId"],
        });
      }
      if (breadcrumb["type"]) {
        formattedArray.push({ name: formatName(breadcrumb["type"]), id: breadcrumb["typeId"] });
      }

      setFormattedBreadcrumbArr(formattedArray);

      // console.log("Formatted Breadcrumb:", formattedArray);
    }
  }, [breadcrumb]);

  // Breadcrumbs Click
  const handleBreadcrumbClick = (id) => {
    navigate(`/groceries/${id}`);
  };
  // ----------------------------------------------

  // CART
  // ----------------------------------------------
  useEffect(() => {
    const fetchLoggedUser = async () => {
      const user = await getUserDetails();
      setLoggedUser(user);
    };
    fetchLoggedUser();
  }, []);

  useEffect(() => {
    console.log(loggedUser);
  }, [loggedUser]);

  // ----------------------------------------------

  // MODALS
  // ----------------------------------------------
  // Update Pricing Modal
  // - - - - - - - - - - - - - - - - -
  // Pricing Modal States
  const [showPriceModal, setShowPriceModal] = useState(false);

  // Stores States
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

  // Open & Close Modal
  const handlePriceModalClose = () => setShowPriceModal(false);
  const handlePriceModalShow = () => {
    setPnpPrice(product.pnp?.price || "");
    setPnpUpdatedDate(product.pnp?.updated || "");
    setPnpOnSpecial(product.pnp?.special ? true : false);
    setPnpSpecialDate(product.pnp?.special || "");

    setWoolworthsPrice(product.woolworths?.price || "");
    setWoolworthsUpdatedDate(product.woolworths?.updated || "");
    setWoolworthsOnSpecial(product.woolworths?.special ? true : false);
    setWoolworthsSpecialDate(product.woolworths?.special || "");

    setCheckersPrice(product.checkers?.price || "");
    setCheckersUpdatedDate(product.checkers?.updated || "");
    setCheckersOnSpecial(product.checkers?.special ? true : false);
    setCheckersSpecialDate(product.checkers?.special || "");

    setSparPrice(product.spar?.price || "");
    setSparUpdatedDate(product.spar?.updated || "");
    setSparOnSpecial(product.spar?.special ? true : false);
    setSparSpecialDate(product.spar?.special || "");

    setShowPriceModal(true);
  };

  // Pricing Modal Input Change
  const handleInputChange = (field, value) => {
    const today = getCurrentDate();

    switch (field) {
      // Pick n Pay
      case "pnpPrice":
        setPnpPrice(value);
        setPnpUpdatedDate(today);
        break;
      case "pnpOnSpecial":
        setPnpOnSpecial(value);
        setPnpUpdatedDate(today);
        break;
      case "pnpSpecialDate":
        setPnpSpecialDate(value);
        setPnpUpdatedDate(today);
        break;
      // Woolworths
      case "woolworthsPrice":
        setWoolworthsPrice(value);
        setWoolworthsUpdatedDate(today);
        break;
      case "woolworthsOnSpecial":
        setWoolworthsOnSpecial(value);
        setWoolworthsUpdatedDate(today);
        break;
      case "woolworthsSpecialDate":
        setWoolworthsSpecialDate(value);
        setWoolworthsUpdatedDate(today);
        break;
      // Checkers
      case "checkersPrice":
        setCheckersPrice(value);
        setCheckersUpdatedDate(today);
        break;
      case "checkersOnSpecial":
        setCheckersOnSpecial(value);
        setCheckersUpdatedDate(today);
        break;
      case "checkersSpecialDate":
        setCheckersSpecialDate(value);
        setCheckersUpdatedDate(today);
        break;
      // Spar
      case "sparPrice":
        setSparPrice(value);
        setSparUpdatedDate(today);
        break;
      case "sparOnSpecial":
        setSparOnSpecial(value);
        setSparUpdatedDate(today);
        break;
      case "sparSpecialDate":
        setSparSpecialDate(value);
        setSparUpdatedDate(today);
        break;
      default:
        break;
    }
  };

  // Pricing Modal Update Prices Btn Click
  const handleUpdatePrices = async () => {
    const updatedPrices = {
      pnp: {
        price: pnpPrice || null,
        updated: pnpUpdatedDate,
        special: pnpOnSpecial ? pnpSpecialDate : null,
      },
      woolworths: {
        price: woolworthsPrice || null,
        updated: woolworthsUpdatedDate,
        special: woolworthsOnSpecial ? woolworthsSpecialDate : null,
      },
      checkers: {
        price: checkersPrice || null,
        updated: checkersUpdatedDate,
        special: checkersOnSpecial ? checkersSpecialDate : null,
      },
      spar: {
        price: sparPrice || null,
        updated: sparUpdatedDate,
        special: sparOnSpecial ? sparSpecialDate : null,
      },
    };

    try {
      await updateProductPricesById(productId, updatedPrices);
      handlePriceModalClose();
      window.location.reload();
    } catch (error) {
      console.error("Failed to update prices:", error);
    }
  };
  // - - - - - - - - - - - - - - - - -

  // Flagging Modal
  // - - - - - - - - - - - - - - - - -
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [flagMessage, setFlagMessage] = useState("");

  const handleFlagModalClose = () => setShowFlagModal(false);
  const handleFlagModalShow = () => setShowFlagModal(true);

  // Handle Product Flagging Btn Click
  const handleFlagProduct = async () => {
    try {
      await flagProductById(productId, flagMessage); // Pass the flagMessage to the service function
      // console.log("You flagged the product:", productId);
      handleFlagModalClose();
      navigate("/groceries");
    } catch (error) {
      console.error("Error flagging product:", error);
    }
  };
  // - - - - - - - - - - - - - - - - -
  // ----------------------------------------------

  return (
    <>
      <NavigationBar />
      <Container className="pt-6 mb-32">
        {/* Product Content */}
        {!product ? (
          <p>Loading Product</p>
        ) : (
          <>
            {formattedBreadcrumbArr && (
              <Breadcrumb>
                <Breadcrumb.Item href="/groceries">Groceries</Breadcrumb.Item>
                {formattedBreadcrumbArr.map((bread, index) => (
                  <Breadcrumb.Item key={index} onClick={() => handleBreadcrumbClick(bread.id)}>
                    {bread.name}
                  </Breadcrumb.Item>
                ))}
                <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
              </Breadcrumb>
            )}
            <div className="flex w-full pt-4">
              {/* Image */}
              <div className="relative w-[400px] mr-8">
                <img src={product.image} alt="img" className="object-center absolute" />
                {cheapestStores.some((store) => store.specialDate && store.specialDate !== "") && (
                  <div className="absolute bottom-0 right-5 bg-sky-800 text-white rounded-full h-32 w-32 flex flex-col items-center justify-center text-center">
                    <h4 className="mb-1">Special</h4>
                    <p>{formatFullDateToSlashShort(firstSpecialStore.specialDate)}</p>
                  </div>
                )}
              </div>

              {/* Text Details */}
              <div className="flex flex-col justify-between">
                <div>
                  {/* Title */}
                  <div className="flex">
                    <h2 className="mr-3">{product.name}</h2>
                    <h2 className="text-gray-400">
                      {product.amount}
                      {product.unit}
                    </h2>
                  </div>
                  {/* Price */}
                  {prices.length > 0 && cheapestPrice !== null && (
                    <div className="flex mt-8">
                      {/* Cheapest Price */}
                      <div className="w-fit">
                        {/* All Stores Same Price */}
                        {cheapestStores.length === 4 && (
                          <div className="h-8 flex items-center justify-start gap-4">
                            {cheapestStores.map((store, index) => (
                              <StoreLogo
                                key={index}
                                store={store.store}
                                type="mini"
                                className="h-full"
                              />
                            ))}
                          </div>
                        )}
                        {/* 3 Stores Cheapest Price */}
                        {cheapestStores.length === 3 && (
                          <div className="h-8 flex items-center justify-start gap-4">
                            {cheapestStores.map((store, index) => (
                              <StoreLogo
                                key={index}
                                store={store.store}
                                type="mini"
                                className="h-full"
                              />
                            ))}
                          </div>
                        )}
                        {/* 2 Stores Cheapest Price */}
                        {cheapestStores.length === 2 && (
                          <div className="h-8 flex items-center justify-start gap-4">
                            {cheapestStores.map((store, index) => (
                              <StoreLogo key={index} store={store.store} className="h-5" />
                            ))}
                          </div>
                        )}
                        {cheapestStores.length === 1 && (
                          <div className="h-8 flex items-center justify-start">
                            {cheapestStores.map((store, index) => (
                              <StoreLogo key={index} store={store.store} className="h-full" />
                            ))}
                          </div>
                        )}
                        <h1 className="mb-[-8px]">R{cheapestPrice.toFixed(2)}</h1>
                        <small>
                          Last Updated: {cheapestStores.map((store) => store.updated).join(" | ")}
                        </small>
                        {otherStores.length > 0 && savings && (
                          <div className="py-2 px-4 bg-neutral-100 w-fit rounded-xl mt-2">
                            <p className="font-bold">Save | R{savings}</p>
                          </div>
                        )}
                      </div>
                      {otherStores.length > 0 && (
                        <div className="ml-10 mt-6">
                          <p className="font-bold">Other Stores</p>
                          <Stack direction="horizontal" gap={5} className="mt-2">
                            {otherStores.map((store, index) => (
                              <MiniStorePriceBlock
                                key={index}
                                store={store.store}
                                price={store.price.toFixed(2)}
                                updated={store.updated}
                              />
                            ))}
                          </Stack>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {/* Buttons */}
                <Stack direction="horizontal" gap={3} className="my-8">
                  <InputGroup className="bg-neutral-100 w-fit rounded-xl">
                    <IconBtn variant="tertiary" iconType="minus" />
                    <Form.Control
                      type="number"
                      className="bg-transparent border-none text-center fw-bold p-0 no-arrows w-8"
                    />
                    <IconBtn variant="tertiary" iconType="add" />
                  </InputGroup>
                  <Btn>Add to Cart</Btn>
                  <Btn variant="secondary" onClick={handlePriceModalShow}>
                    Update Price(s)
                  </Btn>
                  <IconBtn variant="dark" iconType="flag" onClick={handleFlagModalShow} />
                </Stack>
              </div>
            </div>
          </>
        )}
      </Container>
      <Footer />

      {/* UPDATE PRICE MODAL */}
      <Modal show={showPriceModal} onHide={handlePriceModalClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Update Pricing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-4">Update the prices for {product.name}</p>
          <div className="flex space-x-8">
            <StorePricingSpecialInput
              storeKey="pnp"
              storePrice={pnpPrice}
              setStorePrice={(value) => handleInputChange("pnpPrice", value)}
              onSpecial={pnpOnSpecial}
              setOnSpecial={(value) => handleInputChange("pnpOnSpecial", value)}
              storeSpecialDate={pnpSpecialDate}
              setStoreSpecialDate={(value) => handleInputChange("pnpSpecialDate", value)}
              className={"w-full"}
            />
            <StorePricingSpecialInput
              storeKey="woolworths"
              storePrice={woolworthsPrice}
              setStorePrice={(value) => handleInputChange("woolworthsPrice", value)}
              onSpecial={woolworthsOnSpecial}
              setOnSpecial={(value) => handleInputChange("woolworthsOnSpecial", value)}
              storeSpecialDate={woolworthsSpecialDate}
              setStoreSpecialDate={(value) => handleInputChange("woolworthsSpecialDate", value)}
              className={"w-full"}
            />
          </div>
          <div className="flex space-x-8">
            <StorePricingSpecialInput
              storeKey="checkers"
              storePrice={checkersPrice}
              setStorePrice={(value) => handleInputChange("checkersPrice", value)}
              onSpecial={checkersOnSpecial}
              setOnSpecial={(value) => handleInputChange("checkersOnSpecial", value)}
              storeSpecialDate={checkersSpecialDate}
              setStoreSpecialDate={(value) => handleInputChange("checkersSpecialDate", value)}
              className={"w-full"}
            />
            <StorePricingSpecialInput
              storeKey="spar"
              storePrice={sparPrice}
              setStorePrice={(value) => handleInputChange("sparPrice", value)}
              onSpecial={sparOnSpecial}
              setOnSpecial={(value) => handleInputChange("sparOnSpecial", value)}
              storeSpecialDate={sparSpecialDate}
              setStoreSpecialDate={(value) => handleInputChange("sparSpecialDate", value)}
              className={"w-full"}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Btn variant="secondary" onClick={handlePriceModalClose}>
            Cancel
          </Btn>
          <Btn onClick={handleUpdatePrices}>Update Prices</Btn>
        </Modal.Footer>
      </Modal>

      {/* FLAGGING MODAL */}
      <Modal show={showFlagModal} onHide={handleFlagModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Report a Problem</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-4">What seems to be the problem with {product.name}?</p>
          <Form.Floating>
            <FloatingLabel controlId="floatingInput" label="Problem Description" className="mb-4">
              <Form.Control
                as="textarea"
                placeholder=""
                value={flagMessage}
                onChange={(e) => setFlagMessage(e.target.value)}
                className="input-style h-32"
              />
            </FloatingLabel>
          </Form.Floating>
        </Modal.Body>
        <Modal.Footer>
          <Btn variant="secondary" onClick={handleFlagModalClose}>
            Cancel
          </Btn>
          <Btn onClick={handleFlagProduct}>Report Product</Btn>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductPage;
