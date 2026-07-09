import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Category from "../components/Category";
import ProductList from "../components/ProductList";

function Home({ 
  cartItems,
  setCartItems,
  search
}) {

  const navigate = useNavigate();
  return (
    <>
      <section className="hero">
        <div className="hero-content">

          <p className="hero-tag">
            🚀 India's Next Generation Shopping Platform
          </p>

          <h1>Big Summer Sale</h1>

          <h2>Up To 50% OFF</h2>

          <p>
            Shop premium fashion, electronics, accessories and lifestyle
            products with exclusive discounts only at Origin Store.
          </p>

  <div className="hero-buttons">

  <button
    className="shop-btn"
    onClick={() => navigate("/products")}
  >
    🛍 Shop Now
  </button>

  <button
    className="explore-btn"
    onClick={() => {
      document
        .querySelector(".products")
        ?.scrollIntoView({
          behavior: "smooth"
        });
    }}
  >
    Explore Products →
  </button>

</div>

        </div>
      </section>

      <ProductList
        cartItems={cartItems}
        setCartItems={setCartItems}
        search={search}
      />

      <Category />

      <Footer />
    </>
  );
}

export default Home;