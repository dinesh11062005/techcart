function Navbar({
  setPage,
  cartCount,
  wishlistCount,
  orderCount,
  darkMode,
  toggleDarkMode
}) {
  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="logo">
        🛒 <span>TechCart</span>
      </div>

      {/* Navigation */}
      <div className="nav-links">

        <button
          className="nav-button"
          onClick={() => setPage("home")}
        >
          🏠 Home
        </button>

        <button
          className="nav-button"
          onClick={() => setPage("products")}
        >
          🛍️ Products
        </button>

        <button
          className="nav-button"
          onClick={() => setPage("wishlist")}
        >
          ❤️ Wishlist
          <span className="nav-count">
            ({wishlistCount})
          </span>
        </button>

        <button
          className="nav-button"
          onClick={() => setPage("cart")}
        >
          🛒 Cart
          <span className="nav-count">
            ({cartCount})
          </span>
        </button>

        <button
          className="nav-button"
          onClick={() => setPage("orders")}
        >
          📦 Orders
          <span className="nav-count">
            ({orderCount})
          </span>
        </button>

        {/* Dark / Light mode */}
        <button
          className="theme-button"
          onClick={toggleDarkMode}
          title="Change theme"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

      </div>

    </nav>
  );
}

export default Navbar;