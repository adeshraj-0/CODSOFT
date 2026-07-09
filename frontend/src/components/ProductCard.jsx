import { useNavigate } from "react-router-dom";
function ProductCard({ product, cartItems, setCartItems }) {
  
  const navigate = useNavigate();

  function addToCart() {

  const existingProduct = cartItems.find(
    (item) => item.id === product.id
  );

  if (existingProduct) {

    const updatedCart = cartItems.map((item) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCartItems(updatedCart);

  } else {

    setCartItems([
      ...cartItems,
      {
        ...product,
        quantity: 1
      }
    ]);

  }

}

 return (

  <div className="product-card">

    <img
      src={product.image}
      alt={product.name}
      onClick={() => navigate(`/product/${product.id}`)}
      style={{ cursor: "pointer" }}
    />

    <h3
      onClick={() => navigate(`/product/${product.id}`)}
      style={{ cursor: "pointer" }}
    >
      {product.name}
    </h3>

    <p>{product.price}</p>

    <div className="product-buttons">

      <button onClick={addToCart}>
        Add To Cart
      </button>

      <button
        className="details-btn"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        View Details
      </button>

    </div>

  </div>

);

}

export default ProductCard;