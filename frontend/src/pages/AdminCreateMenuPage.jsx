// IMPORT
// -----------------------------------------------------------
// React & Hooks
import { Navigate, useNavigate } from "react-router-dom";

// Services
// -

// Utility Functions
// -

// Third-Party Components
import { Container, Row, Col, Stack } from "react-bootstrap";

// Internal Components
import NavigationBar from "../components/navigation/NavigationBar";
import Btn from "../components/button/Btn";
import Footer from "../components/navigation/Footer";
import MenuBtn from "../components/button/MenuBtn";

// Imagery
// -

// -----------------------------------------------------------

const AdminCreateMenuPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <NavigationBar admin />
      <div className="mb-32">
        <Container className="pt-6">
          <div className="flex flex-col w-full">
            <h2>Create</h2>
            <Stack direction="horizontal" gap={4} className="mt-8">
              <MenuBtn type="subcategory" />
              <MenuBtn type="type" />
              <MenuBtn type="product" onClick={() => navigate("/createproduct")} />
            </Stack>
          </div>
        </Container>

        {/* Product List Container */}
        <Container className="my-4"></Container>
      </div>
      <Footer />
    </>
  );
};

export default AdminCreateMenuPage;
