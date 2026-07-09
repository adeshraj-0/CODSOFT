import { FaStore, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar({ 
  cartCount,
  search,
  setSearch
}) {
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
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <div className="nav-right">

        <Link to="/cart">
         <button className="cart-btn">
           🛒 Cart ({cartCount})
        </button>
        </Link>

        <Link to="/login">
          <button className="login-btn">
            <FaUser />
            <span>Login</span>
          </button>
  
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;