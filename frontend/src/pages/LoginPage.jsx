// IMPORT
// -----------------------------------------------------------
// React & Hooks
// -

// Services
// -

// Utility Functions
// -

// Third-Party Components
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";

// Internal Components
import NavigationBar from "../components/navigation/NavigationBar";
import Btn from "../components/button/Btn";

// Imagery
// -

// -----------------------------------------------------------
function LoginPage() {
  return (
    <>
      <NavigationBar />
      <div className="w-full h-dvh bg-neutral-600 flex">
        <Container>
          <div className="bg-neutral-50 w-[500px] rounded-2xl p-10 h-fit mt-24">
            <h2>Welcome</h2>
            <h4>Please enter your login details below.</h4>
            <Form>
              <Form.Group className="mt-8 mb-4" controlId="formBasicEmail">
                <Form.Label className="font-semibold">Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="hello@gmail.com"
                  className="h-12 rounded-xl"
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label className="font-semibold">Password</Form.Label>
                <Form.Control type="password" placeholder="Password" className="h-12 rounded-xl" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="I'm an admin" />
              </Form.Group>
              <Btn variant="primary" className="w-full" type="submit">
                Login
              </Btn>
            </Form>
          </div>
        </Container>
      </div>
    </>
  );
}

export default LoginPage;
