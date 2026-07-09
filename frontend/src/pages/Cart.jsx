import "../styles/cart.css";
import { Link } from "react-router-dom";
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaLock,
  FaHeart,
  FaStar,
  FaTruck,
} from "react-icons/fa";

function Cart({ cartItems, setCartItems }) {

  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((total, item) => {
    const price = Number(item.price.replace(/[₹,]/g, ""));
    return total + price * item.quantity;
  }, 0);

  const discount = subtotal > 5000 ? 500 : 0;
  const shipping = subtotal === 0 ? 0 : 0;
  const total = subtotal - discount + shipping;

  return (
    <section className="cart-page">

      <div className="cart-title">

        <h1>Shopping Cart</h1>

        <p>
          Review your selected products before checkout.
        </p>

      </div>

      <div className="cart-wrapper">

        {/* LEFT */}

        <div className="cart-products">

          {cartItems.length === 0 ? (

            <div className="empty-cart">

              <h2>Your Cart is Empty</h2>

              <p>
                Add some amazing products to continue shopping.
              </p>

            </div>

          ) : (

            cartItems.map((item) => (

              <div
                className="cart-card"
                key={item.id}
              >

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="cart-content">

                  <h2>{item.name}</h2>

                  <p className="cart-price">
                    {item.price}
                  </p>

                  <div className="product-meta">

                    <span className="rating">
                      <FaStar />
                      4.8
                    </span>

                    <span className="stock">
                      In Stock
                    </span>

                  </div>

                  <p className="delivery">

                    <FaTruck />

                    Delivery in 2–4 Days

                  </p>

                  <div className="quantity-control">

                    <button
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                    >
                      <FaMinus />
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                    >
                      <FaPlus />
                    </button>

                  </div>

                  <div className="cart-actions">

                    <button className="wishlist-btn">

                      <FaHeart />

                      Save for Later

                    </button>

                  </div>

                </div>

                <button
                  className="delete-btn"
                  onClick={() =>
                    removeItem(item.id)
                  }
                >
                  <FaTrash />
                </button>

              </div>

            ))

          )}

        </div>

                {/* RIGHT */}

        <div className="order-summary">

          <h2>Order Summary</h2>

          <div className="summary-line">
            <span>Items</span>
            <span>{cartItems.length}</span>
          </div>

          <div className="summary-line">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>

          <div className="summary-line">
            <span>Discount</span>
            <span className="green">
              - ₹{discount}
            </span>
          </div>

          <div className="summary-line">
            <span>Shipping</span>
            <span className="green">
              FREE
            </span>
          </div>

          <hr />

          <div className="summary-total">

            <span>Total</span>

            <span>
              ₹{total.toLocaleString()}
            </span>

          </div>

          <div className="coupon-box">

            <input
              type="text"
              placeholder="Enter Coupon Code"
            />

            <button>
              Apply
            </button>

          </div>

          <Link to="/checkout">

  <button className="checkout-btn">

    <FaLock />

    <span>Proceed To Checkout</span>

  </button>

</Link>

          <div className="secure-payment">

            <h4>Secure Payment</h4>

            <p>🔒 SSL Encrypted Checkout</p>

            <p>💳 Visa • Mastercard • UPI</p>

          </div>

          <div className="payment-methods">

            <h4>Accepted Payments</h4>

            <div className="payment-icons">

              <span>💳 Visa</span>

              <span>💳 Mastercard</span>

              <span>📱 UPI</span>

              <span>💰 PayPal</span>

            </div>

          </div>

        </div>

      </div>B

    </section>
  );
}

export default Cart;