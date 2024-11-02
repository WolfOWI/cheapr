// IMPORT
// -----------------------------------------------------------
// React & Hooks
import { useNavigate } from "react-router-dom";

// Services
// -

// Utility Functions
// -

// Third-Party Components
import { Container, Stack } from "react-bootstrap";

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
            <h2 className="text-4xl lg:text-5xl">Create New</h2>
            <div className="mt-8 flex flex-col lg:flex-row space-x-0 lg:space-x-4 space-y-4 lg:space-y-0">
              <MenuBtn
                type="subcategory"
                onClick={() => navigate("/createsubcat")}
                className="min-w-fit"
              />
              <MenuBtn type="type" onClick={() => navigate("/createptype")} className="min-w-fit" />
              <MenuBtn
                type="product"
                onClick={() => navigate("/createproduct")}
                className="min-w-fit"
              />
            </div>
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
