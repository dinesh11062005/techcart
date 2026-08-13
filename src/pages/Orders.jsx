import { useState } from "react";

function Orders({
  orders,
  updateOrderStatus
}) {
  const [selectedOrder, setSelectedOrder] =
    useState(null);

  // =========================
  // NO ORDERS
  // =========================

  if (orders.length === 0) {
    return (
      <div className="orders-page">

        <div className="empty-orders">

          <div className="empty-orders-icon">
            📦
          </div>

          <h1>
            My Orders
          </h1>

          <h2>
            No orders found
          </h2>

          <p>
            You have not placed any
            orders yet.
          </p>

        </div>

      </div>
    );
  }

  // =========================
  // ORDER DETAILS
  // =========================

  if (selectedOrder) {
    return (
      <div className="orders-page">

        <button
          className="back-orders-button"
          onClick={() =>
            setSelectedOrder(null)
          }
        >
          ← Back to Orders
        </button>


        <div className="order-details">

          {/* HEADER */}

          <div className="order-details-header">

            <div>

              <p className="order-label">
                Order ID
              </p>

              <h1>
                {selectedOrder.orderId}
              </h1>

            </div>

            <span className="order-status">
              {selectedOrder.status}
            </span>

          </div>


          {/* ORDER INFORMATION */}

          <div className="order-details-grid">

            <div>
              <span>
                📅 Order Date
              </span>

              <strong>
                {selectedOrder.orderDate}
              </strong>
            </div>

            <div>
              <span>
                💳 Payment
              </span>

              <strong>
                {selectedOrder.payment}
              </strong>
            </div>

            <div>
              <span>
                👤 Name
              </span>

              <strong>
                {selectedOrder.name}
              </strong>
            </div>

            <div>
              <span>
                📞 Phone
              </span>

              <strong>
                {selectedOrder.phone}
              </strong>
            </div>

            <div className="full-width-detail">
              <span>
                📍 Address
              </span>

              <strong>
                {selectedOrder.address}
              </strong>
            </div>

            <div>
              <span>
                📮 Pincode
              </span>

              <strong>
                {selectedOrder.pincode}
              </strong>
            </div>

            <div>
              <span>
                💰 Total
              </span>

              <strong className="order-total">
                ₹
                {selectedOrder.total.toFixed(
                  2
                )}
              </strong>
            </div>

          </div>


          {/* PRODUCTS */}

          <div className="ordered-products-section">

            <h2>
              🛍️ Products
            </h2>

            <div className="ordered-products">

              {selectedOrder.items.map(
                (item) => (

                  <div
                    className="ordered-product"
                    key={item.id}
                  >

                    <img
                      src={
                        item.thumbnail
                      }
                      alt={
                        item.title
                      }
                    />

                    <div className="ordered-product-info">

                      <h4>
                        {item.title}
                      </h4>

                      <p>
                        Quantity:{" "}
                        {item.quantity}
                      </p>

                      <p>
                        Price: ₹
                        {item.price}
                      </p>

                      <strong>
                        Product Total: ₹
                        {(
                          item.price *
                          item.quantity
                        ).toFixed(2)}
                      </strong>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      </div>
    );
  }

  // =========================
  // ORDERS LIST
  // =========================

  return (
    <div className="orders-page">

      {/* PAGE HEADER */}

      <div className="orders-header">

        <div>

          <h1>
            My Orders 📦
          </h1>

          <p>
            {orders.length}{" "}
            {orders.length === 1
              ? "order"
              : "orders"}{" "}
            placed
          </p>

        </div>

      </div>


      {/* ORDERS */}

      <div className="orders-container">

        {orders
          .slice()
          .reverse()
          .map((order) => (

            <div
              className="order-card"
              key={order.orderId}
            >

              {/* ORDER HEADER */}

              <div className="order-card-header">

                <div>

                  <span className="order-label">
                    Order ID
                  </span>

                  <h2>
                    {order.orderId}
                  </h2>

                </div>

                <span className="order-status">
                  {order.status}
                </span>

              </div>


              {/* ORDER INFORMATION */}

              <div className="order-card-info">

                <div>

                  <span>
                    📅 Date
                  </span>

                  <strong>
                    {order.orderDate}
                  </strong>

                </div>

                <div>

                  <span>
                    💳 Payment
                  </span>

                  <strong>
                    {order.payment}
                  </strong>

                </div>

                <div>

                  <span>
                    💰 Total
                  </span>

                  <strong className="order-total">
                    ₹
                    {order.total.toFixed(
                      2
                    )}
                  </strong>

                </div>

              </div>


              {/* STATUS BUTTONS */}

              <div className="status-section">

                <p>
                  Update Order Status
                </p>

                <div className="status-buttons">

                  <button
                    className="confirmed-button"
                    onClick={() =>
                      updateOrderStatus(
                        order.orderId,
                        "Confirmed"
                      )
                    }
                  >
                    ✅ Confirmed
                  </button>

                  <button
                    className="shipped-button"
                    onClick={() =>
                      updateOrderStatus(
                        order.orderId,
                        "Shipped"
                      )
                    }
                  >
                    🚚 Shipped
                  </button>

                  <button
                    className="delivered-button"
                    onClick={() =>
                      updateOrderStatus(
                        order.orderId,
                        "Delivered"
                      )
                    }
                  >
                    📦 Delivered
                  </button>

                </div>

              </div>


              {/* VIEW ORDER */}

              <button
                className="view-order-button"
                onClick={() =>
                  setSelectedOrder(
                    order
                  )
                }
              >
                View Order →
              </button>

            </div>

          ))}

      </div>

    </div>
  );
}

export default Orders;