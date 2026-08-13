function OrderSuccess({
  order,
  setPage
}) {
  return (
    <div className="order-success">

      <div className="success-box">

        {/* =========================
            SUCCESS ICON
        ========================= */}

        <div className="success-icon">
          ✓
        </div>


        {/* =========================
            SUCCESS MESSAGE
        ========================= */}

        <h1>
          Order Placed Successfully!
        </h1>

        <p className="success-message">
          🎉 Thank you for shopping
          with TechCart.
        </p>


        {/* =========================
            ORDER ID
        ========================= */}

        <div className="order-id-box">

          <span>
            Order ID
          </span>

          <strong>
            {order.orderId}
          </strong>

        </div>


        {/* =========================
            ORDER INFORMATION
        ========================= */}

        <div className="order-info">

          <h2>
            📋 Order Details
          </h2>


          <div className="order-info-row">

            <span>
              Order Date
            </span>

            <strong>
              {order.orderDate}
            </strong>

          </div>


          <div className="order-info-row">

            <span>
              Status
            </span>

            <strong className="success-status">
              {order.status} ✅
            </strong>

          </div>


          <div className="order-info-row">

            <span>
              Name
            </span>

            <strong>
              {order.name}
            </strong>

          </div>


          <div className="order-info-row">

            <span>
              Phone
            </span>

            <strong>
              {order.phone}
            </strong>

          </div>


          <div className="order-info-row address-row">

            <span>
              Address
            </span>

            <strong>
              {order.address}
            </strong>

          </div>


          <div className="order-info-row">

            <span>
              Pincode
            </span>

            <strong>
              {order.pincode}
            </strong>

          </div>


          <div className="order-info-row">

            <span>
              Payment
            </span>

            <strong>
              {order.payment}
            </strong>

          </div>


          <div className="order-info-row total-row">

            <span>
              Total
            </span>

            <strong>
              ₹{order.total.toFixed(2)}
            </strong>

          </div>

        </div>


        {/* =========================
            ACTION BUTTONS
        ========================= */}

        <div className="success-actions">

          <button
            className="view-orders-button"
            onClick={() =>
              setPage("orders")
            }
          >
            📦 View My Orders
          </button>

          <button
            className="continue-shopping-button"
            onClick={() =>
              setPage("products")
            }
          >
            🛍️ Continue Shopping
          </button>

        </div>

      </div>

    </div>
  );
}

export default OrderSuccess;