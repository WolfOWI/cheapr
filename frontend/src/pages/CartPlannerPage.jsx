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
  const products = [
    {
      id: "abc",
      name: "Top Red Apples",
      image: "apple.jpg",
      amount: "1.5",
      unit: "kg",
      pnp: {
        price: 11.11,
        updated: "19/09/2024",
        onSpecial: false,
      },
      woolworths: {
        price: 22.11,
        updated: "19/09/2024",
        onSpecial: false,
      },
      checkers: {
        price: 33.11,
        updated: "19/09/2024",
        onSpecial: true,
      },
      spar: {
        price: 44.11,
        updated: "19/09/2024",
        onSpecial: false,
      },
    },
    {
      id: "def",
      name: "Juicy Mangos",
      image: "mango.jpg",
      amount: "2",
      unit: "kg",
      pnp: {
        price: 11.22,
        updated: "19/09/2024",
        onSpecial: false,
      },
      woolworths: {
        price: 22.22,
        updated: "19/09/2024",
        onSpecial: false,
      },
      checkers: {
        price: 33.22,
        updated: "19/09/2024",
        onSpecial: false,
      },
      spar: {
        price: 44.22,
        updated: "19/09/2024",
        onSpecial: false,
      },
    },
  ];

  const user = {
    firstName: "John",
    lastName: "Doe",
    email: "john@gmail.com",
    password: "1234",
    userType: "customer",
    cart: [
      {
        productId: "abc",
        quantity: 2,
      },
      {
        productId: "def",
        quantity: 6,
      },
    ],
  };

  return (
    <>
      <NavigationBar />
      <div className="mb-32">
        <Container className="pt-6">
          <div className="flex w-full justify-between">
            <div>
              <h2>Shopping Cart Planner</h2>
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
              <StoreCartList store="pnp" products={products} user={user} />
            </Col>
            <Col xs={3} className="flex flex-col items-center">
              <StoreCartList store="woolworths" products={products} user={user} />
            </Col>
            <Col xs={3} className="flex flex-col items-center">
              <StoreCartList store="checkers" products={products} user={user} />
            </Col>
            <Col xs={3} className="flex flex-col items-center">
              <StoreCartList store="spar" products={products} user={user} />
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default CartPlannerPage;
