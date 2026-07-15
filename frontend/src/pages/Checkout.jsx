import {
  useEffect,
  useState,
} from "react";

import {
  Navigate,
  useNavigate,
} from "react-router-dom";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

import emailjs from "@emailjs/browser";

import { db } from "../firebase/firebase";

import "../styles/Checkout.css";

function Checkout({
  cartItems,
  setCartItems,
  user,
  appliedCoupon,
}) {
  const navigate = useNavigate();

  const emailServiceId =
  import.meta.env.VITE_EMAILJS_SERVICE_ID;

const emailTemplateId =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

const emailPublicKey =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const [customer, setCustomer] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [savedAddresses, setSavedAddresses] =
    useState([]);

  const [
    selectedAddressId,
    setSelectedAddressId,
  ] = useState("");

  const [addressesLoading, setAddressesLoading] =
    useState(true);

  const [payment, setPayment] =
    useState("COD");

  const [coupon, setCoupon] = useState(
    appliedCoupon || ""
  );

  const [discount, setDiscount] =
    useState(0);

  const [couponMessage, setCouponMessage] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  useEffect(() => {
    if (!user) {
      setAddressesLoading(false);

      return;
    }

    const loadSavedAddresses = async () => {
      try {
        setAddressesLoading(true);

        const userReference = doc(
          db,
          "users",
          user.uid
        );

        const userSnapshot = await getDoc(
          userReference
        );

        if (!userSnapshot.exists()) {
          return;
        }

        const userData = userSnapshot.data();

        const addresses = Array.isArray(
          userData.addresses
        )
          ? userData.addresses
          : [];

        setSavedAddresses(addresses);

        if (addresses.length === 0) {
          return;
        }

        const defaultAddress =
          addresses.find(
            (savedAddress) =>
              savedAddress.isDefault
          ) || addresses[0];

        setSelectedAddressId(
          defaultAddress.id
        );

        setCustomer({
          name:
            defaultAddress.name ||
            user.displayName ||
            "",
          email:
            defaultAddress.email ||
            user.email ||
            "",
          phone:
            defaultAddress.phone || "",
          address:
            defaultAddress.address || "",
          city:
            defaultAddress.city || "",
          state:
            defaultAddress.state || "",
          pincode:
            defaultAddress.pincode || "",
        });
      } catch (error) {
        console.error(
          "Saved address load failed:",
          error
        );
      } finally {
        setAddressesLoading(false);
      }
    };

    loadSavedAddresses();
  }, [user]);

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (
    !cartItems ||
    cartItems.length === 0
  ) {
    return (
      <Navigate
        to="/cart"
        replace
      />
    );
  }

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

    return Number.isFinite(price)
      ? price
      : 0;
  };

  const subtotal = cartItems.reduce(
    (total, item) => {
      const price = getPrice(item);

      const quantity = Math.max(
        1,
        Number(item.quantity) || 1
      );

      return (
        total +
        price * quantity
      );
    },
    0
  );

  const appliedCouponDiscount =
    appliedCoupon === "ORIGIN10"
      ? Math.round(subtotal * 0.1)
      : 0;

  const finalDiscount =
    discount > 0
      ? discount
      : appliedCouponDiscount;

  const shipping =
    subtotal >= 999 ? 0 : 99;

  const total = Math.max(
    0,
    subtotal -
      finalDiscount +
      shipping
  );

  const handleAddressSelect = (
    event
  ) => {
    const addressId =
      event.target.value;

    setSelectedAddressId(addressId);

    if (!addressId) {
      setCustomer({
        name:
          user?.displayName || "",
        email:
          user?.email || "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
      });

      return;
    }

    const selectedAddress =
      savedAddresses.find(
        (savedAddress) =>
          savedAddress.id === addressId
      );

    if (!selectedAddress) {
      return;
    }

    setCustomer({
      name:
        selectedAddress.name || "",
      email:
        selectedAddress.email || "",
      phone:
        selectedAddress.phone || "",
      address:
        selectedAddress.address || "",
      city:
        selectedAddress.city || "",
      state:
        selectedAddress.state || "",
      pincode:
        selectedAddress.pincode || "",
    });
  };

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setCustomer(
      (previousCustomer) => ({
        ...previousCustomer,
        [name]: value,
      })
    );
  };

  const applyCoupon = () => {
    const couponCode = coupon
      .trim()
      .toUpperCase();

    if (!couponCode) {
      setDiscount(0);

      setCouponMessage(
        "Please enter a coupon code."
      );

      return;
    }

    if (
      couponCode === "ORIGIN10"
    ) {
      const couponDiscount =
        Math.round(
          subtotal * 0.1
        );

      setDiscount(couponDiscount);

      setCouponMessage(
        "ORIGIN10 applied successfully."
      );

      return;
    }

    setDiscount(0);

    setCouponMessage(
      "Invalid coupon code."
    );
  };

  const validateCheckout = () => {
    const name =
      customer.name.trim();

    const email =
      customer.email.trim();

    const phone =
      customer.phone.trim();

    const address =
      customer.address.trim();

    const city =
      customer.city.trim();

    const state =
      customer.state.trim();

    const pincode =
      customer.pincode.trim();

    if (
      !name ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !pincode
    ) {
      alert(
        "Please fill all delivery details."
      );

      return false;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailPattern.test(email)
    ) {
      alert(
        "Please enter a valid email address."
      );

      return false;
    }

    const phonePattern =
      /^[6-9]\d{9}$/;

    if (
      !phonePattern.test(phone)
    ) {
      alert(
        "Please enter a valid 10-digit mobile number."
      );

      return false;
    }

    const pincodePattern =
      /^\d{6}$/;

    if (
      !pincodePattern.test(pincode)
    ) {
      alert(
        "Please enter a valid 6-digit PIN code."
      );

      return false;
    }

    return true;
  };

