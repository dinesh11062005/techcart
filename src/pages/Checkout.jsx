import { useState } from "react";

function Checkout({ cart, placeOrder }) {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [payment, setPayment] =
    useState("Cash on Delivery");

  const [errors, setErrors] = useState({});

  // =========================
  // CALCULATE TOTAL
  // =========================

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  // =========================
  // VALIDATION
  // =========================

  function validateForm() {

    const newErrors = {};

    // Name
    if (name.trim() === "") {
      newErrors.name =
        "Please enter your name";
    } else if (name.trim().length < 3) {
      newErrors.name =
        "Name must contain at least 3 characters";
    }

    // Phone
    if (phone.trim() === "") {
      newErrors.phone =
        "Please enter your phone number";
    } else if (!/^[0-9]{10}$/.test(phone)) {
      newErrors.phone =
        "Phone number must contain 10 digits";
    }

    // Address
    if (address.trim() === "") {
      newErrors.address =
        "Please enter your address";
    } else if (address.trim().length < 10) {
      newErrors.address =
        "Please enter a complete address";
    }

    // Pincode
    if (pincode.trim() === "") {
      newErrors.pincode =
        "Please enter your pincode";
    } else if (!/^[0-9]{6}$/.test(pincode)) {
      newErrors.pincode =
        "Pincode must contain 6 digits";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  // =========================
  // SUBMIT
  // =========================

  function handleSubmit(event) {

    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    const orderDetails = {
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      pincode: pincode.trim(),
      payment,
      total,
      items: cart
    };

    placeOrder(orderDetails);
  }

  return (
    <div className="checkout-page">

      <div className="checkout-container">

        <h1>
          Checkout 🛒
        </h1>

        <form
          onSubmit={handleSubmit}
        >

          {/* =========================
              NAME
          ========================= */}

          <div className="form-group">

            <label>
              Full Name
            </label>

            <input
              type="text"
              value={name}
              placeholder="Enter your full name"
              onChange={(e) =>
                setName(e.target.value)
              }
            />

            {errors.name && (
              <p className="error-message">
                {errors.name}
              </p>
            )}

          </div>

          {/* =========================
              PHONE
          ========================= */}

          <div className="form-group">

            <label>
              Phone Number
            </label>

            <input
              type="text"
              value={phone}
              placeholder="Enter 10 digit phone number"
              maxLength="10"
              onChange={(e) =>
                setPhone(
                  e.target.value.replace(
                    /\D/g,
                    ""
                  )
                )
              }
            />

            {errors.phone && (
              <p className="error-message">
                {errors.phone}
              </p>
            )}

          </div>

          {/* =========================
              ADDRESS
          ========================= */}

          <div className="form-group">

            <label>
              Delivery Address
            </label>

            <textarea
              value={address}
              placeholder="Enter your complete address"
              rows="4"
              onChange={(e) =>
                setAddress(
                  e.target.value
                )
              }
            />

            {errors.address && (
              <p className="error-message">
                {errors.address}
              </p>
            )}

          </div>

          {/* =========================
              PINCODE
          ========================= */}

          <div className="form-group">

            <label>
              Pincode
            </label>

            <input
              type="text"
              value={pincode}
              placeholder="Enter 6 digit pincode"
              maxLength="6"
              onChange={(e) =>
                setPincode(
                  e.target.value.replace(
                    /\D/g,
                    ""
                  )
                )
              }
            />

            {errors.pincode && (
              <p className="error-message">
                {errors.pincode}
              </p>
            )}

          </div>

          {/* =========================
              PAYMENT
          ========================= */}

          <div className="form-group">

            <label>
              Payment Method
            </label>

            <select
              value={payment}
              onChange={(e) =>
                setPayment(
                  e.target.value
                )
              }
            >

              <option>
                Cash on Delivery
              </option>

              <option>
                UPI
              </option>

              <option>
                Card
              </option>

            </select>

          </div>

          {/* =========================
              ORDER TOTAL
          ========================= */}

          <div className="checkout-total">

            <h2>
              Order Total
            </h2>

            <h1>
              ₹{total.toFixed(2)}
            </h1>

          </div>

          {/* =========================
              PLACE ORDER
          ========================= */}

          <button
            type="submit"
            className="place-order-button"
          >
            Place Order 🎉
          </button>

        </form>

      </div>

    </div>
  );
}

export default Checkout;