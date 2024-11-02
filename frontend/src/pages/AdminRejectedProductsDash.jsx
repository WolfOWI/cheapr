// IMPORT
// -----------------------------------------------------------
// React & Hooks
import { useState, useEffect } from "react";

// Services
import {
  getAllRejectedProducts,
  deleteProductById,
  superApproveProductById,
} from "../services/productService";

// Utility Functions
import { sortProducts } from "../utils/productSortUtils";

// Third-Party Components
import { Container } from "react-bootstrap";
import Loader from "react-spinners/GridLoader";

// Internal Components
import NavigationBar from "../components/navigation/NavigationBar";
import AdminProductItem from "../components/listItems/AdminProductItem";
import Footer from "../components/navigation/Footer";

// Imagery
// -

// -----------------------------------------------------------
function AdminRejectedProductsDash() {
  const [products, setProducts] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // On Page Mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllRejectedProducts();
        // console.log("data", data);
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

  // useEffect(() => {
  //   console.log(products);
  // }, [products]);

  // Handle Product Delete
  const handleProductDelete = async (productId) => {
    console.log("Product Delete Click:", productId);
    try {
      await deleteProductById(productId);
      // Remove the rejected product from the local state
      setProducts((prevProducts) => {
        const updatedProducts = { ...prevProducts };
        delete updatedProducts[productId];
        return updatedProducts;
      });
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  // Handle Product Approve
  const handleProductApprove = async (productId) => {
    console.log("Approve Click:", productId);
    try {
      await superApproveProductById(productId);
      // Remove the super-approved product from the local state
      setProducts((prevProducts) => {
        const updatedProducts = { ...prevProducts };
        delete updatedProducts[productId];
        return updatedProducts;
      });
    } catch (error) {
      console.error("Failed to super-approve product:", error);
    }
  };

  return (
    <>
      <NavigationBar admin />
      <div className="mb-32">
        <Container className="pt-6">
          <div className="flex w-full mb-8">
            <h2 className="text-4xl lg:text-5xl mb-4 md:mb-0">
              {Object.keys(products).length} Rejected Product
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
                    type="approveDelete"
                    onDelete={handleProductDelete}
                    onApprove={handleProductApprove}
                  />
                ))
              ) : (
                <>
                  {/* Empty Message */}
                  <h3 className="text-neutral-600 font-normal mt-10">No Rejected Products.</h3>
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

export default AdminRejectedProductsDash;