const handlePlaceOrder = async (
    event
  ) => {
    event.preventDefault();



    if (isSubmitting) {
      return;
    }

    if (!validateCheckout()) {
      return;
    }

    setIsSubmitting(true);

    const orderId =
      "ORD" +
      Date.now()
        .toString()
        .slice(-10);

    const invoiceNo =
      "INV" +
      Date.now()
        .toString()
        .slice(-10);

    const orderDate =
      new Date().toISOString();

    const cleanCustomer = {
      name:
        customer.name.trim(),
      email:
        customer.email.trim(),
      phone:
        customer.phone.trim(),
      address:
        customer.address.trim(),
      city:
        customer.city.trim(),
      state:
        customer.state.trim(),
      pincode:
        customer.pincode.trim(),
    };

    const orderItems =
      cartItems.map((item) => {
        const price =
          getPrice(item);

        const quantity = Math.max(
          1,
          Number(item.quantity) || 1
        );

        return {
          id: String(
            item.id ?? ""
          ),
          name:
            item.name ||
            item.title ||
            "Product",
          image:
            item.image || "",
          price,
          quantity,
          itemTotal:
            price * quantity,
        };
      });

    const orderData = {
      userId: user.uid,

      userEmail:
        user.email || "",

      orderId,

      invoiceNo,

      customer:
        cleanCustomer,

      selectedAddressId:
        selectedAddressId || "",

      items: orderItems,

      itemCount:
        orderItems.reduce(
          (count, item) =>
            count +
            item.quantity,
          0
        ),

      subtotal,

      discount:
        finalDiscount,

      shipping,

      total,

      couponCode:
        appliedCoupon ===
          "ORIGIN10" ||
        coupon
          .trim()
          .toUpperCase() ===
          "ORIGIN10"
          ? "ORIGIN10"
          : "",

      paymentMethod:
        payment,

      paymentStatus:
        payment === "COD"
          ? "Pending"
          : "Demo",

      orderStatus:
        "Confirmed",

      orderDate,

      createdAt:
        serverTimestamp(),
    };

    const expectedDeliveryDate =
  new Date();

expectedDeliveryDate.setDate(
  expectedDeliveryDate.getDate() + 3
);

const formattedOrderDate =
  new Date(orderDate).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );

