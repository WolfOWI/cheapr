// IMPORT
// -----------------------------------------------------------
// React & Hooks
import { useState, useEffect } from "react";

// Services
import {
  getAllPendingProducts,
  approveProductById,
  rejectProductById,
} from "../services/productService";

// Utility Functions
import { sortProducts } from "../utils/productSortUtils";

// Third-Party Components
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import Loader from "react-spinners/GridLoader";

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
      try {
        const data = await getAllPendingProducts();
        console.log("data", data);
        if (data) {
          const sortedData = sortProducts(data, "NewestCreated");
          setProducts(sortedData);
        }
        setIsLoading(false);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    console.log(products);
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

  // Handle Product Reject
  const handleProductReject = async (productId) => {
    console.log("Product Reject Click:", productId);
    try {
      await rejectProductById(productId);
      // Remove the rejected product from the local state
      setProducts((prevProducts) => {
        const updatedProducts = { ...prevProducts };
        delete updatedProducts[productId];
        return updatedProducts;
      });
    } catch (error) {
      console.error("Failed to reject the product:", error);
    }
  };

  // Handle Product Approve
  const handleProductApprove = async (productId) => {
    console.log("Approve Click:", productId);
    try {
      await approveProductById(productId);
      // Remove the approved product from the local state
      setProducts((prevProducts) => {
        const updatedProducts = { ...prevProducts };
        delete updatedProducts[productId];
        return updatedProducts;
      });
    } catch (error) {
      console.error("Failed to approve product:", error);
    }
  };

  return (
    <>
      <NavigationBar admin />
      <div className="mb-32">
        <Container className="pt-6">
          <div className="flex w-full justify-between">
            <h2>
              {Object.keys(products).length} New Product{Object.keys(products).length !== 1 && "s"}
            </h2>
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
            <div className="w-full flex justify-center items-center mt-20 p-16">
              <Loader color="#C34534" loading={true} />
            </div>
          ) : (
            <>
              {Object.keys(products).length > 0 ? (
                Object.keys(products).map((productId, index) => (
                  <AdminProductItem
                    productId={productId}
                    product={products[productId]}
                    key={index}
                    type="approveDeny"
                    onReject={handleProductReject}
                    onApprove={handleProductApprove}
                  />
                ))
              ) : (
                <>
                  {/* Empty Message */}
                  <h3 className="text-neutral-600 font-normal mt-10">No Pending Products.</h3>
                </>
              )}
            </>
          )}
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default AdminNewProductsDash;
