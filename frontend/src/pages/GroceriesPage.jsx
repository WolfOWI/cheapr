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
import Breadcrumb from "react-bootstrap/Breadcrumb";

// Internal Components
import NavigationBar from "../components/navigation/NavigationBar";
import Btn from "../components/button/Btn";
import StoreLogo from "../components/building-blocks/StoreLogo";
import ProductItem from "../components/listItems/ProductItem";

// Imagery
// -

// -----------------------------------------------------------
function GroceriesPage() {
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
      <NavigationBar />
      <Container className="pt-6">
        <Breadcrumb>
          <Breadcrumb.Item href="">Food</Breadcrumb.Item>
          <Breadcrumb.Item href="">Fruit & Vegetables</Breadcrumb.Item>
          <Breadcrumb.Item active>Fresh Fuit</Breadcrumb.Item>
        </Breadcrumb>
        <div className="flex w-full justify-between">
          <h2>Fresh Fruit</h2>
          <Btn variant="dark-outline">Sort by</Btn>
        </div>
      </Container>
      <>
        {/* Header */}
        <div className="bg-neutral-700 py-8 w-100 mt-4">
          <Container>
            <Row>
              <Col xs={3}>
                <h4 className="text-white font-bold">5 Products</h4>
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
          {products.map((product, index) => (
            <ProductItem product={product} key={index} />
          ))}
        </Container>
      </>
    </>
  );
}

export default GroceriesPage;
