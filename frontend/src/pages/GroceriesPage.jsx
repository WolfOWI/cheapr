// IMPORT
// -----------------------------------------------------------
// React & Hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Services
import { getAllApprovedProducts } from "../services/productService";

// Utility Functions
import { sortProducts } from "../utils/productSortUtils";

// Third-Party Components
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";

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
  const [products, setProducts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [sortDropLabel, setSortDropLabel] = useState("Most Recent"); // Dropdown Label

  const navigate = useNavigate();

  // On Page Mount
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllApprovedProducts();
      const sortedData = sortProducts(data, "NewestApproved");
      setProducts(sortedData);
    };

    fetchProducts();
  }, []);

  // Loading of products
  useEffect(() => {
    if (Object.keys(products).length > 0) {
      setIsLoading(false);
    }
  }, [products]);

  // Handle sort dropdown select
  const handleSelect = (eventKey) => {
    console.log(`Selected sort option: ${eventKey}`);

    switch (eventKey) {
      case "AtoZ":
        setSortDropLabel("Alfabetical (A to Z)");
        setProducts(sortProducts(products, "AtoZ"));
        break;
      case "ZtoA":
        setSortDropLabel("Alfabetical (Z to A)");
        setProducts(sortProducts(products, "ZtoA"));
        break;
      case "NewestApproved":
        setSortDropLabel("Most Recent");
        setProducts(sortProducts(products, "NewestApproved"));
        break;
      case "OldestApproved":
        setSortDropLabel("Oldest Approval");
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

  return (
    <>
      <NavigationBar />
      <div className="mb-32">
        <Container className="pt-6">
          <Breadcrumb>
            <Breadcrumb.Item href="">Food</Breadcrumb.Item>
            <Breadcrumb.Item href="">Fruit & Vegetables</Breadcrumb.Item>
            <Breadcrumb.Item active>Fresh Fuit</Breadcrumb.Item>
          </Breadcrumb>
          <div className="flex w-full justify-between">
            <h2>All Groceries</h2>
            <Drpdwn title={`Sort: ${sortDropLabel}`} variant="dark-outline" onSelect={handleSelect}>
              <Dropdown.Item eventKey="AtoZ">Alfabetical (A to Z)</Dropdown.Item>
              <Dropdown.Item eventKey="ZtoA">Alfabetical (Z to A)</Dropdown.Item>
              <Dropdown.Item eventKey="NewestApproved">Most Recent</Dropdown.Item>
              <Dropdown.Item eventKey="OldestApproved">Oldest</Dropdown.Item>
              <Dropdown.Item eventKey="Cheapest">Lowest Price</Dropdown.Item>
              <Dropdown.Item eventKey="Expensive">Highest Price</Dropdown.Item>
            </Drpdwn>
          </div>
        </Container>
        {/* Header */}
        <div className="bg-neutral-700 py-8 w-100 mt-4">
          <Container>
            <Row>
              <Col xs={3}>
                <h4 className="text-white font-bold">
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
            <p>Loading Products</p>
          ) : (
            <>
              {Object.keys(products).map((productId, index) => (
                <ProductItem key={index} product={products[productId]} />
              ))}
            </>
          )}
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default GroceriesPage;
