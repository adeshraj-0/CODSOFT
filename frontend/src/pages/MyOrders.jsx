import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import "../styles/MyOrders.css";

function MyOrders({ user }) {
  const [orders, setOrders] = useState([]);

  const [ordersLoading, setOrdersLoading] =
    useState(true);

  const [ordersError, setOrdersError] =
    useState("");

  const [cancellingOrderId, setCancellingOrderId] =
    useState(null);

  useEffect(() => {
    if (!user) {
      setOrdersLoading(false);

      return;
    }

    const fetchOrders = async () => {
      try {
        setOrdersLoading(true);

        setOrdersError("");

        const ordersQuery = query(
          collection(db, "orders"),
          where("userId", "==", user.uid)
        );

        const querySnapshot = await getDocs(
          ordersQuery
        );

        const userOrders =
          querySnapshot.docs.map((document) => ({
            firestoreId: document.id,
            ...document.data(),
          }));

        userOrders.sort(
          (firstOrder, secondOrder) => {
            const firstDate =
              firstOrder.createdAt?.toMillis?.() ||
              new Date(
                firstOrder.orderDate || 0
              ).getTime();

            const secondDate =
              secondOrder.createdAt?.toMillis?.() ||
              new Date(
                secondOrder.orderDate || 0
              ).getTime();

            return secondDate - firstDate;
          }
        );

        setOrders(userOrders);
      } catch (error) {
        console.error(
          "Orders fetch failed:",
          error
        );

        setOrdersError(
          "Unable to load your orders. Please try again."
        );
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const formatDate = (order) => {
    const date =
      order.createdAt?.toDate?.() ||
      new Date(order.orderDate);

    if (
      !date ||
      Number.isNaN(date.getTime())
    ) {
      return "Date unavailable";
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleCancelOrder = async (order) => {
    if (cancellingOrderId) {
      return;
    }

    if (
      order.orderStatus === "Cancelled"
    ) {
      return;
    }

    const shouldCancel = window.confirm(
      `Are you sure you want to cancel order ${order.orderId}?`
    );

    if (!shouldCancel) {
      return;
    }

    try {
      setCancellingOrderId(
        order.firestoreId
      );

      const orderReference = doc(
        db,
        "orders",
        order.firestoreId
      );

      await updateDoc(orderReference, {
        orderStatus: "Cancelled",
        cancelledAt: serverTimestamp(),
      });

      setOrders((previousOrders) =>
        previousOrders.map(
          (savedOrder) =>
            savedOrder.firestoreId ===
            order.firestoreId
              ? {
                  ...savedOrder,
                  orderStatus: "Cancelled",
                }
              : savedOrder
        )
      );
    } catch (error) {
      console.error(
        "Order cancellation failed:",
        error
      );

      alert(
        "Unable to cancel this order. Please try again."
      );
    } finally {
      setCancellingOrderId(null);
    }
  };

  if (ordersLoading) {
    return (
      <section className="orders-page">
        <div className="orders-container">
          <div className="orders-state">
            <div className="orders-loader" />

            <h2>Loading your orders...</h2>

            <p>
              Fetching your order history securely.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="orders-page">
      <div className="orders-container">
        <div className="orders-header">
          <div>
            <h1>My Orders</h1>

            <p>
              View and track your Origin Store
              purchases.
            </p>
          </div>

          <span className="orders-count">
            {orders.length}{" "}
            {orders.length === 1
              ? "Order"
              : "Orders"}
          </span>
        </div>

        {ordersError ? (
          <div className="orders-state">
            <h2>Unable to load orders</h2>

            <p>{ordersError}</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="orders-state">
            <div className="orders-empty-icon">
              📦
            </div>

            <h2>No orders yet</h2>

            <p>
              Your completed orders will appear
              here.
            </p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => {
              const isCancelled =
                order.orderStatus === "Cancelled";

              const isCancelling =
                cancellingOrderId ===
                order.firestoreId;

              return (
                <article
                  className={`order-card ${
                    isCancelled
                      ? "cancelled-order-card"
                      : ""
                  }`}
                  key={order.firestoreId}
                >
                  <div className="order-card-header">
                    <div>
                      <span className="order-label">
                        Order ID
                      </span>

                      <h2>{order.orderId}</h2>
                    </div>

                    <span
                      className={`order-status ${
                        isCancelled
                          ? "order-status-cancelled"
                          : ""
                      }`}
                    >
                      {order.orderStatus ||
                        "Confirmed"}
                    </span>
                  </div>

                  <div className="order-meta">
                    <div>
                      <span>Order Date</span>

                      <strong>
                        {formatDate(order)}
                      </strong>
                    </div>

                    <div>
                      <span>Items</span>

                      <strong>
                        {order.itemCount || 0}
                      </strong>
                    </div>

                    <div>
                      <span>Payment</span>

                      <strong>
                        {order.paymentMethod ||
                          "N/A"}
                      </strong>
                    </div>

                    <div>
                      <span>Total</span>

                      <strong>
                        ₹
                        {Number(
                          order.total || 0
                        ).toLocaleString("en-IN")}
                      </strong>
                    </div>
                  </div>

                  <div className="order-products">
                    {(order.items || []).map(
                      (item, index) => (
                        <div
                          className="order-product"
                          key={`${order.firestoreId}-${item.id}-${index}`}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                          />

                          <div>
                            <h3>{item.name}</h3>

                            <p>
                              Qty: {item.quantity}
                            </p>
                          </div>

                          <strong>
                            ₹
                            {Number(
                              item.itemTotal || 0
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </strong>
                        </div>
                      )
                    )}
                  </div>

                  <div className="order-card-footer">
                    <div>
                      <span>Invoice</span>

                      <strong>
                        {order.invoiceNo}
                      </strong>
                    </div>

                    <div>
                      <span>Payment Status</span>

                      <strong>
                        {order.paymentStatus ||
                          "Pending"}
                      </strong>
                    </div>

                    {!isCancelled && (
                      <button
                        type="button"
                        className="cancel-order-btn"
                        onClick={() =>
                          handleCancelOrder(order)
                        }
                        disabled={isCancelling}
                      >
                        {isCancelling
                          ? "Cancelling..."
                          : "Cancel Order"}
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default MyOrders;