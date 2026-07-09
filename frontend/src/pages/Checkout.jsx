import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Checkout.css";

function Checkout({ cartItems }) {

  const navigate = useNavigate();

  const [payment, setPayment] = useState("COD");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    coupon: ""
  });

  const [errors, setErrors] = useState({});

  const subtotal = cartItems.reduce((total, item) => {
    const price = Number(item.price.replace(/[₹,]/g, ""));
    return total + price * item.quantity;
  }, 0);

  const discount = subtotal > 5000 ? 500 : 0;
  const shipping = 0;
  const total = subtotal - discount + shipping;

  const validateForm = () => {

    const newErrors = {};

    if (!form.name.trim())
      newErrors.name = "Full Name is required";

    if (!form.email.trim())
      newErrors.email = "Email is required";

    else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    )
      newErrors.email = "Enter a valid Email";

    if (!/^[0-9]{10}$/.test(form.phone))
      newErrors.phone = "Enter a valid 10-digit Phone Number";

    if (!form.address.trim())
      newErrors.address = "Address is required";

    if (!form.city.trim())
      newErrors.city = "City is required";

    if (!form.state.trim())
      newErrors.state = "State is required";

    if (!/^[0-9]{6}$/.test(form.pincode))
      newErrors.pincode = "Enter a valid 6-digit PIN Code";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };

function placeOrder() {

  if (cartItems.length === 0) {
    alert("🛒 Your cart is empty. Please add at least one product.");
    return;
  }

  if (!validateForm()) return;

  navigate("/success", {
    state: {
      customer: form,
      payment,
      cartItems,
      subtotal,
      discount,
      shipping,
      total,
      orderDate: new Date().toDateString(),
    },
  });

}

if (cartItems.length === 0) {

  return (

    <section className="checkout-page">

      <div
        style={{
          textAlign: "center",
          padding: "100px"
        }}
      >

        <h1>🛒 Your Cart is Empty</h1>

        <p>
          Please add some products before checkout.
        </p>

        <button
          className="place-order-btn"
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </button>

      </div>

    </section>

  );

}

  return (

<section className="checkout-page">

  <div className="checkout-container">

    {/* LEFT */}

    <div className="checkout-left">

      <h1>Shipping Details</h1>

      <input
        type="text"
        placeholder="Full Name"
        value={form.name}
        onChange={(e)=>
          setForm({
            ...form,
            name:e.target.value
          })
        }
      />

      {errors.name && (
        <p className="error">
          {errors.name}
        </p>
      )}

      <input
        type="email"
        placeholder="Email Address"
        value={form.email}
        onChange={(e)=>
          setForm({
            ...form,
            email:e.target.value
          })
        }
      />

      {errors.email && (
        <p className="error">
          {errors.email}
        </p>
      )}

      <input
        type="text"
        placeholder="Phone Number"
        value={form.phone}
        onChange={(e)=>
          setForm({
            ...form,
            phone:e.target.value
          })
        }
      />

      {errors.phone && (
        <p className="error">
          {errors.phone}
        </p>
      )}

      <textarea
        placeholder="Complete Shipping Address"
        value={form.address}
        onChange={(e)=>
          setForm({
            ...form,
            address:e.target.value
          })
        }
      />

      {errors.address && (
        <p className="error">
          {errors.address}
        </p>
      )}

      <div className="address-row">

        <input
          type="text"
          placeholder="City"
          value={form.city}
          onChange={(e)=>
            setForm({
              ...form,
              city:e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder="State"
          value={form.state}
          onChange={(e)=>
            setForm({
              ...form,
              state:e.target.value
            })
          }
        />

      </div>

      {errors.city && (
        <p className="error">
          {errors.city}
        </p>
      )}

      {errors.state && (
        <p className="error">
          {errors.state}
        </p>
      )}

      <input
        type="text"
        placeholder="PIN Code"
        value={form.pincode}
        onChange={(e)=>
          setForm({
            ...form,
            pincode:e.target.value
          })
        }
      />

      {errors.pincode && (
        <p className="error">
          {errors.pincode}
        </p>
      )}

      <h2>Payment Method</h2>

      <label>
        <input
          type="radio"
          checked={payment==="COD"}
          onChange={()=>setPayment("COD")}
        />
        Cash On Delivery
      </label>

      <label>
        <input
          type="radio"
          checked={payment==="UPI"}
          onChange={()=>setPayment("UPI")}
        />
        UPI
      </label>

      <label>
        <input
          type="radio"
          checked={payment==="CARD"}
          onChange={()=>setPayment("CARD")}
        />
        Credit / Debit Card
      </label>

    </div>


    {/* RIGHT */}

    <div className="checkout-right">

      <h2>Order Summary</h2>

      <div className="summary-box">

        <p>
          <span>Total Items</span>
          <span>{cartItems.length}</span>
        </p>

        <p>
          <span>Subtotal</span>
          <span>₹{subtotal.toLocaleString()}</span>
        </p>

        <p>
          <span>Discount</span>
          <span className="green">
            - ₹{discount.toLocaleString()}
          </span>
        </p>

        <p>
          <span>Shipping</span>
          <span className="green">
            FREE
          </span>
        </p>

        <hr />

        <h3>
          <span>Grand Total</span>
          <span>₹{total.toLocaleString()}</span>
        </h3>

      </div>

      <div className="coupon-box">

        <input
          type="text"
          placeholder="Enter Coupon Code"
          value={form.coupon}
          onChange={(e)=>
            setForm({
              ...form,
              coupon:e.target.value
            })
          }
        />

        <button
          onClick={()=>{
            if(
              form.coupon.trim().toUpperCase()==="ORIGIN10"
            ){
              alert("🎉 Coupon Applied Successfully!");
            }
            else if(form.coupon.trim()===""){
              alert("Please Enter Coupon");
            }
            else{
              alert("Invalid Coupon");
            }
          }}
        >
          Apply
        </button>

      </div>

      <button
        className="place-order-btn"
        onClick={placeOrder}
      >
        🔒 Place Order
      </button>

      <div className="payment-card">

        <h4>100% Secure Checkout</h4>

        <p>🔒 SSL Encrypted Payment</p>

        <p>💳 Visa • Mastercard • UPI • RuPay</p>

        <p>🚚 Free Delivery Across India</p>

        <p>↩ 7 Days Easy Return</p>

      </div>

    </div>

  </div>

</section>

);

}

export default Checkout;