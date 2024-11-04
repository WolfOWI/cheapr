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

      // Check if subcategories data is valid
      if (!subcategories || Object.keys(subcategories).length === 0) {
        setProductTypes({});
        return; // Exit if no subcategories are found
      }

      setSubcategories(Object.entries(subcategories));

      const allProductTypes = {};

      for (const [subcatId] of Object.entries(subcategories)) {
        const productTypes = await getProductTypeBySubcategory(categoryId, subcatId);

        if (productTypes) {
          // Filter out null values in productIds
          const filteredProductTypes = Object.entries(productTypes).map(([typeId, productType]) => {
            const filteredProductIds = (productType.productIds || []).filter((id) => id !== null);
            return [typeId, { ...productType, productIds: filteredProductIds }];
          });

          allProductTypes[subcatId] = filteredProductTypes;
        } else {
          allProductTypes[subcatId] = []; // Set an empty array if no product types found
        }
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
    <NavDropdown title={title} id={`${title}-nav-dropdown`} className="absolute z-50 w-[210px]">
      {/* "All {Category}" option */}
      <NavDropdown.Item onClick={() => navigate(`/groceries/${categoryId}`)}>
        All {title}
      </NavDropdown.Item>

      {subcategories.map(([subcatId, subcategory]) => {
        // Check if there are product types under this subcategory
        const hasProductTypes = productTypes[subcatId] && productTypes[subcatId].length > 0;
        return (
          <NavDropdown
            title={subcategory?.name ? formatName(subcategory.name) : "Unnamed Subcategory"}
            key={subcatId}
            id={`subcategory-${subcatId}`}
            drop="end"
            className="pl-4 lg:pl-2"
          >
            {/* Only display "All Subcategory" if there are product types */}
            {hasProductTypes && (
              <NavDropdown.Item onClick={() => navigate(`/groceries/${subcatId}`)}>
                All {subcategory?.name ? formatName(subcategory.name) : "Unnamed Subcategory"}
              </NavDropdown.Item>
            )}

            {/* Display product types if available; otherwise, no item is clickable */}
            {hasProductTypes ? (
              productTypes[subcatId].map(([typeId, productType]) => (
                <NavDropdown.Item key={typeId} onClick={() => navigate(`/groceries/${typeId}`)}>
                  {productType?.name ? formatName(productType.name) : "Unnamed Product Type"}
                </NavDropdown.Item>
              ))
            ) : (
              <NavDropdown.Item disabled>No product types</NavDropdown.Item>
            )}
          </NavDropdown>
        );
      })}
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
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {user ? (
                  // Admin Logged In
                  isAdmin ? (
                    <div className="flex h-11 space-x-4 pt-1 lg:pt-0 lg:items-center">
                      <Link to="/newproducts">New</Link>
                      <Link to="/flagged">Flagged</Link>
                      <Link to="/rejectedproducts">Rejected</Link>
                    </div>
                  ) : (
                    // Normal User Logged In
                    <Stack direction="horizontal" gap={4} className="lg:ml-10">
                      <Link to="/groceries" className="text-neutral-500 mr-2">
                        Shop All
                      </Link>
                      <div className="flex space-x-4 relative">
                        {/* Dropdowns for each category */}
                        <div className="w-14 h-11">
                          {renderCategoryDropdown(
                            "Food",
                            "10000",
                            foodSubcategories,
                            foodProductTypes
                          )}
                        </div>
                        <div className="w-16 h-11">
                          {renderCategoryDropdown(
                            "Drinks",
                            "20000",
                            drinksSubcategories,
                            drinksProductTypes
                          )}
                        </div>
                        <div className="w-24 h-11">
                          {renderCategoryDropdown(
                            "Household",
                            "30000",
                            householdSubcategories,
                            householdProductTypes
                          )}
                        </div>
                      </div>
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
                    <div className="w-full sm:w-fit">
                      <IconBtn
                        iconType="add"
                        onClick={() => navigate("/create")}
                        className=" hidden lg:flex"
                      />
                      <Btn
                        className="w-full sm:w-32 block lg:hidden"
                        onClick={() => navigate("/create")}
                      >
                        Create
                      </Btn>
                    </div>

                    <Btn variant="secondary" className="min-w-32" onClick={logOutUser}>
                      Log Out
                    </Btn>
                  </Stack>
                ) : (
                  // Normal User Logged In
                  <Stack direction="horizontal" gap={2}>
                    <div className="w-full sm:w-fit">
                      <IconBtn
                        variant="dark"
                        iconType="add"
                        onClick={() => navigate("/add")}
                        className=" hidden lg:flex"
                      />
                      <Btn
                        variant="dark"
                        onClick={() => navigate("/add")}
                        className="w-full sm:min-w-fit block lg:hidden"
                      >
                        Add Product
                      </Btn>
                    </div>
                    <div className="w-full sm:w-fit">
                      <IconBtn
                        variant="primary"
                        iconType="cart_empty"
                        className=" hidden lg:flex"
                        onClick={() => navigate("/planner")}
                      />
                      <Btn
                        className="w-full sm:w-32 block lg:hidden"
                        onClick={() => navigate("/planner")}
                      >
                        Planner
                      </Btn>
                    </div>
                    <Btn variant="secondary" className="min-w-32" onClick={logOutUser}>
                      Log Out
                    </Btn>
                  </Stack>
                )
              ) : (
                // No User Logged In
                <>
                  <div className="flex space-x-2 mt-4 lg:mt-0">
                    <Btn className="w-full sm:w-32" onClick={() => navigate("/login")}>
                      Log In
                    </Btn>
                    <Btn
                      variant="secondary"
                      className="w-full sm:w-32"
                      onClick={() => navigate("/signup")}
                    >
                      Sign Up
                    </Btn>
                  </div>
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
