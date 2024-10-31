// IMPORT
// -----------------------------------------------------------
// React & Hooks
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

// Services
import {
  getAllFlaggedProducts,
  unflagProductById,
  rejectFlaggedProductById,
} from "../services/productService";

// Utility Functions
// -

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
function AdminFlaggedDash() {
  const navigate = useNavigate();

  const [products, setProducts] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // On Page Mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllFlaggedProducts();
        // console.log("data", data);
        if (data) {
          setProducts(data);
        }
        setIsLoading(false);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchProducts();
  }, []);

  // useEffect(() => {
  //   console.log(products);
  // }, [products]);

  // Handle Product Edit
  const handleProductEdit = (productId) => {
    navigate(`/edit/${productId}`, {
      state: { from: "/flagged" }, // Pass the previous page (flagged dashboard)
    });
  };

  // Handle Product Reject
  const handleProductReject = async (productId) => {
    console.log("Product Reject Click:", productId);
    try {
      await rejectFlaggedProductById(productId);
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

  // Handle Product Re-Approve
  const handleProductReApprove = async (productId) => {
    console.log("ReApprove Click:", productId);
    try {
      await unflagProductById(productId);
      // Remove the super-approved product from the local state
      setProducts((prevProducts) => {
        const updatedProducts = { ...prevProducts };
        delete updatedProducts[productId];
        return updatedProducts;
      });
    } catch (error) {
      console.error("Failed to re-approve product:", error);
    }
  };

  return (
    <>
      <NavigationBar admin />
      <div className="mb-32">
        <Container className="pt-6">
          <div className="flex w-full mb-8">
            <h2>
              {Object.keys(products).length} Flagged Product
              {Object.keys(products).length !== 1 && "s"}
            </h2>
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
                    type="flagging"
                    onEdit={handleProductEdit}
                    onReject={handleProductReject}
                    onReApprove={handleProductReApprove}
                  />
                ))
              ) : (
                <>
                  {/* Empty Message */}
                  <h3 className="text-neutral-600 font-normal mt-10">No Flagged Products.</h3>
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

export default AdminFlaggedDash;