const formattedDeliveryDate =
  expectedDeliveryDate.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );

const orderItemsText = orderItems
  .map(
    (item, index) =>
      `${index + 1}. ${item.name}
Qty: ${item.quantity}
Price: Rs. ${item.price.toLocaleString("en-IN")}
Total: Rs. ${item.itemTotal.toLocaleString("en-IN")}`
  )
  .join("\n\n");

const emailTemplateParams = {
  to_email:
    cleanCustomer.email,

  customer_name:
    cleanCustomer.name,

  order_id:
    orderId,

  invoice_no:
    invoiceNo,

  order_date:
    formattedOrderDate,

  order_items:
    orderItemsText,

  subtotal:
    subtotal.toLocaleString("en-IN"),

  discount:
    finalDiscount.toLocaleString("en-IN"),

  shipping:
    shipping === 0
      ? "FREE"
      : `Rs. ${shipping.toLocaleString(
          "en-IN"
        )}`,

  total:
    total.toLocaleString("en-IN"),

  payment_method:
    payment,

  payment_status:
    orderData.paymentStatus,

  customer_address:
    cleanCustomer.address,

  customer_city:
    cleanCustomer.city,

  customer_state:
    cleanCustomer.state,

  customer_pincode:
    cleanCustomer.pincode,

  expected_delivery:
    formattedDeliveryDate,
};
console.log("EMAILJS DEBUG:", {
  serviceId: emailServiceId,
  templateId: emailTemplateId,
  publicKeyLoaded: Boolean(emailPublicKey),
  customerEmail: cleanCustomer.email,
});
    try {
      const orderDocument =
        await addDoc(
          collection(
            db,
            "orders"
          ),
          orderData
        );

        try {
  await emailjs.send(
    emailServiceId,
    emailTemplateId,
    emailTemplateParams,
    {
      publicKey: emailPublicKey,
    }
  );

  console.log(
    "Order confirmation email sent successfully."
  );
} catch (emailError) {
  console.error(
    "Order confirmation email failed:",
    emailError
  );
}


      navigate("/success", {
        state: {
          customer:
            cleanCustomer,

          payment,

          cartItems:
            orderItems,

          subtotal,

          discount:
            finalDiscount,

          shipping,

          total,

          orderDate,

          orderId,

          invoiceNo,

          firestoreOrderId:
            orderDocument.id,

          paymentStatus:
            orderData.paymentStatus,

          orderStatus:
            orderData.orderStatus,
        },
      });
    } catch (error) {
      console.error(
        "Order creation failed:",
        error
      );

      alert(
        "Unable to place your order. Please try again."
      );

      setIsSubmitting(false);
    }
  };

  return (
    <section className="checkout-page">
      <div className="checkout-container">
        <form
          className="checkout-left"
          onSubmit={
            handlePlaceOrder
          }
        >
          <h1>Checkout</h1>

          {addressesLoading ? (
            <div className="checkout-address-loading">
              Loading saved addresses...
            </div>
          ) : savedAddresses.length >
            0 ? (
            <div className="saved-address-selector">
              <div className="saved-address-selector-header">
                <div>
                  <h2>
                    Delivery Address
                  </h2>

                  <p>
                    Select one of your
                    saved addresses.
                  </p>
                </div>

                <span>
                  {
                    savedAddresses.length
                  }{" "}
                  Saved
                </span>
              </div>

              <select
                value={
                  selectedAddressId
                }
                onChange={
                  handleAddressSelect
                }
              >
                <option value="">
                  Enter a different
                  address
                </option>

                {savedAddresses.map(
                  (savedAddress) => (
                    <option
                      key={
                        savedAddress.id
                      }
                      value={
                        savedAddress.id
                      }
                    >
                      {
                        savedAddress.label
                      }
                      {savedAddress.isDefault
                        ? " - Default"
                        : ""}
                      {" - "}
                      {
                        savedAddress.city
                      }
                    </option>
                  )
                )}
              </select>
            </div>
          ) : (
            <div className="checkout-no-address">
              <strong>
                No saved address found
              </strong>

              <p>
                Enter your delivery
                address below.
              </p>
            </div>
          )}

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={customer.name}
            onChange={handleChange}
            autoComplete="name"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={customer.email}
            onChange={handleChange}
            autoComplete="email"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Mobile Number"
            value={customer.phone}
            onChange={handleChange}
            maxLength="10"
            inputMode="numeric"
            autoComplete="tel"
          />

          <textarea
            name="address"
            placeholder="Full Delivery Address"
            value={customer.address}
            onChange={handleChange}
            autoComplete="street-address"
          />

          <div className="address-row">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={customer.city}
              onChange={handleChange}
              autoComplete="address-level2"
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={customer.state}
              onChange={handleChange}
              autoComplete="address-level1"
            />

            <input
              type="text"
              name="pincode"
              placeholder="PIN Code"
              value={customer.pincode}
              onChange={handleChange}
              maxLength="6"
              inputMode="numeric"
              autoComplete="postal-code"
            />
          </div>

          <h2>Payment Method</h2>

          <label>
            <input
              type="radio"
              name="payment"
              value="COD"
              checked={
                payment === "COD"
              }
              onChange={(event) =>
                setPayment(
                  event.target.value
                )
              }
            />

            Cash on Delivery
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="UPI"
              checked={
                payment === "UPI"
              }
              onChange={(event) =>
                setPayment(
                  event.target.value
                )
              }
            />

            UPI Payment
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="CARD"
              checked={
                payment === "CARD"
              }
              onChange={(event) =>
                setPayment(
                  event.target.value
                )
              }
            />

            Credit / Debit Card
          </label>

          <div className="payment-card">
            <h4>
              🔒 Secure Checkout
            </h4>

            <p>
              Your account is
              authenticated with Firebase
              Authentication.
            </p>

            <p>
              This is a demo e-commerce
              project. No real online
              payment is processed.
            </p>
          </div>
        </form>

        <aside className="checkout-right">
          <h2>Order Summary</h2>

          <div className="summary-box">
            <p>
              <span>Items</span>

              <span>
                {cartItems.reduce(
                  (
                    count,
                    item
                  ) =>
                    count +
                    Math.max(
                      1,
                      Number(
                        item.quantity
                      ) || 1
                    ),
                  0
                )}
              </span>
            </p>

            <p>
              <span>
                Subtotal
              </span>

              <span>
                ₹
                {subtotal.toLocaleString(
                  "en-IN"
                )}
              </span>
            </p>

            <p>
              <span>
                Discount
              </span>

              <span className="green">
                - ₹
                {finalDiscount.toLocaleString(
                  "en-IN"
                )}
              </span>
            </p>

            <p>
              <span>
                Shipping
              </span>

              <span
                className={
                  shipping === 0
                    ? "green"
                    : ""
                }
              >
                {shipping === 0
                  ? "FREE"
                  : `₹${shipping.toLocaleString(
                      "en-IN"
                    )}`}
              </span>
            </p>

            <hr />

            <h3>
              <span>Total</span>

              <span>
                ₹
                {total.toLocaleString(
                  "en-IN"
                )}
              </span>
            </h3>
          </div>

          <div className="coupon-box">
            <input
              type="text"
              placeholder="Coupon code"
              value={coupon}
              onChange={(event) =>
                setCoupon(
                  event.target.value
                )
              }
            />

            <button
              type="button"
              onClick={applyCoupon}
            >
              Apply
            </button>
          </div>

          {couponMessage && (
            <p>{couponMessage}</p>
          )}

          <button
            type="button"
            className="place-order-btn"
            onClick={
              handlePlaceOrder
            }
            disabled={
              isSubmitting
            }
          >
            {isSubmitting
              ? "Placing Order..."
              : "Place Order"}
          </button>
        </aside>
      </div>
    </section>
  );
}

export default Checkout;