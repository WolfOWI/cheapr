// IMPORT
// -----------------------------------------------------------
// React & Hooks
// -

// Services
// -

// Utility Functions
// -

// Third-Party Components
import { Container, Row, Col, Stack } from "react-bootstrap";

// Internal Components
import StoreLogo from "../../building-blocks/StoreLogo";
import CartItem from "./CartItem";

// Imagery
// -

// -----------------------------------------------------------

const StoreCartList = ({ store, products, user }) => {
  return (
    <>
      <StoreLogo store={store} type="colour" className="h-5" />
      <p className="text-neutral-500">{products.length} Items</p>
      <Stack gap={4} className="mt-8">
        {products.map((product) => (
          <CartItem product={product} store={store} />
        ))}
      </Stack>
    </>
  );
};

export default StoreCartList;
