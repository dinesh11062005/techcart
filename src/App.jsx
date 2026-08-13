import { useEffect, useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";
import Footer from "./components/Footer";

function App() {

  // =========================
  // CURRENT PAGE
  // =========================

  const [page, setPage] = useState("home");


  // =========================
  // CATEGORY
  // =========================

  const [selectedCategory, setSelectedCategory] =
    useState("all");

  function openCategory(category) {
    setSelectedCategory(category);
    setPage("products");
  }


  // =========================
  // DARK MODE
  // =========================

  const [darkMode, setDarkMode] = useState(() => {

    const savedMode =
      localStorage.getItem("darkMode");

    return savedMode === "true";

  });

  useEffect(() => {

    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    );

  }, [darkMode]);


  function toggleDarkMode() {

    setDarkMode(
      (currentMode) => !currentMode
    );

  }


  // =========================
  // CART
  // =========================

  const [cart, setCart] = useState(() => {

    const savedCart =
      localStorage.getItem("cart");

    return savedCart
      ? JSON.parse(savedCart)
      : [];

  });


  useEffect(() => {

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

  }, [cart]);


  // =========================
  // ADD TO CART
  // =========================

  function addToCart(product) {

    setCart((currentCart) => {

      const existingProduct =
        currentCart.find(
          (item) =>
            item.id === product.id
        );

      if (existingProduct) {

        return currentCart.map(
          (item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity:
                    item.quantity + 1
                }
              : item
        );

      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1
        }
      ];

    });

  }


  // =========================
  // REMOVE FROM CART
  // =========================

  function removeFromCart(id) {

    setCart((currentCart) =>
      currentCart.filter(
        (item) =>
          item.id !== id
      )
    );

  }


  // =========================
  // INCREASE QUANTITY
  // =========================

  function increaseQuantity(id) {

    setCart((currentCart) =>
      currentCart.map(
        (item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  item.quantity + 1
              }
            : item
      )
    );

  }


  // =========================
  // DECREASE QUANTITY
  // =========================

  function decreaseQuantity(id) {

    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  item.quantity - 1
              }
            : item
        )
        .filter(
          (item) =>
            item.quantity > 0
        )
    );

  }


  // =========================
  // WISHLIST
  // =========================

  const [wishlist, setWishlist] =
    useState(() => {

      const savedWishlist =
        localStorage.getItem(
          "wishlist"
        );

      return savedWishlist
        ? JSON.parse(savedWishlist)
        : [];

    });


  useEffect(() => {

    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );

  }, [wishlist]);


  // =========================
  // TOGGLE WISHLIST
  // =========================

  function toggleWishlist(product) {

    setWishlist(
      (currentWishlist) => {

        const exists =
          currentWishlist.some(
            (item) =>
              item.id === product.id
          );

        if (exists) {

          return currentWishlist.filter(
            (item) =>
              item.id !== product.id
          );

        }

        return [
          ...currentWishlist,
          product
        ];

      }
    );

  }


  // =========================
  // REMOVE FROM WISHLIST
  // =========================

  function removeFromWishlist(id) {

    setWishlist(
      (currentWishlist) =>
        currentWishlist.filter(
          (item) =>
            item.id !== id
        )
    );

  }


  // =========================
  // ORDERS
  // =========================

  const [orders, setOrders] =
    useState(() => {

      const savedOrders =
        localStorage.getItem(
          "orders"
        );

      return savedOrders
        ? JSON.parse(savedOrders)
        : [];

    });


  useEffect(() => {

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

  }, [orders]);


  // =========================
  // CURRENT ORDER
  // =========================

  const [order, setOrder] =
    useState(null);


  // =========================
  // PLACE ORDER
  // =========================

  function placeOrder(orderDetails) {

    const newOrder = {

      ...orderDetails,

      orderId:
        "TC" + Date.now(),

      status:
        "Confirmed",

      orderDate:
        new Date().toLocaleDateString()

    };


    setOrder(newOrder);


    setOrders(
      (currentOrders) => [
        ...currentOrders,
        newOrder
      ]
    );


    setCart([]);


    setPage(
      "orderSuccess"
    );

  }


  // =========================
  // UPDATE ORDER STATUS
  // =========================

  function updateOrderStatus(
    orderId,
    newStatus
  ) {

    setOrders(
      (currentOrders) =>
        currentOrders.map(
          (order) =>
            order.orderId ===
            orderId
              ? {
                  ...order,
                  status:
                    newStatus
                }
              : order
        )
    );


    setOrder(
      (currentOrder) => {

        if (
          currentOrder &&
          currentOrder.orderId ===
            orderId
        ) {

          return {
            ...currentOrder,
            status:
              newStatus
          };

        }

        return currentOrder;

      }
    );

  }


  // =========================
  // DISPLAY
  // =========================

  return (

    <div
      className={
        darkMode
          ? "app dark"
          : "app"
      }
    >

      {/* =========================
          NAVBAR
      ========================= */}

      <Navbar
        setPage={setPage}

        cartCount={
          cart.reduce(
            (total, item) =>
              total + item.quantity,
            0
          )
        }

        wishlistCount={
          wishlist.length
        }

        orderCount={
          orders.length
        }

        darkMode={darkMode}

        toggleDarkMode={
          toggleDarkMode
        }
      />


      {/* =========================
          HOME
      ========================= */}

      {page === "home" && (
        <Home
          openCategory={
            openCategory
          }
        />
      )}


      {/* =========================
          PRODUCTS
      ========================= */}

      {page === "products" && (
        <Products
          addToCart={
            addToCart
          }

          toggleWishlist={
            toggleWishlist
          }

          wishlist={
            wishlist
          }

          selectedCategory={
            selectedCategory
          }

          setSelectedCategory={
            setSelectedCategory
          }
        />
      )}


      {/* =========================
          CART
      ========================= */}

      {page === "cart" && (
        <Cart
          cart={cart}

          removeFromCart={
            removeFromCart
          }

          increaseQuantity={
            increaseQuantity
          }

          decreaseQuantity={
            decreaseQuantity
          }

          setPage={
            setPage
          }
        />
      )}


      {/* =========================
          WISHLIST
      ========================= */}

      {page === "wishlist" && (
        <Wishlist
          wishlist={
            wishlist
          }

          removeFromWishlist={
            removeFromWishlist
          }

          addToCart={
            addToCart
          }
        />
      )}


      {/* =========================
          CHECKOUT
      ========================= */}

      {page === "checkout" && (
        <Checkout
          cart={cart}

          placeOrder={
            placeOrder
          }
        />
      )}


      {/* =========================
          ORDER SUCCESS
      ========================= */}

      {page === "orderSuccess" &&
        order && (
          <OrderSuccess
            order={order}

            setPage={
              setPage
            }
          />
        )}


      {/* =========================
          ORDERS
      ========================= */}

      {page === "orders" && (
        <Orders
          orders={
            orders
          }

          updateOrderStatus={
            updateOrderStatus
          }
        />
      )}


      {/* =========================
          FOOTER
      ========================= */}

      <Footer />

    </div>

  );
}

export default App;