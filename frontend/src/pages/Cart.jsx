import { useState } from "react";
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

function Cart({ cartItems, setCartItems, appliedCoupon, setAppliedCoupon }) {
  const [coupon, setCoupon] = useState(appliedCoupon || "");
  const [couponDiscount, setCouponDiscount] =
    useState(0);
  const [couponMessage, setCouponMessage] =
    useState("");

  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                (Number(item.quantity) || 1) + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  (Number(item.quantity) || 1) - 1,
              }
            : item
        )
        .filter(
          (item) =>
            (Number(item.quantity) || 0) > 0
        )
    );
  };

  const removeItem = (id) => {
    setCartItems(
      cartItems.filter((item) => item.id !== id)
    );
  };

  const getPrice = (item) => {
    const rawPrice =
      item.price ??
      item.discountPrice ??
      item.finalPrice ??
      item.productPrice ??
      0;

    const price = Number(
      String(rawPrice)
        .replace("₹", "")
        .replace(/,/g, "")
        .trim()
    );

    return Number.isFinite(price) ? price : 0;
  };

  const subtotal = cartItems.reduce(
    (total, item) => {
      const price = getPrice(item);

      const quantity = Math.max(
        1,
        Number(item.quantity) || 1
      );

      return total + price * quantity;
    },
    0
  );

  const discount = Math.min(
    couponDiscount,
    subtotal
  );

  const shipping = 0;

  const total = Math.max(
    0,
    subtotal - discount + shipping
  );

  const applyCoupon = () => {
    const couponCode = coupon
      .trim()
      .toUpperCase();

    if (!couponCode) {
      setCouponDiscount(0);
      setCouponMessage(
        "Please enter a coupon code."
      );

      return;
    }

if (couponCode === "ORIGIN10") {
  const discountAmount = Math.round(
    subtotal * 0.1
  );

  setCouponDiscount(discountAmount);

  setAppliedCoupon("ORIGIN10");

  setCouponMessage(
    "ORIGIN10 applied! You saved 10%."
  );

  return;
}
    setCouponDiscount(0);

    setAppliedCoupon("");

    setCouponMessage(
      "Invalid coupon code."
    );
  };

  return (
    <section className="cart-page">
      <div className="cart-title">
        <h1>Shopping Cart</h1>

        <p>
          Review your selected products before
          checkout.
        </p>
      </div>

      <div className="cart-wrapper">
        {/* LEFT */}

        <div className="cart-products">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <h2>Your Cart is Empty</h2>

              <p>
                Add some amazing products to
                continue shopping.
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
                      type="button"
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                    >
                      <FaMinus />
                    </button>

                    <span>
                      {Number(item.quantity) || 1}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                    >
                      <FaPlus />
                    </button>
                  </div>

                  <div className="cart-actions">
                    <button
                      type="button"
                      className="wishlist-btn"
                    >
                      <FaHeart />

                      Save for Later
                    </button>
                  </div>
                </div>

                <button
                  type="button"
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

            <span>
              ₹{subtotal.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="summary-line">
            <span>Discount</span>

            <span className="green">
              - ₹
              {discount.toLocaleString("en-IN")}
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
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="coupon-box">
            <input
              type="text"
              placeholder="Enter Coupon Code"
              value={coupon}
              onChange={(e) => {
                setCoupon(e.target.value);

                if (couponDiscount > 0) {
                  setCouponDiscount(0);
                  setCouponMessage("");
                }
              }}
            />

            <button
              type="button"
              onClick={applyCoupon}
            >
              Apply
            </button>
          </div>

          {couponMessage && (
            <p className="coupon-message">
              {couponMessage}
            </p>
          )}

          {cartItems.length > 0 && (
            <Link to="/checkout">
              <button className="checkout-btn">
                <FaLock />

                <span>
                  Proceed To Checkout
                </span>
              </button>
            </Link>
          )}

          <div className="secure-payment">
            <h4>Secure Payment</h4>

            <p>🔒 SSL Encrypted Checkout</p>

            <p>
              💳 Visa • Mastercard • UPI
            </p>
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
      </div>
    </section>
  );
}

export default Cart;