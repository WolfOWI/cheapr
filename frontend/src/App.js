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
import AdminCreateSubcatPage from "./pages/AdminCreateSubcatPage";
import AdminCreatePTypePage from "./pages/AdminCreatePTypePage";
import AdminCreateProductPage from "./pages/AdminCreateProductPage";
import AdminNewProductsDash from "./pages/AdminNewProductsDash";
import AdminEditDash from "./pages/AdminEditDash";
import AdminFlaggedDash from "./pages/AdminFlaggedDash";
import AdminRejectedProductsDash from "./pages/AdminRejectedProductsDash";

// Private Route
import PrivateRoute from "./components/PrivateRoute";

// -----------------------------------------------------------

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/groceries/:groupId?" element={<GroceriesPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/planner" element={<CartPlannerPage />} />
        <Route path="/add" element={<AddProductPage />} />

        {/* Admin Routes - Protected by PrivateRoute */}
        <Route
          path="/admin"
          element={
            <PrivateRoute isAdmin={true}>
              <AdminDash />
            </PrivateRoute>
          }
        />
        <Route
          path="/create"
          element={
            <PrivateRoute isAdmin={true}>
              <AdminCreateMenuPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/createsubcat"
          element={
            <PrivateRoute isAdmin={true}>
              <AdminCreateSubcatPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/createptype"
          element={
            <PrivateRoute isAdmin={true}>
              <AdminCreatePTypePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/createproduct"
          element={
            <PrivateRoute isAdmin={true}>
              <AdminCreateProductPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/newproducts"
          element={
            <PrivateRoute isAdmin={true}>
              <AdminNewProductsDash />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:productId"
          element={
            <PrivateRoute isAdmin={true}>
              <AdminEditDash />
            </PrivateRoute>
          }
        />
        <Route
          path="/flagged"
          element={
            <PrivateRoute isAdmin={true}>
              <AdminFlaggedDash />
            </PrivateRoute>
          }
        />
        <Route
          path="/rejectedproducts"
          element={
            <PrivateRoute isAdmin={true}>
              <AdminRejectedProductsDash />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
