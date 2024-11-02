// IMPORT
// -----------------------------------------------------------
// React & Hooks
import { useState, useEffect } from "react";

// Services
import { getUserCart, addToCart, removeFromCart, clearCart } from "../services/userService";
import { getProductById } from "../services/productService";

// Utility Functions
import { getCheapestPrice } from "../utils/priceUtils";

// Third-Party Components
import { Container, Row, Col, Stack } from "react-bootstrap";
import Loader from "react-spinners/PropagateLoader";

// Internal Components
import NavigationBar from "../components/navigation/NavigationBar";
import Btn from "../components/button/Btn";
import StoreLogo from "../components/building-blocks/StoreLogo";
import StoreCartList from "../components/page-specific/cartComps/StoreCartList";
import CartItem from "../components/page-specific/cartComps/CartItem";
import Footer from "../components/navigation/Footer";

// Imagery
// -

// -----------------------------------------------------------
function CartPlannerPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [userCart, setUserCart] = useState([]);
  const [allCartProducts, setAllCartProducts] = useState([]);

  // Store Product States
  const [pnpProducts, setPnpProducts] = useState([]);
  const [woolworthsProducts, setWoolworthsProducts] = useState([]);
  const [checkersProducts, setCheckersProducts] = useState([]);
  const [sparProducts, setSparProducts] = useState([]);

  // POPULATE THE CART LIST
  // ------------------------------------------------
  // On page load, fetch user's cart
  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const cartData = await getUserCart();
        setUserCart(cartData);
      } catch (error) {
        console.log("Couldn't fetch user's cart.");
      }
    };

    fetchUserCart();
  }, []);

  // On userCart change, fetch product details
  useEffect(() => {
    const fetchCartProductDetails = async () => {
      // console.log("Trying to fetch the cart", userCart);
      try {
        // Check if there are items in the cart
        if (userCart.length > 0) {
          const productsWithDetails = await Promise.all(
            userCart.map(async (cartItem) => {
              const productInfo = await getProductById(cartItem.productId);
              return {
                ...cartItem,
                productInfo,
              };
            })
          );

          setAllCartProducts(productsWithDetails);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("Couldn't fetch product details for the cart.", error);
        setIsLoading(false);
      }
    };

    // Only call this effect if userCart has items
    if (userCart.length > 0 || userCart.length === 0) {
      fetchCartProductDetails();
    }

    // Timeout to stop loading if the cart is empty after 1 second
    const timeoutId = setTimeout(() => {
      if (userCart.length === 0) {
        setIsLoading(false);
      }
    }, 1500);

    // Clean up the timeout on component unmount
    return () => clearTimeout(timeoutId);
  }, [userCart]);

  // On allCartProducts change, sort into correct groups
  useEffect(() => {
    // console.log("allCartProducts", allCartProducts);

    const sortProductsByStore = () => {
      // Reset store products before sorting
      let pnp = [];
      let woolworths = [];
      let checkers = [];
      let spar = [];

      allCartProducts.forEach((cartProduct) => {
        // Determine the cheapest store(s) for the product
        const prices = [
          { store: "pnp", price: cartProduct.productInfo.pnp.price },
          { store: "woolworths", price: cartProduct.productInfo.woolworths.price },
          { store: "checkers", price: cartProduct.productInfo.checkers.price },
          { store: "spar", price: cartProduct.productInfo.spar.price },
        ];

        const { cheapestStores } = getCheapestPrice(prices);

        // Add product to first cheapestStores
        for (let i = 0; i < cheapestStores.length; i++) {
          const store = cheapestStores[i].store;

          if (store === "pnp") {
            pnp.push(cartProduct);
            break;
          } else if (store === "woolworths") {
            woolworths.push(cartProduct);
            break;
          } else if (store === "checkers") {
            checkers.push(cartProduct);
            break;
          } else if (store === "spar") {
            spar.push(cartProduct);
            break;
          }
        }
      });

      // Set sorted products to corresponding store states
      setPnpProducts(pnp);
      setWoolworthsProducts(woolworths);
      setCheckersProducts(checkers);
      setSparProducts(spar);
    };

    // Call sorting function if allCartProducts is set
    if (allCartProducts.length > 0) {
      sortProductsByStore();
    }
  }, [allCartProducts]);

  // Calcuclate the final totals
  const calculateTotals = () => {
    let totalCost = 0;
    let totalSavings = 0;

    allCartProducts.forEach((cartProduct) => {
      const quantity = cartProduct.quantity;

      // Get all store prices for comparison
      const prices = [
        cartProduct.productInfo.pnp.price,
        cartProduct.productInfo.woolworths.price,
        cartProduct.productInfo.checkers.price,
        cartProduct.productInfo.spar.price,
      ];

      const cheapestPrice = Math.min(...prices.filter((price) => price > 0));
      const mostExpensivePrice = Math.max(...prices.filter((price) => price > 0));

      totalCost += cheapestPrice * quantity;
      totalSavings += (mostExpensivePrice - cheapestPrice) * quantity;
    });

    return { totalCost, totalSavings };
  };

  const { totalCost, totalSavings } = calculateTotals();
  // ------------------------------------------------

  // USER ACTIONS
  // ------------------------------------------------
  // Jump product between stores (dropdown btn)
  const moveProductToStore = (targetStore, product) => {
    // console.log("targetStore:", targetStore);
    // console.log("product:", product);

    // Remove product from current store
    setPnpProducts((prev) => prev.filter((item) => item.productId !== product.productId));
    setWoolworthsProducts((prev) => prev.filter((item) => item.productId !== product.productId));
    setCheckersProducts((prev) => prev.filter((item) => item.productId !== product.productId));
    setSparProducts((prev) => prev.filter((item) => item.productId !== product.productId));

    // Add product to the selected store's array
    switch (targetStore) {
      case "pnp":
        setPnpProducts((prev) => [...prev, { ...product }]);
        break;
      case "woolworths":
        setWoolworthsProducts((prev) => [...prev, { ...product }]);
        break;
      case "checkers":
        setCheckersProducts((prev) => [...prev, { ...product }]);
        break;
      case "spar":
        setSparProducts((prev) => [...prev, { ...product }]);
        break;
      default:
        break;
    }
  };

  // Clear Cart Clicked
  const handleClearCart = async () => {
    try {
      await clearCart();
      setAllCartProducts([]);
      setUserCart([]);
      setPnpProducts([]);
      setWoolworthsProducts([]);
      setCheckersProducts([]);
      setSparProducts([]);
    } catch (error) {
      console.error("Failed to clear the cart:", error);
    }
  };

  // Delete Cart Item
  // ------------------------------------------------
  const handleItemDelete = async (id) => {
    try {
      await removeFromCart(id);
      console.log("Product removed from cart:", id);

      refreshCart();
    } catch (error) {
      console.log("Product couldn't be removed from cart: ", error);
    }
  };

  // REFRESH
  // ------------------------------------------------
  const refreshCart = async () => {
    try {
      const cartData = await getUserCart();
      setUserCart(cartData);
    } catch (error) {
      console.log("Couldn't refresh the cart.");
    }
  };

  // ------------------------------------------------

  // useEffect(() => {
  //   console.log("PNP:", pnpProducts);
  // }, [pnpProducts]);

  // useEffect(() => {
  //   console.log("WOOL:", woolworthsProducts);
  // }, [woolworthsProducts]);

  // useEffect(() => {
  //   console.log("CHECKERS:", checkersProducts);
  // }, [checkersProducts]);

  // useEffect(() => {
  //   console.log("SPAR:", sparProducts);
  // }, [sparProducts]);

  return (
    <>
      <NavigationBar />
      <div className="mb-32">
        <Container className="pt-6">
          <div className="flex w-full flex-col md:flex-row md:justify-between">
            <div className="flex flex-row justify-between items-center md:flex-col md:justify-start md:items-start">
              <h2 className="text-4xl lg:text-5xl">Store Planner</h2>
              <p className="px-4 py-3 bg-neutral-100 text-neutral-600 mt-2 font-medium rounded-xl w-fit">
                {userCart.length} Item Types
              </p>
            </div>

            <Stack direction="horizontal" gap={2} className="h-fit mt-4 sm:mt-0">
              <Btn variant="secondary" onClick={() => refreshCart()} className="w-full sm:w-fit">
                Reset
              </Btn>
              <Btn
                variant="dark-outline"
                onClick={() => handleClearCart()}
                className="w-full sm:w-fit"
              >
                Clear All
              </Btn>
            </Stack>
          </div>
        </Container>

        {isLoading ? (
          <div className="w-full flex justify-center items-center mt-20 p-32">
            <Loader color="#C34534" size={20} loading={true} />
          </div>
        ) : (
          <>
            <Container className="mt-16">
              <Row className="flex">
                <Col xs={12} sm={6} lg={3} className="flex flex-col items-center">
                  <StoreCartList
                    store="pnp"
                    products={pnpProducts}
                    onMoveProduct={moveProductToStore}
                    refreshCart={refreshCart}
                    onItemDelete={handleItemDelete}
                  />
                </Col>
                <Col xs={12} sm={6} lg={3} className="flex flex-col items-center mt-24 sm:mt-0">
                  <StoreCartList
                    store="woolworths"
                    products={woolworthsProducts}
                    onMoveProduct={moveProductToStore}
                    refreshCart={refreshCart}
                    onItemDelete={handleItemDelete}
                  />
                </Col>
                <Col
                  xs={12}
                  sm={6}
                  lg={3}
                  className="flex flex-col items-center mt-24 sm:mt-12 lg:mt-0"
                >
                  <StoreCartList
                    store="checkers"
                    products={checkersProducts}
                    onMoveProduct={moveProductToStore}
                    refreshCart={refreshCart}
                    onItemDelete={handleItemDelete}
                  />
                </Col>
                <Col
                  xs={12}
                  sm={6}
                  lg={3}
                  className="flex flex-col items-center mt-24 sm:mt-12 lg:mt-0"
                >
                  <StoreCartList
                    store="spar"
                    products={sparProducts}
                    onMoveProduct={moveProductToStore}
                    refreshCart={refreshCart}
                    onItemDelete={handleItemDelete}
                  />
                </Col>
              </Row>
            </Container>
            <Container className="mt-24">
              <div className="flex flex-col sm:flex-row items-center w-full sm:space-x-8">
                <h3 className="mb-4 sm:mb-0">Total</h3>
                <div className="flex flex-col sm:flex-row sm:space-x-4 w-full">
                  <h3 className="flex justify-center items-center h-16 px-8 bg-neutral-100 rounded-2xl font-semibold w-full sm:w-fit">
                    {`R${totalCost.toFixed(2)}`}
                  </h3>
                  <h4 className="flex justify-center items-center h-16 px-8 bg-primary text-white rounded-2xl font-normal mt-2 sm:mt-0">
                    {`R${totalSavings.toFixed(2)} Saved`}
                  </h4>
                </div>
              </div>
            </Container>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default CartPlannerPage;
