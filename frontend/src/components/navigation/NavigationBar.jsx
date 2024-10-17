// IMPORT
// -----------------------------------------------------------
// React & Hooks
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Services
import { getSubcategoriesByCategory } from "../../services/subcategoryService";
import { getProductTypeBySubcategory } from "../../services/productTypeService";

// Utility Functions
// -

// Third-Party Components
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Stack } from "react-bootstrap";

// Internal Components
import Btn from "../button/Btn";
import IconBtn from "../button/IconBtn";

// Imagery
import logoColor from "../../assets/logos/logo_color.svg";
// -----------------------------------------------------------

function NavigationBar({ admin }) {
  const navigate = useNavigate();

  // State for each category's subcategories and product types
  const [foodSubcategories, setFoodSubcategories] = useState([]);
  const [drinksSubcategories, setDrinksSubcategories] = useState([]);
  const [householdSubcategories, setHouseholdSubcategories] = useState([]);

  const [foodProductTypes, setFoodProductTypes] = useState({});
  const [drinksProductTypes, setDrinksProductTypes] = useState({});
  const [householdProductTypes, setHouseholdProductTypes] = useState({});

  // Function to fetch subcategories and product types for a category
  const fetchSubcategoriesAndTypes = async (categoryId, setSubcategories, setProductTypes) => {
    try {
      const subcategories = await getSubcategoriesByCategory(categoryId);
      setSubcategories(Object.entries(subcategories));
      const allProductTypes = {};
      for (const [subcatId] of Object.entries(subcategories)) {
        const productTypes = await getProductTypeBySubcategory(categoryId, subcatId);
        allProductTypes[subcatId] = Object.entries(productTypes);
      }
      setProductTypes(allProductTypes);
    } catch (error) {
      console.error(`Failed to fetch data for category ${categoryId}:`, error);
    }
  };

  // Fetch data for each category on component mount
  useEffect(() => {
    fetchSubcategoriesAndTypes("10000", setFoodSubcategories, setFoodProductTypes);
    fetchSubcategoriesAndTypes("20000", setDrinksSubcategories, setDrinksProductTypes);
    fetchSubcategoriesAndTypes("30000", setHouseholdSubcategories, setHouseholdProductTypes);
  }, []);

  // Helper function to render dropdown for a given category
  const renderCategoryDropdown = (title, subcategories, productTypes) => (
    <NavDropdown title={title} id={`${title.toLowerCase()}-nav-dropdown`}>
      {subcategories.map(([subcatId, subcategory]) => (
        <NavDropdown
          title={subcategory.name}
          key={subcatId}
          id={`subcategory-${subcatId}`}
          drop="end"
        >
          {productTypes[subcatId] ? (
            productTypes[subcatId].map(([typeId, productType]) => (
              <NavDropdown.Item key={typeId} onClick={() => navigate(`/groceries/${typeId}`)}>
                {productType.name}
              </NavDropdown.Item>
            ))
          ) : (
            <NavDropdown.Item>No product types found</NavDropdown.Item>
          )}
        </NavDropdown>
      ))}
    </NavDropdown>
  );

  // TODO Change navbar based on user type (admin/customer)

  return (
    <>
      <Navbar expand="lg" className="shadow-md py-4">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src={logoColor} alt="logo" className="max-h-10" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Stack direction="horizontal" gap={4}>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
                <Link to="/groceries">All Groceries</Link>
                <Link to="/admin">Admin</Link>
                <Link to="/newproducts">New</Link>
                <Link to="/flagged">Flagged</Link>
                {/* Dropdowns for each category */}
                {renderCategoryDropdown("Food", foodSubcategories, foodProductTypes)}
                {renderCategoryDropdown("Drinks", drinksSubcategories, drinksProductTypes)}
                {renderCategoryDropdown("Household", householdSubcategories, householdProductTypes)}
              </Stack>
            </Nav>
            {admin ? (
              <Stack direction="horizontal" gap={2}>
                <IconBtn iconType="add" onClick={() => navigate("/create")} />

                <Btn variant="secondary" className="w-32">
                  Log Out
                </Btn>
              </Stack>
            ) : (
              <Stack direction="horizontal" gap={2}>
                <IconBtn variant="dark" iconType="add" onClick={() => navigate("/add")} />
                <IconBtn
                  variant="primary"
                  iconType="cart_empty"
                  onClick={() => navigate("/planner")}
                />
                <Btn variant="secondary" className="w-32">
                  Log Out
                </Btn>
              </Stack>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
export default NavigationBar;
