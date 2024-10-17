// IMPORT
// -----------------------------------------------------------
// React & Hooks
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

// Services
import { getProductById } from "../services/productService";
import { getBreadcrumbByProductId } from "../services/breadcrumbService";

// Utility Functions
import { getCheapestPrice } from "../utils/priceUtils";
import { formatName } from "../utils/wordFormatUtils";

// Third-Party Components
import { Container, Row, Col, Breadcrumb, Stack, Form, InputGroup } from "react-bootstrap";

// Internal Components
import NavigationBar from "../components/navigation/NavigationBar";
import Btn from "../components/button/Btn";
import StoreLogo from "../components/building-blocks/StoreLogo";
import IconBtn from "../components/button/IconBtn";
import MiniStorePriceBlock from "../components/building-blocks/MiniStorePriceBlock";
import Footer from "../components/navigation/Footer";

// Imagery
//-

// -----------------------------------------------------------
function ProductPage() {
  const navigate = useNavigate();

  const { productId } = useParams();

  const [product, setProduct] = useState({});
  const [breadcrumb, setBreadcrumb] = useState({});
  const [formattedBreadcrumbArr, setFormattedBreadcrumbArr] = useState([]);
  const [prices, setPrices] = useState([]);
  const [cheapestStores, setCheapestStores] = useState([]);
  const [otherStores, setOtherStores] = useState([]);
  const [cheapestPrice, setCheapestPrice] = useState(null);
  const [savings, setSavings] = useState(null);

  // GET
  // ----------------------------------------------

  // Fetch product details and breadcrumb when page loads
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Fetch product data
        const productData = await getProductById(productId);
        setProduct(productData);

        // Fetch breadcrumb data
        const breadcrumbData = await getBreadcrumbByProductId(productId);
        setBreadcrumb(breadcrumbData);
      } catch (error) {
        console.error("Failed to fetch product or breadcrumb data", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  // Breadcrumb Formatting
  useEffect(() => {
    if (breadcrumb) {
      const formattedArray = [];

      // Conditionally add each part to the array only if it exists
      if (breadcrumb["category"]) {
        formattedArray.push(formatName(breadcrumb["category"]));
      }
      if (breadcrumb["subcategory"]) {
        formattedArray.push(formatName(breadcrumb["subcategory"]));
      }
      if (breadcrumb["type"]) {
        formattedArray.push(formatName(breadcrumb["type"]));
      }

      setFormattedBreadcrumbArr(formattedArray);

      // Log the formatted array for debugging
      console.log("Formatted Breadcrumb:", formattedArray);
    }
  }, [breadcrumb]);

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
        },
        {
          store: "woolworths",
          price: parseFloat(product.woolworths.price) || null,
          updated: product.woolworths.updated || "No data",
        },
        {
          store: "checkers",
          price: parseFloat(product.checkers.price) || null,
          updated: product.checkers.updated || "No data",
        },
        {
          store: "spar",
          price: parseFloat(product.spar.price) || null,
          updated: product.spar.updated || "No data",
        },
      ];

      setPrices(storePrices);
    }
  }, [product]);

  // Pricing calculations after price loaded
  useEffect(() => {
    // console.log(prices);
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
                  <Breadcrumb.Item key={index} href="">
                    {bread}
                  </Breadcrumb.Item>
                ))}
                <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
              </Breadcrumb>
            )}
            <div className="flex w-full pt-4">
              {/* Image */}
              <img src={product.image} alt="img" className="w-[400px] object-contain mr-8" />
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
                  <Btn variant="secondary">Update Price(s)</Btn>
                  <IconBtn variant="dark" iconType="flag" />
                </Stack>
              </div>
            </div>
          </>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default ProductPage;
