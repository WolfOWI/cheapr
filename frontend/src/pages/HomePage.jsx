// IMPORT
// -----------------------------------------------------------
// React & Hooks
// -

// Services
// -

// Utility Functions
// -

// Third-Party Components
// -

// Internal Components
import { Button } from "react-bootstrap";
import Btn from "../components/button/Btn";
import NavigationBar from "../components/navigation/NavigationBar";

// Imagery
// -

// -----------------------------------------------------------
function HomePage() {
  return (
    <>
      <NavigationBar />
      <div>
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
      </div>
      <div className="text-green-200">Home Page</div>
    </>
  );
}

export default HomePage;
