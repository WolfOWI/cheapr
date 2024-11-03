// IMPORT
// -----------------------------------------------------------
// React & Hooks
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Services
import { getAllApprovedProducts, getProductsByGroupId } from "../services/productService";
import { getBreadcrumbByGroupId } from "../services/breadcrumbService";
import { getUserCart, addToCart, removeFromCart } from "../services/userService";

// Utility Functions
import { sortProducts } from "../utils/productSortUtils";
import { formatName } from "../utils/wordFormatUtils";

// Third-Party Components
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Loader from "react-spinners/PropagateLoader";

// Internal Components
import NavigationBar from "../components/navigation/NavigationBar";
import Btn from "../components/button/Btn";
import StoreLogo from "../components/building-blocks/StoreLogo";
import ProductItem from "../components/listItems/ProductItem";
import Footer from "../components/navigation/Footer";
import Drpdwn from "../components/input/Drpdwn";

// Imagery
// -

// -----------------------------------------------------------
function GroceriesPage() {
  const { groupId } = useParams();

  const [products, setProducts] = useState({});
  const [userCart, setUserCart] = useState([]);
  const [breadcrumb, setBreadcrumb] = useState({});
  const [formattedBreadcrumbArr, setFormattedBreadcrumbArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortDropLabel, setSortDropLabel] = useState("Most Recent"); // Dropdown Label

  const navigate = useNavigate();

  // On Page Mount (When groupId changes (category / subcat / type))
  useEffect(() => {
    const fetchProductsAndCart = async () => {
      setIsLoading(true);

      try {
        // Fetch products based on groupId
        let productsData;
        if (groupId) {
          productsData = await getProductsByGroupId(groupId);
        } else {
          productsData = await getAllApprovedProducts();
        }

        // Fetch user's cart data concurrently
        const cartData = await getUserCart();
        setUserCart(cartData);

        // Sort products
        const sortedData = sortProducts(productsData, "NewestApproved");

        // For each product, check if it's in the cart & add "inCart" boolean
        for (let productId in sortedData) {
          const productInCart = cartData.some((cartItem) => cartItem.productId === productId);

          if (productInCart) {
            sortedData[productId]["inCart"] = true;
          } else {
            sortedData[productId]["inCart"] = false;
          }
        }

        // Update products with "inCart" status
        setProducts(sortedData);
      } catch (error) {
        console.error("Failed to fetch products or cart data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch the current breadcrumb
    const fetchBreadcrumb = async () => {
      try {
        let breads;
        if (groupId) {
          breads = await getBreadcrumbByGroupId(groupId);
        }
        setBreadcrumb(breads);
      } catch (error) {
        console.error("Failed to fetch breadcrumb data:", error);
      }
    };

    fetchProductsAndCart(); // Fetch products & cart together
    fetchBreadcrumb(); // Fetch breadcrumbs separately
  }, [groupId]);

  // Format Breadcrumb Name (fruits_and_veggies to Fruits & Veggies)
  useEffect(() => {
    if (breadcrumb) {
      const formattedArray = [];

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
    }
  }, [breadcrumb]);

  // ----------------------
  // useEffect(() => {
  //   if (products) {
  //     console.log("products:", products);
  //   }
  // }, [products]);

  // useEffect(() => {
  //   if (userCart) {
  //     console.log("userCart:", userCart);
  //   }
  // }, [userCart]);
  // ----------------------

  // Handle sort dropdown select
  const handleSelect = (eventKey) => {
    console.log(`Selected sort option: ${eventKey}`);

    switch (eventKey) {
      case "AtoZ":
        setSortDropLabel("Alphabetical (A to Z)");
        setProducts(sortProducts(products, "AtoZ"));
        break;
      case "ZtoA":
        setSortDropLabel("Alphabetical (Z to A)");
        setProducts(sortProducts(products, "ZtoA"));
        break;
      case "NewestApproved":
        setSortDropLabel("Most Recent");
        setProducts(sortProducts(products, "NewestApproved"));
        break;
      case "OldestApproved":
        setSortDropLabel("Oldest");
        setProducts(sortProducts(products, "OldestApproved"));
        break;
      case "Cheapest":
        setSortDropLabel("Lowest Price");
        setProducts(sortProducts(products, "Cheapest"));
        break;
      case "Expensive":
        setSortDropLabel("Highest Price");
        setProducts(sortProducts(products, "Expensive"));
        break;

      default:
        setSortDropLabel("Most Recent");
        setProducts(sortProducts(products, "NewestApproved"));
        break;
    }
  };

  const handleOnViewClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleBreadcrumbClick = (id) => {
    navigate(`/groceries/${id}`);
  };

  // Add To Cart Clicked
  const handleAddCartClick = async (productId) => {
    try {
      await addToCart(productId, 1);
      console.log("Product successfully added to cart: ", productId);

      // Update the userCart and products state
      setUserCart([...userCart, { productId }]); // Add to cart state
      setProducts((prevProducts) => ({
        ...prevProducts,
        [productId]: { ...prevProducts[productId], inCart: true }, // Update inCart flag
      }));
    } catch (error) {
      console.log("Product couldn't be added to cart: ", error);
    }
  };

  // Remove From Cart Clicked
  const handleRemoveCartClick = async (productId) => {
    try {
      await removeFromCart(productId);
      console.log("Product successfully removed from cart: ", productId);

      // Update the userCart and products state
      setUserCart(userCart.filter((item) => item.productId !== productId)); // Remove from cart state
      setProducts((prevProducts) => ({
        ...prevProducts,
        [productId]: { ...prevProducts[productId], inCart: false }, // Update inCart flag
      }));
    } catch (error) {
      console.log("Product couldn't be removed from cart: ", error);
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="mb-32">
        <Container className="pt-6 mb-12 lg:mb-2">
          <Breadcrumb>
            <Breadcrumb.Item href="/groceries">Groceries</Breadcrumb.Item>
            {formattedBreadcrumbArr.map((bread, index) => (
              <Breadcrumb.Item key={index} onClick={() => handleBreadcrumbClick(bread.id)}>
                {bread.name}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center">
            {
              <div className="flex flex-row justify-between items-center sm:flex-col sm:justify-normal sm:items-start">
                <h2 className="text-4xl md:text-5xl mb-4 sm:mb-0">
                  {groupId
                    ? formattedBreadcrumbArr.length > 0 &&
                      formattedBreadcrumbArr[formattedBreadcrumbArr.length - 1].name
                    : "All Groceries"}
                </h2>
                <h4 className="lg:hidden mr-2 text-neutral-500 font-normal">
                  {Object.keys(products).length} Product
                  {Object.keys(products).length === 1 ? "" : "s"}
                </h4>
              </div>
            }

            <Drpdwn
              title={`Sort: ${sortDropLabel}`}
              variant="dark-outline"
              onSelect={handleSelect}
              className="w-full sm:w-fit"
            >
              <Dropdown.Item eventKey="AtoZ">Alphabetical (A to Z)</Dropdown.Item>
              <Dropdown.Item eventKey="ZtoA">Alphabetical (Z to A)</Dropdown.Item>
              <Dropdown.Item eventKey="NewestApproved">Most Recent</Dropdown.Item>
              <Dropdown.Item eventKey="OldestApproved">Oldest</Dropdown.Item>
              <Dropdown.Item eventKey="Cheapest">Lowest Price</Dropdown.Item>
              <Dropdown.Item eventKey="Expensive">Highest Price</Dropdown.Item>
            </Drpdwn>
          </div>
        </Container>
        {/* Header */}
        <div className="bg-neutral-700 py-8 w-100 mt-4 hidden lg:block">
          <Container>
            {/* Larger desktop views */}
            <Row className=" items-center">
              <Col xs={3}>
                <h4 className="text-white font-bold text-base">
                  {Object.keys(products).length} Product
                  {Object.keys(products).length === 1 ? "" : "s"}
                </h4>
              </Col>
              <Col xs={2} className="flex items-center justify-center">
                <StoreLogo store="pnp" type="white" className="h-4" />
              </Col>
              <Col xs={2} className="flex items-center justify-center">
                <StoreLogo store="woolworths" type="white" className="h-4" />
              </Col>
              <Col xs={2} className="flex items-center justify-center">
                <StoreLogo store="checkers" type="white" className="h-4" />
              </Col>
              <Col xs={2} className="flex items-center justify-center">
                <StoreLogo store="spar" type="white" className="h-4" />
              </Col>
            </Row>
          </Container>
        </div>

        {/* Product List Container */}
        <Container className="my-4">
          {/* Product Rows */}
          {isLoading ? (
            <div className="w-full flex justify-center items-center mt-20">
              <Loader color="#C34534" size={20} loading={true} />
            </div>
          ) : (
            <>
              {Object.keys(products).length > 0 ? (
                Object.keys(products).map((productId, index) => (
                  <ProductItem
                    key={index}
                    product={products[productId]}
                    onViewClick={() => handleOnViewClick(productId)}
                    onAddCartClick={() => handleAddCartClick(productId)}
                    onRemoveCartClick={() => handleRemoveCartClick(productId)}
                  />
                ))
              ) : (
                <div className="w-full pt-8 pb-32">
                  <h3>No Products Listed</h3>
                  <p className="mt-2">There are no products in this category right now.</p>
                  <Btn className="mt-8" onClick={() => navigate("/groceries/")}>
                    Show All Groceries
                  </Btn>
                </div>
              )}
            </>
          )}
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default GroceriesPage;
