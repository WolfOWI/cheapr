// IMPORT
// -----------------------------------------------------------
// React & Hooks
import { Link, useNavigate } from "react-router-dom";

// Services
// -

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
                <Link to="/product">Individual</Link>
                <Link to="/admin">Admin All</Link>
                <Link to="/edit">Admin Edit</Link>
                <Link to="/newproducts">New</Link>
                <Link to="/flagged">Flagged</Link>
              </Stack>
              {/* TODO Add product filtering functionality */}
              {/* <NavDropdown title="Food" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Drinks" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Household" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown> */}
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
