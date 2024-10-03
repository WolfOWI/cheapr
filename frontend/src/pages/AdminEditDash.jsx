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
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";

// Internal Components
import NavigationBar from "../components/navigation/NavigationBar";
import Btn from "../components/button/Btn";
import StoreLogo from "../components/building-blocks/StoreLogo";
import Footer from "../components/navigation/Footer";

// Imagery
// -

// -----------------------------------------------------------
function AdminEditDash() {
  return (
    <>
      <NavigationBar />
      <Container className="mb-32">
        <div className="flex w-full justify-between pt-6">
          <h2>Edit Product</h2>
          <Stack direction="horizontal" gap={2}>
            <Btn variant="secondary">Cancel</Btn>
            <Btn variant="primary">Save Changes</Btn>
          </Stack>
        </div>
        <div>
          <Form>
            <div className="flex">
              <div className="w-full p-8">
                <Form.Floating>
                  <FloatingLabel controlId="floatingInput" label="Product Name" className="mb-4">
                    <Form.Control type="text" placeholder="" className="input-style" />
                  </FloatingLabel>
                </Form.Floating>
                <Form.Floating>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Measurement Amount"
                    className="mb-4"
                  >
                    <Form.Control type="number" placeholder="" className="input-style" />
                  </FloatingLabel>
                </Form.Floating>
                <Form.Floating>
                  <FloatingLabel controlId="floatingInput" label="Unit" className="mb-4">
                    <Form.Select aria-label="Floating label select example" className="input-style">
                      <option value="mg">Miligrams</option>
                      <option value="g">Grams</option>
                      <option value="kg">Kilograms</option>
                      <option value="ml">Milliliters</option>
                      <option value="l">Liters</option>
                      <option value="pcs">Piece(s)</option>
                      <option value="pk">Pack(s)</option>
                    </Form.Select>
                  </FloatingLabel>
                </Form.Floating>
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
                  <FloatingLabel controlId="floatingInput" label="Subcategory" className="mb-4">
                    <Form.Select aria-label="Floating label select example" className="input-style">
                      {/* TODO Dynamically Populate from breadcrumbs */}
                      <option value="fruit&vegetables">Fruit & Vegetables</option>
                      <option value="meat,poultry&fish">Meat, Poultry & Fish</option>
                    </Form.Select>
                  </FloatingLabel>
                </Form.Floating>
                <Form.Floating>
                  <FloatingLabel controlId="floatingInput" label="Type" className="mb-4">
                    <Form.Select aria-label="Floating label select example" className="input-style">
                      {/* TODO Dynamically Populate from breadcrumbs */}
                      <option value="freshFruit">Fresh Fruit</option>
                      <option value="freshVegetables">Fresh Vegetables</option>
                      <option value="frozenVegetables">Frozen Vegetables</option>
                    </Form.Select>
                  </FloatingLabel>
                </Form.Floating>
                <div className="bg-neutral-100 rounded-xl h-32 flex items-center justify-center">
                  Image Upload (To Do)
                </div>
              </div>

              <div className="w-full p-8">
                {/* TODO Transform into components */}
                {/* Pick n Pay Section */}
                <div className="mb-16">
                  <Form.Label>
                    <div className="flex items-center">
                      <StoreLogo store="pnp" className="h-4" />
                      <p className="ml-2">Price</p>
                    </div>
                  </Form.Label>
                  <InputGroup className="mb-2 h-[58px]">
                    <InputGroup.Text className="input-style h-[58px]">
                      <p className="font-bold">R</p>
                    </InputGroup.Text>
                    <Form.Control type="number" className="input-style h-[58px]" />
                  </InputGroup>
                  <Form.Group className="mb-2" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="On Special" />
                  </Form.Group>
                  <Form.Floating>
                    <FloatingLabel controlId="floatingInput" label="Until" className="mb-4">
                      <Form.Control type="date" placeholder="" className="input-style" />
                    </FloatingLabel>
                  </Form.Floating>
                </div>
                {/* Checkers Section */}
                <div className="mb-16">
                  <Form.Label>
                    <div className="flex items-center">
                      <StoreLogo store="checkers" className="h-4" />
                      <p className="ml-2">Price</p>
                    </div>
                  </Form.Label>
                  <InputGroup className="mb-2 h-[58px]">
                    <InputGroup.Text className="input-style h-[58px]">
                      <p className="font-bold">R</p>
                    </InputGroup.Text>
                    <Form.Control type="number" className="input-style h-[58px]" />
                  </InputGroup>
                  <Form.Group className="mb-2" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="On Special" />
                  </Form.Group>
                  <Form.Floating>
                    <FloatingLabel controlId="floatingInput" label="Until" className="mb-4">
                      <Form.Control type="date" placeholder="" className="input-style" />
                    </FloatingLabel>
                  </Form.Floating>
                </div>
              </div>

              <div className="w-full p-8">
                {/* Spar Section */}
                <div className="mb-16">
                  <Form.Label>
                    <div className="flex items-center">
                      <StoreLogo store="spar" className="h-4" />
                      <p className="ml-2">Price</p>
                    </div>
                  </Form.Label>
                  <InputGroup className="mb-2 h-[58px]">
                    <InputGroup.Text className="input-style h-[58px]">
                      <p className="font-bold">R</p>
                    </InputGroup.Text>
                    <Form.Control type="number" className="input-style h-[58px]" />
                  </InputGroup>
                  <Form.Group className="mb-2" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="On Special" />
                  </Form.Group>
                  <Form.Floating>
                    <FloatingLabel controlId="floatingInput" label="Until" className="mb-4">
                      <Form.Control type="date" placeholder="" className="input-style" />
                    </FloatingLabel>
                  </Form.Floating>
                </div>
                {/* Woolworths Section */}
                <div className="mb-16">
                  <Form.Label>
                    <div className="flex items-center">
                      <StoreLogo store="woolworths" className="h-4" />
                      <p className="ml-2">Price</p>
                    </div>
                  </Form.Label>
                  <InputGroup className="mb-2 h-[58px]">
                    <InputGroup.Text className="input-style h-[58px]">
                      <p className="font-bold">R</p>
                    </InputGroup.Text>
                    <Form.Control type="number" className="input-style h-[58px]" />
                  </InputGroup>
                  <Form.Group className="mb-2" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="On Special" />
                  </Form.Group>
                  <Form.Floating>
                    <FloatingLabel controlId="floatingInput" label="Until" className="mb-4">
                      <Form.Control type="date" placeholder="" className="input-style" />
                    </FloatingLabel>
                  </Form.Floating>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default AdminEditDash;
