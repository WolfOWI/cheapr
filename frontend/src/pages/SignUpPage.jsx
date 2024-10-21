// IMPORT
// -----------------------------------------------------------
// React & Hooks
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Services
import { signUpUser } from "../services/firebaseAuthService";

// Utility Functions
// -

// Third-Party Components
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";

// Internal Components
import NavigationBar from "../components/navigation/NavigationBar";
import Btn from "../components/button/Btn";

// Imagery
import supermarketBlurryImg from "../assets/images/supermarketBlurry.jpg";

// -----------------------------------------------------------
function SignUpPage() {
  // State for user inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle sign-up form submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      await signUpUser(email, password, firstName, lastName); // Call sign-up function
      navigate("/login"); // Redirect to login after successful sign-up
    } catch (err) {
      setError(err.message); // Set error message on failure
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="w-full flex relative bg-neutral-200 h-svh">
        <Container className="flex justify-center z-10 mb-32">
          <div className="bg-white w-[500px] rounded-2xl p-10 h-fit mt-24">
            <h2>Join Us Today</h2>
            <h4>Sign up and start saving time & money!</h4>
            <Form onSubmit={handleSignUp}>
              <Form.Group className="mt-8 mb-4" controlId="formBasicFirstName">
                <Form.Label className="font-semibold">First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)} // Track state
                  className="input-style"
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicLastName">
                <Form.Label className="font-semibold">Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)} // Track state
                  className="input-style"
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label className="font-semibold">Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="hello@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Track state
                  className="input-style"
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label className="font-semibold">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Track state
                  className="input-style"
                />
              </Form.Group>
              {error && <p className="text-red-600">{error}</p>} {/* Display error */}
              <Btn variant="primary" className="w-full" type="submit">
                Create New Account
              </Btn>
            </Form>
          </div>
        </Container>
        <img
          src={supermarketBlurryImg}
          alt="supermarket background"
          className="absolute z-0 object-cover brightness-50 w-full h-full"
        />
      </div>
    </>
  );
}

export default SignUpPage;
