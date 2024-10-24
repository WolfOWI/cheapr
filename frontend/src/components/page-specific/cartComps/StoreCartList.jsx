// IMPORT
// -----------------------------------------------------------
// React & Hooks
// -

// Services
// -

// Utility Functions
import { getCheapestPrice } from "../../../utils/priceUtils";

// Third-Party Components
import { Container, Row, Col, Stack } from "react-bootstrap";

// Internal Components
import StoreLogo from "../../building-blocks/StoreLogo";
import CartItem from "./CartItem";

// Imagery
// -

// -----------------------------------------------------------

const StoreCartList = ({ store, products }) => {
  return (
    <>
      <StoreLogo store={store} type="colour" className="h-5" />
      <p className="text-neutral-500">{products.length} Items</p>
      <Stack gap={4} className="mt-8">
        {products.map((product, index) => {
          // Determine the stores that have the same cheapest price
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
              product={product.productInfo}
              quantity={product.quantity}
              store={store}
              cheapestStores={cheapestStores} // Pass cheapest stores to CartItem
            />
          );
        })}
      </Stack>
    </>
  );
};

export default StoreCartList;
