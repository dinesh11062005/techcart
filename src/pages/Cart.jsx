import { useState } from "react";

function Cart({
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  setPage
}) {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] =
    useState("");

  // =========================
  // EMPTY CART
  // =========================

  if (cart.length === 0) {
    return (
      <div className="cart-page">

        <div className="empty-cart">

          <div className="empty-cart-icon">
            🛒
          </div>

          <h1>
            Your Cart is Empty
          </h1>

          <p>
            You haven't added any products
            to your cart yet.
          </p>

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
    );
  }

  // =========================
  // SUBTOTAL
  // =========================

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0
  );

  // =========================
  // DELIVERY
  // =========================

  const deliveryCharge =
    subtotal >= 1000 ? 0 : 50;

  // =========================
  // DISCOUNT
  // =========================

  const discountAmount =
    (subtotal * discount) / 100;

  // =========================
  // FINAL TOTAL
  // =========================

  const finalTotal =
    subtotal +
    deliveryCharge -
    discountAmount;

  // =========================
  // APPLY COUPON
  // =========================

  function applyCoupon() {
    if (
      coupon.trim().toUpperCase() ===
      "SAVE10"
    ) {
      setDiscount(10);

      setCouponMessage(
        "Coupon applied! You got 10% off 🎉"
      );
    } else {
      setDiscount(0);

      setCouponMessage(
        "Invalid coupon code ❌"
      );
    }
  }

  // =========================
  // CLEAR CART
  // =========================

  function clearCart() {
    const confirmClear = window.confirm(
      "Are you sure you want to remove all products from your cart?"
    );

    if (confirmClear) {

      cart.forEach((item) => {
        removeFromCart(item.id);
      });

      setCoupon("");
      setDiscount(0);
      setCouponMessage("");
    }
  }

  return (
    <div className="cart-page">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="cart-title-section">

        <div>
          <h1>
            Your Cart 🛒
          </h1>

          <p>
            {cart.length}{" "}
            {cart.length === 1
              ? "product"
              : "products"}{" "}
            in your cart
          </p>
        </div>

        <button
          className="clear-cart-button"
          onClick={clearCart}
        >
          🗑️ Clear Cart
        </button>

      </div>


      {/* =========================
          MAIN CART LAYOUT
      ========================= */}

      <div className="cart-layout">

        {/* =========================
            PRODUCTS
        ========================= */}

        <div className="cart-products">

          {cart.map((item) => (

            <div
              className="cart-item"
              key={item.id}
            >

              {/* IMAGE */}

              <div className="cart-product-image">

                <img
                  src={item.thumbnail}
                  alt={item.title}
                />

              </div>


              {/* INFORMATION */}

              <div className="cart-item-info">

                <h2>
                  {item.title}
                </h2>

                <p className="cart-product-price">
                  ₹{item.price}
                </p>


                {/* QUANTITY */}

                <div className="quantity-section">

                  <span>
                    Quantity
                  </span>

                  <div className="quantity-controls">

                    <button
                      onClick={() =>
                        decreaseQuantity(
                          item.id
                        )
                      }
                    >
                      −
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.id
                        )
                      }
                    >
                      +
                    </button>

                  </div>

                </div>


                {/* PRODUCT TOTAL */}

                <p className="product-total">

                  Product Total:
                  <strong>
                    {" "}₹
                    {(
                      item.price *
                      item.quantity
                    ).toFixed(2)}
                  </strong>

                </p>


                {/* REMOVE */}

                <button
                  className="remove-button"
                  onClick={() =>
                    removeFromCart(
                      item.id
                    )
                  }
                >
                  🗑️ Remove
                </button>

              </div>

            </div>

          ))}

        </div>


        {/* =========================
            ORDER SUMMARY
        ========================= */}

        <div className="cart-summary">

          <h2>
            Order Summary
          </h2>

          {/* SUBTOTAL */}

          <div className="summary-row">

            <span>
              Subtotal
            </span>

            <span>
              ₹{subtotal.toFixed(2)}
            </span>

          </div>


          {/* DELIVERY */}

          <div className="summary-row">

            <span>
              Delivery
            </span>

            <span
              className={
                deliveryCharge === 0
                  ? "free-delivery"
                  : ""
              }
            >
              {deliveryCharge === 0
                ? "FREE"
                : `₹${deliveryCharge}`}
            </span>

          </div>


          {/* DISCOUNT */}

          <div className="summary-row">

            <span>
              Discount
            </span>

            <span className="discount-value">
              - ₹
              {discountAmount.toFixed(2)}
            </span>

          </div>


          <hr />


          {/* FINAL TOTAL */}

          <div className="summary-total">

            <span>
              Final Total
            </span>

            <strong>
              ₹{finalTotal.toFixed(2)}
            </strong>

          </div>


          {/* =========================
              COUPON
          ========================= */}

          <div className="coupon-section">

            <h3>
              Have a Coupon? 🎟️
            </h3>

            <div className="coupon-input-group">

              <input
                type="text"
                placeholder="Enter coupon code"
                value={coupon}
                onChange={(e) =>
                  setCoupon(
                    e.target.value
                  )
                }
              />

              <button
                onClick={applyCoupon}
              >
                Apply
              </button>

            </div>

            {couponMessage && (
              <p
                className={
                  discount > 0
                    ? "coupon-success"
                    : "coupon-error"
                }
              >
                {couponMessage}
              </p>
            )}

            <small>
              Try code: <strong>SAVE10</strong>
            </small>

          </div>


          {/* =========================
              CHECKOUT
          ========================= */}

          <button
            className="checkout-button"
            onClick={() =>
              setPage("checkout")
            }
          >
            Proceed to Checkout →
          </button>

        </div>

      </div>

    </div>
  );
}

export default Cart;