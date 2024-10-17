// IMPORT
// -----------------------------------------------------------
// React & Hooks
import { Link } from "react-router-dom";

import { Col, Container, Row } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Stack } from "react-bootstrap";

// Services
// -

// Utility Functions
// -

// Third-Party Components
// -

// Internal Components
import Icon from "../building-blocks/Icon";

// Imagery
import logoCol from "../../assets/logos/logo_color.svg";

// -----------------------------------------------------------

const Footer = ({ admin }) => {
  return (
    <>
      <Container fluid className="bg-neutral-100 pb-8">
        <Row>
          <Col>
            <Navbar expand="lg" className="py-4 flex items-center justify-center">
              <Nav className="flex items-center">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <p className="mx-8 text-primary font-bold hidden lg:block">|</p>
                <Nav.Link as={Link} to="/groceries">
                  Groceries
                </Nav.Link>
                <p className="mx-8 text-primary font-bold hidden lg:block">|</p>
                <Nav.Link as={Link} to="/add">
                  Add a Product
                </Nav.Link>
                <p className="mx-8 text-primary font-bold hidden lg:block">|</p>
                <Nav.Link as={Link} to="/planner">
                  Shopping Planner
                </Nav.Link>
              </Nav>
            </Navbar>
          </Col>
        </Row>
        <div className="py-8 flex justify-center">
          <Stack direction="horizontal" gap={4}>
            <div>
              <img src={logoCol} alt="cheapr logo" className="max-h-10" />
              <p className="text-sm font-bold text-neutral-600">Shop Smarter, Not Harder.</p>
            </div>
            {/* Social Media */}
            <Stack direction="horizontal" gap={4}>
              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                rel="noreferrer"
              >
                <Icon type="youtube" className="h-8 text-primary hover:text-black cursor-pointer" />
              </a>
              <a href="https://www.x.com/" target="_blank" rel="noreferrer">
                <Icon type="x" className="h-8 text-primary hover:text-black cursor-pointer" />
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                <Icon
                  type="instagram"
                  className="h-8 text-primary hover:text-black cursor-pointer"
                />
              </a>
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                <Icon
                  type="facebook"
                  className="h-8 text-primary hover:text-black cursor-pointer"
                />
              </a>
              <a href="https://www.threads.net/" target="_blank" rel="noreferrer">
                <Icon type="threads" className="h-8 text-primary hover:text-black cursor-pointer" />
              </a>
              <a href="https://www.tiktok.com/" target="_blank" rel="noreferrer">
                <Icon type="tiktok" className="h-8 text-primary hover:text-black cursor-pointer" />
              </a>
            </Stack>
          </Stack>
        </div>
        <div className="flex justify-center bg-white py-4">
          <p className="text-sm">© 2024 Wolf Botha | 21100255 | Open Window Institute</p>
        </div>
      </Container>
    </>
  );
};

export default Footer;
