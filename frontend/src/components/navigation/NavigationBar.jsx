// IMPORT
// -----------------------------------------------------------
// React & Hooks
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDatabase, ref, child, get } from "firebase/database";

// Services
import { getSubcategoriesByCategory } from "../../services/subcategoryService";
import { getProductTypeBySubcategory } from "../../services/productTypeService";
import { auth, logOutUser } from "../../services/firebaseAuthService";

// Utility Functions
import { formatName } from "../../utils/wordFormatUtils";

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
import adminLogoColor from "../../assets/logos/cheapr_admin_logo.svg";
// -----------------------------------------------------------

function NavigationBar({ admin }) {
  const [user] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingAdminStatus, setLoadingAdminStatus] = useState(true);
  const db = getDatabase();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const userRef = ref(db, `users/${user.uid}`);
      get(child(userRef, "isAdmin")).then((snapshot) => {
        if (snapshot.exists()) {
          setIsAdmin(snapshot.val());
        }
        setLoadingAdminStatus(false);
      });
    } else {
      setLoadingAdminStatus(false);
    }
  }, [db, user]);

  // State for each category's subcategories and product types
  const [foodSubcategories, setFoodSubcategories] = useState([]);
  const [drinksSubcategories, setDrinksSubcategories] = useState([]);
  const [householdSubcategories, setHouseholdSubcategories] = useState([]);

  const [foodProductTypes, setFoodProductTypes] = useState({});
  const [drinksProductTypes, setDrinksProductTypes] = useState({});
  const [householdProductTypes, setHouseholdProductTypes] = useState({});

  const fetchSubcategoriesAndTypes = async (categoryId, setSubcategories, setProductTypes) => {
    try {
      const subcategories = await getSubcategoriesByCategory(categoryId);

      setSubcategories(Object.entries(subcategories));

      const allProductTypes = {};
      for (const [subcatId] of Object.entries(subcategories)) {
        const productTypes = await getProductTypeBySubcategory(categoryId, subcatId);

        // Filter out null values in productIds
        const filteredProductTypes = Object.entries(productTypes).map(([typeId, productType]) => {
          const filteredProductIds = (productType.productIds || []).filter((id) => id !== null);
          return [typeId, { ...productType, productIds: filteredProductIds }];
        });

        allProductTypes[subcatId] = filteredProductTypes;
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

  // Render dropdown for a given category
  const renderCategoryDropdown = (title, categoryId, subcategories, productTypes) => (
    <NavDropdown title={title} id={`${title}-nav-dropdown`}>
      {/* "All {Category}" option */}
      <NavDropdown.Item onClick={() => navigate(`/groceries/${categoryId}`)}>
        All {title}
      </NavDropdown.Item>

      {subcategories.map(([subcatId, subcategory]) => (
        <NavDropdown
          title={subcategory?.name ? formatName(subcategory.name) : "Unnamed Subcategory"}
          key={subcatId}
          id={`subcategory-${subcatId}`}
          drop="end"
        >
          {/* "All {Subcategory}" option */}
          <NavDropdown.Item onClick={() => navigate(`/groceries/${subcatId}`)}>
            {subcategory?.name ? formatName(subcategory.name) : "Unnamed Subcategory"}
          </NavDropdown.Item>

          {productTypes[subcatId] ? (
            productTypes[subcatId].map(([typeId, productType]) => (
              <NavDropdown.Item key={typeId} onClick={() => navigate(`/groceries/${typeId}`)}>
                {productType?.name ? formatName(productType.name) : "Unnamed Product Type"}
              </NavDropdown.Item>
            ))
          ) : (
            <NavDropdown.Item>No product types found</NavDropdown.Item>
          )}
        </NavDropdown>
      ))}
    </NavDropdown>
  );

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  return (
    <>
      {loadingAdminStatus ? (
        <Navbar expand="lg" className="shadow-md py-4 h-[88px]">
          <Container>
            <Navbar.Brand as={Link} to="/">
              <img src={logoColor} alt="logo" className="max-h-10" />
            </Navbar.Brand>
          </Container>
        </Navbar>
      ) : (
        <Navbar expand="lg" className="shadow-md py-4">
          <Container>
            {isAdmin ? (
              <Navbar.Brand as={Link} to="/admin">
                <img src={adminLogoColor} alt="logo" className="max-h-10" />
              </Navbar.Brand>
            ) : (
              <Navbar.Brand as={Link} to="/">
                <img src={logoColor} alt="logo" className="max-h-10" />
              </Navbar.Brand>
            )}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {user ? (
                  // Admin Logged In
                  isAdmin ? (
                    <Stack direction="horizontal" gap={4}>
                      <Link to="/newproducts">New</Link>
                      <Link to="/flagged">Flagged</Link>
                      <Link to="/rejectedproducts">Rejected</Link>
                    </Stack>
                  ) : (
                    // Normal User Logged In
                    <Stack direction="horizontal" gap={4} className="lg:ml-10">
                      <Link to="/groceries" className="text-neutral-500 mr-2">
                        Shop All
                      </Link>
                      {/* Dropdowns for each category */}
                      {renderCategoryDropdown("Food", "10000", foodSubcategories, foodProductTypes)}
                      {renderCategoryDropdown(
                        "Drinks",
                        "20000",
                        drinksSubcategories,
                        drinksProductTypes
                      )}
                      {renderCategoryDropdown(
                        "Household",
                        "30000",
                        householdSubcategories,
                        householdProductTypes
                      )}
                    </Stack>
                  )
                ) : (
                  // No User Logged In
                  <></>
                )}
              </Nav>
              {/* Buttons (Admin or Normal User) */}
              {user ? (
                // Admin Logged In
                isAdmin ? (
                  <Stack direction="horizontal" gap={2}>
                    <IconBtn iconType="add" onClick={() => navigate("/create")} />

                    <Btn variant="secondary" className="w-32" onClick={logOutUser}>
                      Log Out
                    </Btn>
                  </Stack>
                ) : (
                  // Normal User Logged In
                  <Stack direction="horizontal" gap={2}>
                    <IconBtn variant="dark" iconType="add" onClick={() => navigate("/add")} />
                    <IconBtn
                      variant="primary"
                      iconType="cart_empty"
                      onClick={() => navigate("/planner")}
                    />
                    <Btn variant="secondary" className="w-32" onClick={logOutUser}>
                      Log Out
                    </Btn>
                  </Stack>
                )
              ) : (
                // No User Logged In
                <>
                  <Stack direction="horizontal" gap={2}>
                    <Btn className="w-32" onClick={() => navigate("/login")}>
                      Log In
                    </Btn>
                    <Btn variant="secondary" className="w-32" onClick={() => navigate("/signup")}>
                      Sign Up
                    </Btn>
                  </Stack>
                </>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </>
  );
}
export default NavigationBar;
