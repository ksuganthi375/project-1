import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home";
import Alogin from "./Admin/Alogin";
import Asignup from "./Admin/Asignup";
import Slogin from "./Seller/Slogin";
import Ssignup from "./Seller/Ssignup";
import Login from "./User/Login";
import Signup from "./User/Signup";
import Unavbar from "./User/Unavbar";
import Book from "./Seller/Book";
import Uitem from "./User/Uitem";
import Ahome from "./Admin/Ahome";
import Users from "./Admin/Users";
import Seller from "./Admin/Seller";
import Items from "./Admin/Items";
import Shome from "./Seller/Shome";
import Myproducts from "./Seller/MyProducts";
import Addbook from "./Seller/Addbook";
import Orders from "./Seller/Orders";
import Uhome from "./User/UHome";
import Products from "./User/Products";
import OrderItem from "./User/OrderItem";
import Myorders from "./User/MyOrders";
import Wishlist from "./User/Wishlist";

const ProtectedRoute = ({ children, role }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  // if (!user) return <Navigate to="/" replace />;

  // if (role && user.role !== role) return <Navigate to="/" replace />;

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ---------- Public Routes ---------- */}
        <Route path="/" element={<Home />} />
        <Route path="/alogin" element={<Alogin />} />
        <Route path="/asignup" element={<Asignup />} />
        <Route path="/slogin" element={<Slogin />} />
        <Route path="/ssignup" element={<Ssignup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/nav" element={<Unavbar />} />
        <Route path="book/:id" element={<Book />} />
        <Route path="/uitem/:id" element={<Uitem />} />

        {/* ---------- Admin Protected ---------- */}
        <Route
          path="/ahome"
          element={
            <ProtectedRoute role="admin">
              <Ahome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute role="admin">
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sellers"
          element={
            <ProtectedRoute role="admin">
              <Seller />
            </ProtectedRoute>
          }
        />
        <Route
          path="/items"
          element={
            <ProtectedRoute role="admin">
              <Items />
            </ProtectedRoute>
          }
        />

        {/* ---------- Seller Protected ---------- */}
        <Route
          path="/shome"
          element={
            <ProtectedRoute role="seller">
              <Shome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myproducts"
          element={
            <ProtectedRoute role="seller">
              <Myproducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addbook"
          element={
            <ProtectedRoute role="seller">
              <Addbook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute role="seller">
              <Orders />
            </ProtectedRoute>
          }
        />

        {/* ---------- User Protected ---------- */}
        <Route
          path="/uhome"
          element={
            <ProtectedRoute role="user">
              <Uhome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/uproducts"
          element={
            <ProtectedRoute role="user">
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orderitem/:id"
          element={
            <ProtectedRoute role="user">
              <OrderItem />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myorders"
          element={
            <ProtectedRoute role="user">
              <Myorders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute role="user">
              <Wishlist />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
