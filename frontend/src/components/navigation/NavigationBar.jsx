// IMPORT
// -----------------------------------------------------------
// React & Hooks
import { Link } from "react-router-dom";

// Services
// -

// Utility Functions
// -

// Third-Party Components
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

// Internal Components
// -

// Imagery
import logoColor from "../../assets/logos/logo_color.svg";
// -----------------------------------------------------------

function NavigationBar() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src={logoColor} alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link to="/login">Login</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/signup">Sign Up</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/groceries">All Groceries</Link>
              </Nav.Link>
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
              <Nav.Link>
                <Link to="/product">Individual</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/admin">Admin All</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/edit">Admin Edit</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/newproducts">New</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/flagged">Flagged</Link>
              </Nav.Link>
            </Nav>
            <div>
              <Button variant="dark" as={Link} to="/add">
                Add
              </Button>
              <Button variant="danger" as={Link} to="/planner">
                Planner
              </Button>
              <Button variant="outline-danger">Log Out</Button>{" "}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
export default NavigationBar;
