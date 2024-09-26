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
import Stack from "react-bootstrap/Stack";

// Internal Components
import NavigationBar from "../components/navigation/NavigationBar";
import Btn from "../components/button/Btn";
import StoreLogo from "../components/building-blocks/StoreLogo";
import IconBtn from "../components/button/IconBtn";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

// Imagery
import tempImg from "../assets/images/grocery-images/Apples_TopRed.png";

// -----------------------------------------------------------
function ProductPage() {
  return (
    <>
      <NavigationBar />
      <Container className="pt-6">
        <Breadcrumb>
          <Breadcrumb.Item href="">Food</Breadcrumb.Item>
          <Breadcrumb.Item href="">Fruit & Vegetables</Breadcrumb.Item>
          <Breadcrumb.Item active>Fresh Fuit</Breadcrumb.Item>
        </Breadcrumb>
        {/* Product Content */}
        <div className="flex w-full">
          {/* Image */}
          <img src={tempImg} alt="img" className="w-3/12" />
          {/* Text Details */}
          <div className="flex flex-col justify-between">
            {/* Title */}
            <div className="flex">
              <h2 className="mr-3">Top Red Apples</h2>
              <h2 className="text-gray-400">1.5kg</h2>
            </div>
            {/* Price */}
            <div>
              <div>
                <StoreLogo store="pnp" className="h-8" />
                <h1 className="mb-[-8px]">R36.99</h1>
                <small>Last Updated 15/09/2023</small>
                <div className="py-2 px-4 bg-neutral-100 w-fit rounded-xl mt-2">
                  <p className="font-bold">Save R6.00</p>
                </div>
              </div>
            </div>
            {/* Buttons */}
            <Stack direction="horizontal" gap={2}>
              <Btn>Add to Cart</Btn>
              <Btn variant="secondary">Update Price(s)</Btn>
              <IconBtn variant="dark" iconType="flag" />
            </Stack>
          </div>
        </div>
      </Container>
    </>
  );
}

export default ProductPage;
