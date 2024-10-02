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
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

// Internal Components
import NavigationBar from "../components/navigation/NavigationBar";
import Btn from "../components/button/Btn";
import StoreLogo from "../components/building-blocks/StoreLogo";
import IconBtn from "../components/button/IconBtn";
import MiniStorePriceBlock from "../components/building-blocks/MiniStorePriceBlock";
import Footer from "../components/navigation/Footer";

// Imagery
import tempImg from "../assets/images/grocery-images/Apples_TopRed.png";

// -----------------------------------------------------------
function ProductPage() {
  return (
    <>
      <NavigationBar />
      <Container className="pt-6 mb-32">
        <Breadcrumb>
          <Breadcrumb.Item href="">Food</Breadcrumb.Item>
          <Breadcrumb.Item href="">Fruit & Vegetables</Breadcrumb.Item>
          <Breadcrumb.Item href="">Fresh Fruit</Breadcrumb.Item>
          <Breadcrumb.Item active>Top Red Apples</Breadcrumb.Item>
        </Breadcrumb>
        {/* Product Content */}
        <div className="flex w-full pt-4">
          {/* Image */}
          <img src={tempImg} alt="img" className="w-[400px]" />
          {/* Text Details */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Title */}
              <div className="flex">
                <h2 className="mr-3">Top Red Apples</h2>
                <h2 className="text-gray-400">1.5kg</h2>
              </div>
              {/* Price */}
              <div className="flex mt-8">
                <div>
                  <StoreLogo store="pnp" className="h-8" />
                  <h1 className="mb-[-8px]">R36.99</h1>
                  <small>Last Updated 15/09/2023</small>
                  <div className="py-2 px-4 bg-neutral-100 w-fit rounded-xl mt-2">
                    <p className="font-bold">Save R6.00</p>
                  </div>
                </div>
                <div className="ml-10 mt-6">
                  <p className="font-bold">Other Stores</p>
                  <Stack direction="horizontal" gap={5} className="mt-2">
                    <MiniStorePriceBlock store="checkers" price="39.99" updated="15/09/2023" />
                    <MiniStorePriceBlock store="spar" price="41.99" updated="15/09/2023" />
                    <MiniStorePriceBlock store="woolworths" price="46.99" updated="15/09/2023" />
                  </Stack>
                </div>
              </div>
            </div>
            {/* Buttons */}
            <Stack direction="horizontal" gap={3} className="mb-8">
              <InputGroup className="bg-neutral-100 w-fit rounded-xl">
                <IconBtn variant="tertiary" iconType="minus" />
                <Form.Control
                  type="number"
                  className="bg-transparent border-none text-center fw-bold p-0 no-arrows w-8"
                />
                <IconBtn variant="tertiary" iconType="add" />
              </InputGroup>
              <Btn>Add to Cart</Btn>
              <Btn variant="secondary">Update Price(s)</Btn>
              <IconBtn variant="dark" iconType="flag" />
            </Stack>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default ProductPage;
