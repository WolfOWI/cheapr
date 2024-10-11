// IMPORT
// -----------------------------------------------------------
// React & Hooks
import { Navigate, useNavigate } from "react-router-dom";

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
import FloatingLabel from "react-bootstrap/FloatingLabel";

// Internal Components
import NavigationBar from "../components/navigation/NavigationBar";
import Btn from "../components/button/Btn";
import ProductItem from "../components/listItems/ProductItem";
import Footer from "../components/navigation/Footer";

// Imagery
// -

// -----------------------------------------------------------

const AdminCreateSubcatPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <NavigationBar admin />
      <Container className="mb-32 mt-6 w-[30%]">
        <div className="">
          <h2 className="text-center">Create Subcategory</h2>
          <p className="text-center">
            Please select which category the new subcategory would fall under.
          </p>
        </div>
        <Form className="mt-8">
          <div>
            <Form.Floating>
              <FloatingLabel controlId="floatingInput" label="Category" className="mb-4">
                <Form.Select aria-label="Floating label select example" className="input-style">
                  <option value="food">Food</option>
                  <option value="drinks">Drinks</option>
                  <option value="household">Household</option>
                </Form.Select>
              </FloatingLabel>
            </Form.Floating>

            <Form.Floating>
              <FloatingLabel
                controlId="floatingInput"
                label="New Subcategory Name"
                className="mb-4"
              >
                <Form.Control type="text" placeholder="" className="input-style" />
              </FloatingLabel>
            </Form.Floating>
            <Stack direction="horizontal" gap={2} className="w-full">
              <Btn variant="secondary" onClick={() => navigate("/create")}>
                Cancel
              </Btn>
              <Btn variant="primary" className="w-full">
                Create
              </Btn>
            </Stack>
          </div>
        </Form>
      </Container>
      <Footer />
    </>
  );
};

export default AdminCreateSubcatPage;
