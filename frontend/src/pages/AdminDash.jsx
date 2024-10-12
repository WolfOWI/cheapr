// IMPORT
// -----------------------------------------------------------
// React & Hooks
import { useState, useEffect } from "react";

// Services
import { getAllApprovedProducts } from "../services/productService";

// Utility Functions
import { sortProducts } from "../utils/productSortUtils";

// Third-Party Components
import { Container, Row, Col, Dropdown } from "react-bootstrap";

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

function AdminDash() {
  const [products, setProducts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [sortSelection, setSortSelection] = useState("Newest Approved"); // Dropdown Selection
  const [sortDropLabel, setSortDropLabel] = useState("Most Recently Approved"); // Dropdown Label

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
    setSortSelection(eventKey);
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
        setSortDropLabel("Most Recently Approved");
        setProducts(sortProducts(products, "NewestApproved"));
        break;
      case "OldestApproved":
        setSortDropLabel("Oldest Approval");
        setProducts(sortProducts(products, "OldestApproved"));
        break;
      case "NewestCreated":
        setSortDropLabel("Most Recently Created");
        setProducts(sortProducts(products, "NewestCreated"));
        break;
      case "OldestCreated":
        setSortDropLabel("Oldest Creation");
        setProducts(sortProducts(products, "OldestCreated"));
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
        break;
    }
  };

  return (
    <>
      <NavigationBar admin />
      <div className="mb-32">
        <Container className="pt-6">
          <div className="flex w-full justify-between">
            <h2>All Listed Products</h2>
            <Drpdwn title={`Sort: ${sortDropLabel}`} variant="dark-outline" onSelect={handleSelect}>
              <Dropdown.Item eventKey="AtoZ">Alfabetical (A to Z)</Dropdown.Item>
              <Dropdown.Item eventKey="ZtoA">Alfabetical (Z to A)</Dropdown.Item>
              <Dropdown.Item eventKey="NewestApproved">Most Recently Approved</Dropdown.Item>
              <Dropdown.Item eventKey="OldestApproved">Oldest Approval</Dropdown.Item>
              <Dropdown.Item eventKey="NewestCreated">Most Recently Created</Dropdown.Item>
              <Dropdown.Item eventKey="OldestCreated">Oldest Creation</Dropdown.Item>
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
