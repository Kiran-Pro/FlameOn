import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar/Navbar";
import Checkout from "./pages/Checkout";
import Footer from "./components/Footer/Footer";
import OrderConfirmation from "./pages/OrderConfirmation";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoutes";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyOtp from "./pages/VerifyOtp";
import ScrollToTop from "./components/ScrollToTop";
import AdminDashboard from "./pages/AdminDashboard";
import Forbidden from "./pages/Forbidden";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* Auth Routes*/}
        <Route
          path="/login"
          element={user ? <Navigate to="/profile" /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/profile" /> : <Register />}
        />

        {/* Forgot/Reset Password & OTP*/}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected User Routes */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-confirmation"
          element={
            <ProtectedRoute>
              <OrderConfirmation />
            </ProtectedRoute>
          }
        />

        {/* Admin-only Route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/*Not found route*/}
        <Route path="*" element={<NotFound />} />

        {/* Forbidden route */}
        <Route path="/403" element={<Forbidden />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
