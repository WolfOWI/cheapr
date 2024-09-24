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

// Imagery
import shoppingBags from "../assets/images/shoppingBags.png";
import logoBlocked from "../assets/logos/logo _blocked.svg";
import braaiIcon from "../assets/icons/braai.svg";
import chartIcon from "../assets/icons/chart.svg";
import carryIcon from "../assets/icons/people_carry.svg";
import piggyIcon from "../assets/icons/piggy_bank.svg";

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
      <Container className="my-24">
        <Row>
          <Stack direction="horizontal" gap={2}>
            <h2>Why</h2>
            <img src={logoBlocked} alt="cheapo" className="h-10" />
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

      {/* Page Content */}
      {/* <div>
        <Button className="h-14 px-6 bg-transparent text-primary font-bold border-primary border-2 rounded-xl ">
          Testing
        </Button>
        <Btn variant="primary">Primary</Btn>
        <Btn variant="secondary">Secondary</Btn>
        <Btn variant="primary" size="lg">
          Primary Lrg
        </Btn>
        <Btn variant="secondary" size="lg">
          Secondary Lrg
        </Btn>
        <Btn circular size="sm" icon={<i className="fa fa-user" />} />
        <Btn circular size="md" icon={<i className="fa fa-user" />} />
      </div> */}
    </>
  );
}

export default HomePage;
