// IMPORT
// -----------------------------------------------------------
// React & Hooks
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Services
import { createSubcategory } from "../services/subcategoryService";

// Utility Functions
// -

// Third-Party Components
import { Container, Form, Stack, FloatingLabel } from "react-bootstrap";

// Internal Components
import NavigationBar from "../components/navigation/NavigationBar";
import Btn from "../components/button/Btn";
import Footer from "../components/navigation/Footer";

// Imagery
// -

// -----------------------------------------------------------

const AdminCreateSubcatPage = () => {
  const navigate = useNavigate();

  // State to track the form inputs
  const [categoryId, setCategoryId] = useState("10000"); // Default is "Food"
  const [subcategoryName, setSubcategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle form submission
  const handleCreateSubcategory = async () => {
    if (!subcategoryName) {
      setError("Please provide a subcategory name.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await createSubcategory(categoryId, subcategoryName);
      console.log("Subcategory created:", response);
      navigate("/create");
    } catch (err) {
      console.error("Failed to create subcategory:", err);
      setError("Failed to create subcategory. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
                <Form.Select
                  aria-label="Floating label select example"
                  className="input-style"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)} // Update categoryId on selection
                >
                  <option value="10000">Food</option>
                  <option value="20000">Drinks</option>
                  <option value="30000">Household</option>
                </Form.Select>
              </FloatingLabel>
            </Form.Floating>

            <Form.Floating>
              <FloatingLabel
                controlId="floatingInput"
                label="New Subcategory Name"
                className="mb-4"
              >
                <Form.Control
                  type="text"
                  placeholder="Enter Subcategory"
                  className="input-style"
                  value={subcategoryName}
                  onChange={(e) => setSubcategoryName(e.target.value)} // Update subcategoryName on input
                />
              </FloatingLabel>
            </Form.Floating>

            <Stack direction="horizontal" gap={2} className="w-full">
              <Btn variant="secondary" onClick={() => navigate("/create")}>
                Cancel
              </Btn>
              <Btn
                variant="primary"
                className="w-full"
                onClick={handleCreateSubcategory}
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create"}
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
