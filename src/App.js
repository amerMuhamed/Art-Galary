import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/shared/Login";
import NavBar from "./components/NavBar";
import Products from "./pages/customer/Products";
import { AuthContext } from "./hooks/UserContext";
import Cart from "./pages/customer/Cart";
import ProductForm from "./pages/admin/AddProduct";
import Footer from "./components/Footer";
import "./index.css";
function App() {
  const { authenticationData } = useContext(AuthContext);
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/add-product" element={<ProductForm />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
