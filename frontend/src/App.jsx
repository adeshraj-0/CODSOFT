import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

function App() {
  const [cartItems, setCartItems] = useState(() => {
  const savedCart = localStorage.getItem("cartItems");
  return savedCart ? JSON.parse(savedCart) : [];
});
  const [search, setSearch] = useState("");
  useEffect(() => {
  localStorage.setItem(
    "cartItems",
    JSON.stringify(cartItems)
  );
}, [cartItems]);

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
          path="/cart"
          element={
            <Cart
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

        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;