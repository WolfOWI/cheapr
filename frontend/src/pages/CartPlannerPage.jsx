// IMPORT
// -----------------------------------------------------------
// React & Hooks
import { useState, useEffect } from "react";

// Services
import { getUserCart, addToCart, removeFromCart } from "../services/userService";
import { getProductById } from "../services/productService";

// Utility Functions
import { getCheapestPrice } from "../utils/priceUtils";

// Third-Party Components
import { Container, Row, Col, Stack } from "react-bootstrap";

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
  const [userCart, setUserCart] = useState([]);
  const [allCartProducts, setAllCartProducts] = useState([]);

  // Store Product States
  const [pnpProducts, setPnpProducts] = useState([]);
  const [woolworthsProducts, setWoolworthsProducts] = useState([]);
  const [checkersProducts, setCheckersProducts] = useState([]);
  const [sparProducts, setSparProducts] = useState([]);

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
        }
      } catch (error) {
        console.log("Couldn't fetch product details for the cart.", error);
      }
    };

    // Only call this effect if userCart has items
    if (userCart.length > 0) {
      fetchCartProductDetails();
    }
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

  // Jump product between stores (dropdown btn)
  const moveProductToStore = (targetStore, product) => {
    console.log("targetStore:", targetStore);
    console.log("product:", product);

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

  useEffect(() => {
    console.log("PNP:", pnpProducts);
  }, [pnpProducts]);

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
          <div className="flex w-full justify-between">
            <div>
              <h2>Shop Planner</h2>
              <h4 className="text-neutral-600 mt-2">15 Grocery Items</h4>
            </div>
            <Stack direction="horizontal" gap={2}>
              <Btn variant="secondary">Reset</Btn>
              <Btn variant="dark-outline">Clear All</Btn>
            </Stack>
          </div>
        </Container>
        <Container className="mt-16">
          <Row>
            <Col xs={3} className="flex flex-col items-center">
              <StoreCartList
                store="pnp"
                products={pnpProducts}
                onMoveProduct={moveProductToStore}
              />
            </Col>
            <Col xs={3} className="flex flex-col items-center">
              <StoreCartList
                store="woolworths"
                products={woolworthsProducts}
                onMoveProduct={moveProductToStore}
              />
            </Col>
            <Col xs={3} className="flex flex-col items-center">
              <StoreCartList
                store="checkers"
                products={checkersProducts}
                onMoveProduct={moveProductToStore}
              />
            </Col>
            <Col xs={3} className="flex flex-col items-center">
              <StoreCartList
                store="spar"
                products={sparProducts}
                onMoveProduct={moveProductToStore}
              />
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default CartPlannerPage;
