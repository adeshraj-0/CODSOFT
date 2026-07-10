import { FaStore, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Navbar({
  cartCount,
  search,
  setSearch,
}) {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const userName =
    localStorage.getItem("userName") || "User";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");

    alert("Logged Out Successfully!");

    navigate("/login");

    window.location.reload();
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
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/products">Products</Link>
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>

        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>

      <div className="nav-right">
        <Link to="/cart">
          <button className="cart-btn">
            🛒 Cart ({cartCount})
          </button>
        </Link>

        {isLoggedIn ? (
          <div className="user-section">
            <div className="user-name">
              <FaUser />
              <span>{userName}</span>
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