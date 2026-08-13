function Wishlist({
  wishlist,
  removeFromWishlist,
  addToCart
}) {

  // =========================
  // EMPTY WISHLIST
  // =========================

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page">

        <div className="empty-wishlist">

          <div className="empty-icon">
            ❤️
          </div>

          <h1>
            My Wishlist
          </h1>

          <h2>
            Your wishlist is empty
          </h2>

          <p>
            Save your favourite products
            here and come back later.
          </p>

        </div>

      </div>
    );
  }

  // =========================
  // WISHLIST
  // =========================

  return (
    <div className="wishlist-page">

      <div className="wishlist-header">

        <div>
          <h1>
            My Wishlist ❤️
          </h1>

          <p>
            {wishlist.length}{" "}
            {wishlist.length === 1
              ? "product"
              : "products"}{" "}
            saved
          </p>
        </div>

      </div>


      {/* =========================
          WISHLIST PRODUCTS
      ========================= */}

      <div className="wishlist-container">

        {wishlist.map((product) => (

          <div
            className="wishlist-card"
            key={product.id}
          >

            {/* PRODUCT IMAGE */}

            <div className="wishlist-image">

              <img
                src={product.thumbnail}
                alt={product.title}
              />

            </div>


            {/* PRODUCT INFORMATION */}

            <div className="wishlist-info">

              <h3>
                {product.title}
              </h3>

              <p className="wishlist-price">
                ₹{product.price}
              </p>

              <p className="wishlist-rating">
                ⭐ {product.rating}
              </p>

            </div>


            {/* BUTTONS */}

            <div className="wishlist-actions">

              <button
                className="wishlist-cart-button"
                onClick={() =>
                  addToCart(product)
                }
              >
                🛒 Add to Cart
              </button>

              <button
                className="wishlist-remove-button"
                onClick={() =>
                  removeFromWishlist(
                    product.id
                  )
                }
              >
                ❤️ Remove
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Wishlist;