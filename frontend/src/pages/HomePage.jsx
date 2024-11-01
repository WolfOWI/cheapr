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
import Footer from "../components/navigation/Footer";

// -----------------------------------------------------------
function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <NavigationBar />
      {/* Hero Image */}
      <div className="flex items-center justify-center h-[400px] sm:h-[600px] lg:h-[800px] bg-gradient-to-tr from-red-100 to-yellow-50">
        <Container className="flex items-center md:mx-4 lg:mx-24">
          <img src={shoppingBags} alt="shopping bags" className="h-96 hidden lg:block" />
          <div>
            <h1 className="text-5xl sm:text-7xl mb-4">
              Shop like a <span className="text-primary">pro</span>
            </h1>
            <h2 className="text-2xl sm:text-4xl ">The best grocery deals in SA in one place.</h2>
            <Btn className="mt-8 w-full sm:w-fit px-8" onClick={() => navigate("/groceries")}>
              Find Deals
            </Btn>
          </div>
        </Container>
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
                Create a shopping plan and see the best route to maximise your savings every time
                you go out and shop.
              </p>
            </ExplainerBlock>
          </Col>
        </Row>
        <Row className="">
          <Col xs={12} lg={6} className="mb-4">
            <ExplainerBlock iconType={"chart"} heading={"Price Specials"}>
              <p>
                See if products are currently on special, so you know exactly when to buy and when
                to hold off for better savings.
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
        <Row className="mt-16">
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
      <div className="flex items-center justify-center py-16 md:py-8 mt-24 bg-priM1">
        <img
          src={happyShopWoman}
          alt="happy shop woman"
          className="max-h-64 w-auto hidden md:block"
        />
        <div className="ml-8">
          <h2 className="text-white mb-[-16px] text-2xl sm:text-4xl lg:text-5xl">
            Join Us & Start Saving Today
          </h2>
          <Btn className="mt-8" onClick={() => navigate("/signup")}>
            Create An Account
          </Btn>
        </div>
      </div>

      {/* Footer */}
      <Footer type="standard" />
    </>
  );
}

export default HomePage;
