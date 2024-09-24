// IMPORT
// -----------------------------------------------------------
// React & Hooks
import { useNavigate } from "react-router-dom";

// Services
// -

// Utility Functions
// -

// Third-Party Components
import { Stack, Col, Row, Container } from "react-bootstrap";

// Internal Components
import Btn from "../components/button/Btn";
import NavigationBar from "../components/navigation/NavigationBar";
import ExplainerBlock from "../components/page-specific/homeComps/ExplainerBlock";
import StoreLogo from "../components/building-blocks/StoreLogo";

// Imagery
import shoppingBags from "../assets/images/shoppingBags.png";
import logoBlocked from "../assets/logos/logo _blocked.svg";
import happyShopWoman from "../assets/images/happyShopWoman.png";

// -----------------------------------------------------------
function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <NavigationBar />
      {/* Hero Image */}
      <div className="flex items-center justify-center h-[95vh] bg-gradient-to-tr from-red-100 to-yellow-50">
        <div className="flex items-center pb-24 mx-24">
          <img src={shoppingBags} alt="shopping bags" className="h-96" />
          <div>
            <h1>
              Shop like a <span className="text-primary">pro</span>
            </h1>
            <h2>The best grocery deals in SA in one place.</h2>
            <Btn className="mt-8" onClick={() => navigate("/groceries")}>
              Find Deals
            </Btn>
          </div>
        </div>
      </div>
      {/* Why Cheaper? Section */}
      <Container className="my-24">
        <Row>
          <Stack direction="horizontal" gap={2}>
            <h2>Why</h2>
            <img src={logoBlocked} alt="cheapo" className="h-12" />
            <h2>?</h2>
          </Stack>
        </Row>
        <Row className="mt-5">
          <Col xs={12} lg={6} className="mb-4">
            <ExplainerBlock iconType={"carry"} heading={"Crowd-driven Deals"}>
              <p>
                Our community of users helps you find the best deals by updating product prices, so
                you never miss out.
              </p>
            </ExplainerBlock>
          </Col>
          <Col xs={12} lg={6} className="mb-4">
            <ExplainerBlock iconType={"piggy"} heading={"Save Time & Money"}>
              <p>
                Create a shopping plan, compare prices, and see the best route to maximise your
                savings every time you shop.
              </p>
            </ExplainerBlock>
          </Col>
        </Row>
        <Row className="">
          <Col xs={12} lg={6} className="mb-4">
            <ExplainerBlock iconType={"chart"} heading={"Historical Prices"}>
              <p>
                Track prices over time, so you know exactly when to buy and when to hold off for
                better savings.
              </p>
            </ExplainerBlock>
          </Col>
          <Col xs={12} lg={6} className="mb-4">
            <ExplainerBlock iconType={"braai"} heading={"Local is Lekker"}>
              <p>
                Our platform is proudly South African, and we love supporting local businesses since
                2004.
              </p>
            </ExplainerBlock>
          </Col>
        </Row>
      </Container>

      {/* Our Store Partners */}
      <Container className="my-24">
        <Row>
          <h2>Our Store Partners</h2>
        </Row>
        <Row className="mt-8">
          <Col className="flex items-center justify-center">
            <StoreLogo store="pnp" type="grey" className="h-8 w-auto" />
          </Col>
          <Col className="flex items-center justify-center">
            <StoreLogo store="woolworths" type="grey" className="h-8 w-auto" />
          </Col>
          <Col className="flex items-center justify-center">
            <StoreLogo store="spar" type="grey" className="h-8 w-auto" />
          </Col>
          <Col className="flex items-center justify-center">
            <StoreLogo store="checkers" type="grey" className="h-8 w-auto" />
          </Col>
        </Row>
      </Container>

      {/* Call To Action */}
      <div className="flex items-center justify-center py-8 my-24 bg-priM1">
        <img src={happyShopWoman} alt="happy shop woman" className="max-h-64 w-auto" />
        <div className="ml-8">
          <h2 className="text-white mb-[-16px]">Join Us & Start Saving Today</h2>
          <Btn className="mt-8" onClick={() => navigate("/groceries")}>
            Create An Account
          </Btn>
        </div>
      </div>
    </>
  );
}

export default HomePage;
