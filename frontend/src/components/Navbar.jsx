import { useEffect, useRef, useState } from "react";

import {
  FaStore,
  FaUser,
  FaChevronDown,
  FaAddressCard,
  FaBoxOpen,
} from "react-icons/fa";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { signOut } from "firebase/auth";

import { auth } from "../firebase/firebase";

function Navbar({
  cartCount,
  search,
  setSearch,
  user,
}) {
  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] =
    useState(false);

  const profileRef = useRef(null);

  const userName =
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "User";

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  const handleLogout = async () => {
    try {
      setIsProfileOpen(false);

      await signOut(auth);

      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userName");

      alert("Logged Out Successfully!");

      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);

      alert(
        "Unable to logout. Please try again."
      );
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <FaStore className="logo-icon" />

        <span>Origin Store</span>
      </div>

      <input
        type="text"
        className="search-box"
        placeholder="🔍 Search Products..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/products">
            Products
          </Link>
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>

        <li>
          <Link to="/contact">
            Contact
          </Link>
        </li>
      </ul>

      <div className="nav-right">
        <Link to="/cart">
          <button className="cart-btn">
            🛒 Cart ({cartCount})
          </button>
        </Link>

        {user ? (
          <div className="user-section">
            <div
              className="profile-menu"
              ref={profileRef}
            >
              <button
                type="button"
                className="user-name"
                onClick={() =>
                  setIsProfileOpen(
                    (previousState) =>
                      !previousState
                  )
                }
                aria-expanded={isProfileOpen}
                aria-label="Open account menu"
              >
                <FaUser />

                <span>{userName}</span>

                <FaChevronDown
                  className={`profile-arrow ${
                    isProfileOpen
                      ? "profile-arrow-open"
                      : ""
                  }`}
                />
              </button>

              {isProfileOpen && (
                <div className="profile-dropdown">
                  <Link
                    to="/profile"
                    className="profile-dropdown-item"
                    onClick={() =>
                      setIsProfileOpen(false)
                    }
                  >
                    <FaAddressCard />

                    <span>My Profile</span>
                  </Link>

                  <Link
                    to="/orders"
                    className="profile-dropdown-item"
                    onClick={() =>
                      setIsProfileOpen(false)
                    }
                  >
                    <FaBoxOpen />

                    <span>My Orders</span>
                  </Link>
                </div>
              )}
            </div>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="login-btn">
              <FaUser />

              <span>Login</span>
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;