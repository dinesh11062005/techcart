import { useEffect, useState } from "react";
import { getProducts } from "../services/api";

function Products({
  addToCart,
  toggleWishlist,
  wishlist,
  selectedCategory,
  setSelectedCategory
}) {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [sort, setSort] = useState("default");

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  // =========================
  // PRICE FILTER
  // =========================

  const [maxPrice, setMaxPrice] = useState(2000);

  // =========================
  // PAGINATION
  // =========================

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 12;

  // =========================
  // GET PRODUCTS
  // =========================

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);

        if (data.length > 0) {
          const highestPrice = Math.max(
            ...data.map(
              (product) => product.price
            )
          );

          setMaxPrice(
            Math.ceil(highestPrice)
          );
        }

        setLoading(false);
      })
      .catch(() => {
        setError(
          "Unable to load products. Please try again."
        );

        setLoading(false);
      });
  }, []);

  // =========================
  // FILTER PRODUCTS
  // =========================

  let filteredProducts =
    products.filter((product) => {

      const categoryMatch =
        selectedCategory === "all" ||
        product.category ===
          selectedCategory;

      const searchMatch =
        product.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const priceMatch =
        product.price <= maxPrice;

      return (
        categoryMatch &&
        searchMatch &&
        priceMatch
      );
    });

  // =========================
  // SORT
  // =========================

  if (sort === "lowToHigh") {
    filteredProducts =
      [...filteredProducts].sort(
        (a, b) =>
          a.price - b.price
      );
  }

  if (sort === "highToLow") {
    filteredProducts =
      [...filteredProducts].sort(
        (a, b) =>
          b.price - a.price
      );
  }

  if (sort === "rating") {
    filteredProducts =
      [...filteredProducts].sort(
        (a, b) =>
          b.rating - a.rating
      );
  }

  // =========================
  // RESET PAGE
  // =========================

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    selectedCategory,
    sort,
    maxPrice
  ]);

  // =========================
  // PAGINATION
  // =========================

  const totalPages = Math.ceil(
    filteredProducts.length /
      productsPerPage
  );

  const lastIndex =
    currentPage * productsPerPage;

  const firstIndex =
    lastIndex - productsPerPage;

  const currentProducts =
    filteredProducts.slice(
      firstIndex,
      lastIndex
    );

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="products-page">

        <div className="loading-box">
          <h2>
            Loading products...
          </h2>

          <p>
            Please wait while we
            fetch the products.
          </p>
        </div>

      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <div className="products-page">

        <div className="error-box">
          <h2>
            Something went wrong
          </h2>

          <p>
            {error}
          </p>

        </div>

      </div>
    );
  }

  // =========================
  // PRODUCT DETAILS
  // =========================

  if (selectedProduct) {

    const isWishlisted =
      wishlist.some(
        (item) =>
          item.id ===
          selectedProduct.id
      );

    return (
      <div className="product-details">

        <button
          className="back-button"
          onClick={() =>
            setSelectedProduct(null)
          }
        >
          ← Back to Products
        </button>

        <img
          src={
            selectedProduct.thumbnail
          }
          alt={
            selectedProduct.title
          }
        />

        <h1>
          {selectedProduct.title}
        </h1>

        <h2>
          ₹{selectedProduct.price}
        </h2>

        <p>
          ⭐{" "}
          {selectedProduct.rating}
        </p>

        <p>
          <strong>
            Category:
          </strong>{" "}
          {selectedProduct.category}
        </p>

        <p>
          <strong>
            Brand:
          </strong>{" "}
          {selectedProduct.brand ||
            "Not available"}
        </p>

        <p>
          {
            selectedProduct.description
          }
        </p>

        <div className="details-buttons">

          <button
            className="add-cart-button"
            onClick={() =>
              addToCart(
                selectedProduct
              )
            }
          >
            🛒 Add to Cart
          </button>

          <button
            className="wishlist-button"
            onClick={() =>
              toggleWishlist(
                selectedProduct
              )
            }
          >
            {isWishlisted
              ? "❤️ Remove from Wishlist"
              : "♡ Add to Wishlist"}
          </button>

        </div>

      </div>
    );
  }

  // =========================
  // PRODUCTS PAGE
  // =========================

  return (
    <div className="products-page">

      <h1>
        Our Products
      </h1>

      <p className="products-subtitle">
        Explore our collection of
        electronics and accessories
      </p>

      {/* =========================
          CATEGORY FILTER
      ========================= */}

      <div className="category-buttons">

        <button
          className={
            selectedCategory === "all"
              ? "active-category"
              : ""
          }
          onClick={() =>
            setSelectedCategory("all")
          }
        >
          All
        </button>

        <button
          className={
            selectedCategory ===
            "smartphones"
              ? "active-category"
              : ""
          }
          onClick={() =>
            setSelectedCategory(
              "smartphones"
            )
          }
        >
          📱 Smartphones
        </button>

        <button
          className={
            selectedCategory ===
            "laptops"
              ? "active-category"
              : ""
          }
          onClick={() =>
            setSelectedCategory(
              "laptops"
            )
          }
        >
          💻 Laptops
        </button>

        <button
          className={
            selectedCategory ===
            "tablets"
              ? "active-category"
              : ""
          }
          onClick={() =>
            setSelectedCategory(
              "tablets"
            )
          }
        >
          📲 Tablets
        </button>

        <button
          className={
            selectedCategory ===
            "mobile-accessories"
              ? "active-category"
              : ""
          }
          onClick={() =>
            setSelectedCategory(
              "mobile-accessories"
            )
          }
        >
          🎧 Accessories
        </button>

      </div>


      {/* =========================
          SEARCH
      ========================= */}

      <div className="search-bar">

        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

      </div>


      {/* =========================
          PRICE FILTER
      ========================= */}

      <div className="price-filter">

        <label>
          Maximum Price: ₹
          {maxPrice}
        </label>

        <input
          type="range"
          min="0"
          max="2000"
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(
              Number(
                e.target.value
              )
            )
          }
        />

      </div>


      {/* =========================
          SORT
      ========================= */}

      <select
        className="sort-select"
        value={sort}
        onChange={(e) =>
          setSort(
            e.target.value
          )
        }
      >

        <option value="default">
          Sort By
        </option>

        <option value="lowToHigh">
          Price: Low → High
        </option>

        <option value="highToLow">
          Price: High → Low
        </option>

        <option value="rating">
          Rating: High → Low
        </option>

      </select>


      {/* =========================
          PRODUCT COUNT
      ========================= */}

      <p className="product-count">

        Showing{" "}
        {currentProducts.length}{" "}
        of{" "}
        {filteredProducts.length}{" "}
        products

      </p>


      {/* =========================
          PRODUCT CARDS
      ========================= */}

      <div className="product-container">

        {currentProducts.map(
          (product) => {

            const isWishlisted =
              wishlist.some(
                (item) =>
                  item.id ===
                  product.id
              );

            return (
              <div
                className="product-card"
                key={product.id}
              >

                <img
                  src={
                    product.thumbnail
                  }
                  alt={
                    product.title
                  }
                />

                <h3>
                  {product.title}
                </h3>

                <p>
                  ₹{product.price}
                </p>

                <p>
                  ⭐{" "}
                  {product.rating}
                </p>


                {/* BUTTONS */}

                <div className="product-actions">

                  <button
                    onClick={() =>
                      setSelectedProduct(
                        product
                      )
                    }
                  >
                    View Product
                  </button>

                  <button
                    className="wishlist-button"
                    onClick={() =>
                      toggleWishlist(
                        product
                      )
                    }
                  >
                    {isWishlisted
                      ? "❤️"
                      : "♡"}
                  </button>

                  <button
                    className="add-cart-button"
                    onClick={() =>
                      addToCart(
                        product
                      )
                    }
                  >
                    🛒 Add to Cart
                  </button>

                </div>

              </div>
            );
          }
        )}

      </div>


      {/* =========================
          NO PRODUCTS
      ========================= */}

      {filteredProducts.length ===
        0 && (
        <div className="no-products">

          <h2>
            No products found
          </h2>

          <p>
            Try another search,
            category or price range.
          </p>

        </div>
      )}


      {/* =========================
          PAGINATION
      ========================= */}

      {totalPages > 1 && (
        <div className="pagination">

          <button
            disabled={
              currentPage === 1
            }
            onClick={() =>
              setCurrentPage(
                currentPage - 1
              )
            }
          >
            ← Previous
          </button>


          {Array.from(
            {
              length: totalPages
            },
            (_, index) => (

              <button
                key={index + 1}
                className={
                  currentPage ===
                  index + 1
                    ? "active-page"
                    : ""
                }
                onClick={() =>
                  setCurrentPage(
                    index + 1
                  )
                }
              >
                {index + 1}
              </button>

            )
          )}


          <button
            disabled={
              currentPage ===
              totalPages
            }
            onClick={() =>
              setCurrentPage(
                currentPage + 1
              )
            }
          >
            Next →
          </button>

        </div>
      )}

    </div>
  );
}

export default Products;