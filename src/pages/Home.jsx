function Home({ openCategory }) {
  return (
    <div className="home">

      {/* =========================
          HERO SECTION
      ========================= */}

      <section className="hero">

        <h1>
          Welcome to TechCart 🛒
        </h1>

        <p>
          Discover the latest smartphones, laptops,
          tablets and accessories at TechCart.
        </p>

        <button
          onClick={() =>
            openCategory("all")
          }
        >
          Explore Products →
        </button>

      </section>


      {/* =========================
          CATEGORY SECTION
      ========================= */}

      <section className="categories">

        <h2>
          Shop by Category
        </h2>

        <div className="category-container">

          {/* SMARTPHONES */}

          <div
            className="category-card"
            onClick={() =>
              openCategory("smartphones")
            }
          >

            <div className="category-icon">
              📱
            </div>

            <h3>
              Smartphones
            </h3>

          </div>


          {/* LAPTOPS */}

          <div
            className="category-card"
            onClick={() =>
              openCategory("laptops")
            }
          >

            <div className="category-icon">
              💻
            </div>

            <h3>
              Laptops
            </h3>

          </div>


          {/* TABLETS */}

          <div
            className="category-card"
            onClick={() =>
              openCategory("tablets")
            }
          >

            <div className="category-icon">
              📲
            </div>

            <h3>
              Tablets
            </h3>

          </div>


          {/* ACCESSORIES */}

          <div
            className="category-card"
            onClick={() =>
              openCategory(
                "mobile-accessories"
              )
            }
          >

            <div className="category-icon">
              🎧
            </div>

            <h3>
              Accessories
            </h3>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;