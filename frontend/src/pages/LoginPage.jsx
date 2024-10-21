// IMPORT
// -----------------------------------------------------------
// React & Hooks
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Services
import { loginUser } from "../services/firebaseAuthService";

// Utility Functions
// -

// Third-Party Components
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";

// Internal Components
import NavigationBar from "../components/navigation/NavigationBar";
import Btn from "../components/button/Btn";

// Imagery
import produceBlurryImg from "../assets/images/produceBlurry.jpg";

// -----------------------------------------------------------
function LoginPage() {
  // State for user inputs and error handling
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      const user = await loginUser(email, password); // Fetch user info from database
      if (user.isAdmin) {
        navigate("/admin"); // Redirect to admin page if admin
      } else {
        navigate("/"); // Redirect to home for normal users
      }
    } catch (err) {
      setError(err.message); // Set error message on failure
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="w-full flex relative bg-neutral-200 h-svh">
        <Container className="flex justify-center z-10 mb-64">
          <div className="bg-white w-[500px] rounded-2xl p-10 h-fit mt-24">
            <h2>Welcome</h2>
            <h4>Please enter your login details below.</h4>
            <Form onSubmit={handleLogin}>
              <Form.Group className="mt-8 mb-4" controlId="formBasicEmail">
                <Form.Label className="font-semibold">Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="hello@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Track email state
                  className="input-style"
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label className="font-semibold">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Track password state
                  className="input-style"
                />
              </Form.Group>
              {error && <p className="text-red-600">{error}</p>} {/* Display error */}
              <Btn variant="primary" className="w-full" type="submit">
                Login
              </Btn>
            </Form>
          </div>
        </Container>
        <img
          src={produceBlurryImg}
          alt="produce background"
          className="absolute z-0 object-cover brightness-50 w-full h-full"
        />
      </div>
    </>
  );
}

export default LoginPage;
