// IMPORT
// -----------------------------------------------------------
// React & Hooks
import { useState, useEffect } from "react";

// Services
import { getAllApprovedProducts } from "../services/productService";

// Utility Functions
// -

// Third-Party Components
import { Container, Row, Col } from "react-bootstrap";

// Internal Components
import NavigationBar from "../components/navigation/NavigationBar";
import Btn from "../components/button/Btn";
import StoreLogo from "../components/building-blocks/StoreLogo";
import ProductItem from "../components/listItems/ProductItem";
import Footer from "../components/navigation/Footer";

// Imagery
// -

// -----------------------------------------------------------

function AdminDash() {
  const [products, setProducts] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllApprovedProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (Object.keys(products).length > 0) {
      setIsLoading(false);
    }
    console.log("products:");
    console.log(products);
  }, [products]);

  return (
    <>
      <NavigationBar admin />
      <div className="mb-32">
        <Container className="pt-6">
          <div className="flex w-full justify-between">
            <h2>All Listed Products</h2>
            <Btn variant="dark-outline">Sort by</Btn>
          </div>
        </Container>
        {/* Header */}
        <div className="bg-neutral-700 py-8 w-100 mt-4">
          <Container>
            <Row>
              <Col xs={3}>
                <h4 className="text-white font-bold">172 Products</h4>
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
            <p>Loading Products</p>
          ) : (
            <>
              {Object.values(products).map((product, index) => (
                <ProductItem key={index} product={product} admin />
              ))}
            </>
          )}
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default AdminDash;
