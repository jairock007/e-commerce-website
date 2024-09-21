import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());
  useEffect(() => {
    fetch("https://e-commerce-website-gtm9.vercel.app/api/allproducts")
      .then((response) => response.json())
      .then((data) => setAll_Product(data))
      .catch((error) => console.error("Error fetching products:", error));

    if (localStorage.getItem("auth-token")) {
      fetch("https://e-commerce-website-gtm9.vercel.app/api/getcart", {
        method: "POST",
        headers: {
          "Accept": "application/json", // Ensure this matches the format you expect
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => setCartItems(data))
        .catch((error) => console.error("Error fetching cart:", error));
    }
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const currentQuantity = prev[itemId] || 0; // If prev[itemId] is undefined, default to 0
      return { ...prev, [itemId]: currentQuantity + 1 };
    });

    if (localStorage.getItem("auth-token")) {
      fetch("https://e-commerce-website-gtm9.vercel.app/api/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/json", // Corrected 'Accept' header
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error:", error));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const currentQuantity = prev[itemId] || 0; // If prev[itemId] is undefined, default to 0
      return { ...prev, [itemId]: currentQuantity > 0 ? currentQuantity - 1 : 0 };
    });

    if (localStorage.getItem("auth-token")) {
      fetch("https://e-commerce-website-gtm9.vercel.app/api/removefromcart", {
        method: "POST",
        headers: {
          Accept: "application/json", // Corrected 'Accept' header
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error:", error));
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };
  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;
