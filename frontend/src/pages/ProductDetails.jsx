import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";

function ProductDetails({ cartItems, setCartItems }) {

  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return <h1 style={{ textAlign: "center" }}>Product Not Found</h1>;
  }

  function addToCart() {

    const existing = cartItems.find(
      (item) => item.id === product.id
    );

    if (existing) {

      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );

    } else {

      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity: 1
        }
      ]);

    }

    navigate("/cart");

  }

  return (

    <section className="product-details">

      <div className="details-container">

        <div className="details-image">

          <img
            src={product.image}
            alt={product.name}
          />

        </div>

        <div className="details-content">

          <span className="brand">
            {product.brand}
          </span>

          <h1>{product.name}</h1>

          <div className="rating-box">

            ⭐ {product.rating}

            <span>
              ({product.reviews} Reviews)
            </span>

          </div>

          <h2 className="price">
            {product.price}
          </h2>

          <p className="stock">

            📦 {product.stock}

          </p>

          <p className="delivery">

            🚚 {product.delivery}

          </p>

          <p className="offer">

            🎁 {product.offer}

          </p>

          <p className="emi">

            💳 {product.emi}

          </p>

          <h3>Description</h3>

          <p className="description">

            {product.description}

          </p>

          <h3>Key Features</h3>

          <ul>

            {product.features.map((feature, index) => (

              <li key={index}>

                ✔ {feature}

              </li>

            ))}

          </ul>

          <h3>Specifications</h3>

          <table className="spec-table">

            <tbody>

              {Object.entries(product.specifications).map(

                ([key, value]) => (

                  <tr key={key}>

                    <td>{key}</td>

                    <td>{value}</td>

                  </tr>

                )

              )}

            </tbody>

          </table>

          <div className="details-buttons">

            <button
              className="shop-btn"
              onClick={addToCart}
            >
              🛒 Add To Cart
            </button>

            <button
              className="explore-btn"
              onClick={() => navigate("/products")}
            >
              ← Back
            </button>

          </div>

        </div>

      </div>

    </section>

  );

}

export default ProductDetails;