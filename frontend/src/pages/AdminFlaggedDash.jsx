// IMPORT
// -----------------------------------------------------------
// React & Hooks
// -

// Services
// -

// Utility Functions
// -

// Third-Party Components
import { Container, Row, Col } from "react-bootstrap";

// Internal Components
import NavigationBar from "../components/navigation/NavigationBar";
import Btn from "../components/button/Btn";
import StoreLogo from "../components/building-blocks/StoreLogo";
import AdminProductItem from "../components/listItems/AdminProductItem";
import Footer from "../components/navigation/Footer";

// Imagery
// -

// -----------------------------------------------------------
function AdminFlaggedDash() {
  const products = [
    {
      name: "Top Red Apples",
      image: "apple.jpg",
      amount: "1.5",
      unit: "kg",
      pnp: {
        price: 36.99,
        updated: "19/09/2024",
        onSpecial: false,
      },
      woolworths: {
        price: 42.99,
        updated: "19/09/2024",
        onSpecial: false,
      },
      checkers: {
        price: 40.95,
        updated: "19/09/2024",
        onSpecial: true,
      },
      spar: {
        price: 38.86,
        updated: "19/09/2024",
        onSpecial: false,
      },
    },
    {
      name: "Juicy Mangos",
      image: "mango.jpg",
      amount: "2",
      unit: "kg",
      pnp: {
        price: 57.99,
        updated: "19/09/2024",
        onSpecial: false,
      },
      woolworths: {
        price: 56.99,
        updated: "19/09/2024",
        onSpecial: false,
      },
      checkers: {
        price: 67.95,
        updated: "19/09/2024",
        onSpecial: false,
      },
      spar: {
        price: 59.86,
        updated: "19/09/2024",
        onSpecial: false,
      },
    },
  ];

  return (
    <>
      <NavigationBar admin />
      <div className="mb-32">
        <Container className="pt-6">
          <div className="flex w-full justify-between">
            <h2>Flagged Products</h2>
            <Btn variant="dark-outline">Sort by</Btn>
          </div>
        </Container>

        {/* Product List Container */}
        <Container className="my-4">
          {/* Product Rows */}
          {products.map((product, index) => (
            <AdminProductItem product={product} key={index} type="flagging" />
          ))}
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default AdminFlaggedDash;
