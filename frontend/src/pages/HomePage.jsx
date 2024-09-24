// IMPORT
// -----------------------------------------------------------
// React & Hooks
import { useNavigate } from "react-router-dom";

// Services
// -

// Utility Functions
// -

// Third-Party Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Internal Components
import Btn from "../components/button/Btn";
import NavigationBar from "../components/navigation/NavigationBar";

// Imagery
import shoppingBags from "../assets/images/shoppingBags.png";

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
      <div>
        div
        {/* <Button className="h-14 px-6 bg-transparent text-primary font-bold border-primary border-2 rounded-xl ">
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
        <Btn circular size="md" icon={<i className="fa fa-user" />} /> */}
      </div>
    </>
  );
}

export default HomePage;
