import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

function App() {

  const [cartItems, setCartItems] = useState([]);
  const [search, setSearch] = useState("");
  
  const location = useLocation();

  return (
    <>
    {location.pathname !== "/success" && (
      <Navbar
        cartCount={cartItems.length}
        search={search}
        setSearch={setSearch}
      />
    )}

      <Routes>

        <Route
          path="/"
          element={
            <Home
              cartItems={cartItems}
              setCartItems={setCartItems}
              search={search}
            />
          }
        />

        <Route
          path="/products"
          element={
            <Products
              cartItems={cartItems}
              setCartItems={setCartItems}
              search={search}
            />
          }
        />

        {/* NEW ROUTE */}
        <Route
          path="/product/:id"
          element={
            <ProductDetails
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <Checkout
              cartItems={cartItems}
              />
          }
        />

        <Route
        path="/success"
        element={<OrderSuccess />}
        />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          }
        />

      </Routes>
    </>
  );
}

export default App;