// IMPORT
// -----------------------------------------------------------
// React & Hooks
import { useState, useEffect } from "react";

// Services
import { getAllPendingProducts } from "../services/productService";

// Utility Functions
import { sortProducts } from "../utils/productSortUtils";

// Third-Party Components
import { Container, Row, Col, Dropdown } from "react-bootstrap";

// Internal Components
import NavigationBar from "../components/navigation/NavigationBar";
import Btn from "../components/button/Btn";
import AdminProductItem from "../components/listItems/AdminProductItem";
import Footer from "../components/navigation/Footer";
import Drpdwn from "../components/input/Drpdwn";

// Imagery
// -

// -----------------------------------------------------------
function AdminNewProductsDash() {
  const [products, setProducts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [sortDropLabel, setSortDropLabel] = useState("Most Recently Created");

  // On Page Mount
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllPendingProducts();
      const sortedData = sortProducts(data, "NewestCreated");
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
        setSortDropLabel("Most Recently Created");
        setProducts(sortProducts(products, "NewestCreated"));
        break;
    }
  };

  // const products = [
  //   {
  //     name: "Top Red Apples",
  //     image: "apple.jpg",
  //     amount: "1.5",
  //     unit: "kg",
  //     pnp: {
  //       price: 36.99,
  //       updated: "19/09/2024",
  //       onSpecial: false,
  //     },
  //     woolworths: {
  //       price: 42.99,
  //       updated: "19/09/2024",
  //       onSpecial: false,
  //     },
  //     checkers: {
  //       price: 40.95,
  //       updated: "19/09/2024",
  //       onSpecial: true,
  //     },
  //     spar: {
  //       price: 38.86,
  //       updated: "19/09/2024",
  //       onSpecial: false,
  //     },
  //   },
  //   {
  //     name: "Juicy Mangos",
  //     image: "mango.jpg",
  //     amount: "2",
  //     unit: "kg",
  //     pnp: {
  //       price: 57.99,
  //       updated: "19/09/2024",
  //       onSpecial: false,
  //     },
  //     woolworths: {
  //       price: 56.99,
  //       updated: "19/09/2024",
  //       onSpecial: false,
  //     },
  //     checkers: {
  //       price: 67.95,
  //       updated: "19/09/2024",
  //       onSpecial: false,
  //     },
  //     spar: {
  //       price: 59.86,
  //       updated: "19/09/2024",
  //       onSpecial: false,
  //     },
  //   },
  // ];

  return (
    <>
      <NavigationBar admin />
      <div className="mb-32">
        <Container className="pt-6">
          <div className="flex w-full justify-between">
            <h2>{Object.keys(products).length} New Products</h2>
            <Drpdwn title={`Sort: ${sortDropLabel}`} variant="dark-outline" onSelect={handleSelect}>
              <Dropdown.Item eventKey="AtoZ">Alfabetical (A to Z)</Dropdown.Item>
              <Dropdown.Item eventKey="ZtoA">Alfabetical (Z to A)</Dropdown.Item>
              <Dropdown.Item eventKey="NewestCreated">Most Recently Created</Dropdown.Item>
              <Dropdown.Item eventKey="OldestCreated">Oldest Creation</Dropdown.Item>
              <Dropdown.Item eventKey="Cheapest">Lowest Price</Dropdown.Item>
              <Dropdown.Item eventKey="Expensive">Highest Price</Dropdown.Item>
            </Drpdwn>
          </div>
        </Container>

        {/* Product List Container */}
        <Container className="my-4">
          {/* Product Rows */}
          {isLoading ? (
            <p>Loading Products</p>
          ) : (
            <>
              {Object.keys(products).map((productId, index) => (
                <AdminProductItem
                  productId={productId}
                  product={products[productId]}
                  key={index}
                  type="approveDeny"
                />
              ))}
            </>
          )}
          {/* {products.map((product, index) => (
            <AdminProductItem product={product} key={index} type="approveDeny" />
          ))} */}
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default AdminNewProductsDash;
