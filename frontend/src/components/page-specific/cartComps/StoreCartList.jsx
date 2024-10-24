// IMPORT
// -----------------------------------------------------------
// React & Hooks
import { useEffect, useState } from "react";

// Services
// -

// Utility Functions
import { getCheapestPrice } from "../../../utils/priceUtils";

// Third-Party Components
import { Stack } from "react-bootstrap";

// Internal Components
import StoreLogo from "../../building-blocks/StoreLogo";
import CartItem from "./CartItem";

// Imagery
// -

// -----------------------------------------------------------

const StoreCartList = ({ store, products, onMoveProduct, refreshCart }) => {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    if (products) {
      setCartProducts(products);
    }
  }, [products]);

  // console.log(
  //   "StoreCartList received:",
  //   "Store:",
  //   store,
  //   "Products:",
  //   products,
  //   "onMoveProduct:",
  //   onMoveProduct
  // );

  // useEffect(() => {
  //   console.log("cartProducts in StoreCartList is", cartProducts);
  // }, [cartProducts]);

  return (
    <>
      <StoreLogo store={store} type="colour" className="h-5" />
      <div className="flex items-center justify-center space-x-3 mt-2">
        <p className="text-neutral-500">
          {products.length} Item{products.length !== 1 && "s"}
        </p>
        <p className="text-neutral-500">•</p>
        <p className="text-neutral-500">R123.45</p>
      </div>
      <Stack gap={4} className="mt-8">
        {cartProducts.length > 0 ? (
          cartProducts.map((product, index) => {
            const prices = [
              { store: "pnp", price: product.productInfo.pnp.price },
              { store: "woolworths", price: product.productInfo.woolworths.price },
              { store: "checkers", price: product.productInfo.checkers.price },
              { store: "spar", price: product.productInfo.spar.price },
            ];
            const { cheapestStores } = getCheapestPrice(prices);

            return (
              <CartItem
                key={index}
                product={product}
                quantity={product.quantity}
                store={store}
                cheapestStores={cheapestStores}
                onStoreSelect={onMoveProduct}
                refreshCart={refreshCart}
              />
            );
          })
        ) : (
          <>
            <p className="text-center mt-4">No Cheapest Price Items.</p>
          </>
        )}
      </Stack>
    </>
  );
};

export default StoreCartList;
