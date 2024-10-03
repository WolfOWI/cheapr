// IMPORT
// -----------------------------------------------------------
// Styling
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "@fontsource-variable/inter";

// React & Hooks
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import GroceriesPage from "./pages/GroceriesPage";
import ProductPage from "./pages/ProductPage";
import CartPlannerPage from "./pages/CartPlannerPage";
import AddProductPage from "./pages/AddProductPage";
import AdminDash from "./pages/AdminDash";
import AdminCreateMenuPage from "./pages/AdminCreateMenuPage";
import AdminCreateProductPage from "./pages/AdminCreateProductPage";
import AdminNewProductsDash from "./pages/AdminNewProductsDash";
import AdminEditDash from "./pages/AdminEditDash";
import AdminFlaggedDash from "./pages/AdminFlaggedDash";

// -----------------------------------------------------------

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/groceries" element={<GroceriesPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/planner" element={<CartPlannerPage />} />
        <Route path="/add" element={<AddProductPage />} />
        <Route path="/admin" element={<AdminDash />} />
        <Route path="/create" element={<AdminCreateMenuPage />} />
        <Route path="/createproduct" element={<AdminCreateProductPage />} />
        <Route path="/newproducts" element={<AdminNewProductsDash />} />
        <Route path="/edit" element={<AdminEditDash />} />
        <Route path="/flagged" element={<AdminFlaggedDash />} />
      </Routes>
    </Router>
  );
}

export default App;
