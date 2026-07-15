import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";

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
import MyOrders from "./pages/MyOrders";
import Profile from "./pages/Profile";

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");

    return savedCart
      ? JSON.parse(savedCart)
      : [];
  });

  const [search, setSearch] = useState("");

  const [user, setUser] = useState(null);

  const [authLoading, setAuthLoading] = useState(true);

  const [appliedCoupon, setAppliedCoupon] =
    useState("");

  const location = useLocation();

  useEffect(() => {
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        setUser(firebaseUser);
        setAuthLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (authLoading) {
    return (
      <div className="auth-loading">
        <h2>Loading Origin Store...</h2>
      </div>
    );
  }

  return (
    <>
      {location.pathname !== "/success" && (
        <Navbar
          cartCount={cartItems.length}
          search={search}
          setSearch={setSearch}
          user={user}
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
              appliedCoupon={appliedCoupon}
              setAppliedCoupon={setAppliedCoupon}
            />
          }
        />

<Route
  path="/checkout"
  element={
    <Checkout
      cartItems={cartItems}
      setCartItems={setCartItems}
      user={user}
      appliedCoupon={appliedCoupon}
    />
  }
/>

<Route
  path="/success"
  element={
    <OrderSuccess
      user={user}
      setCartItems={setCartItems}
    />
  }
/>

        <Route
          path="/orders"
          element={
          <MyOrders user={user} />
        }
        />

        <Route
  path="/profile"
  element={
    <Profile user={user} />
  }
/>

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />
      </Routes>
    </>
  );
}

export default App;