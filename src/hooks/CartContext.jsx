import React, { createContext, useState, useEffect, useContext } from "react";
import { fetchCart, updateCartJson } from "../api/shopServer";  // Import fetch and update methods
import { AuthContext } from "./UserContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { authenticationData } = useContext(AuthContext);
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCart = async () => {
      try {
        const data = await fetchCart();  // Fetch cart data from local JSON
        setCartData(data || []);  // Set the cart data, default to empty if no data
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getCart();  // Load the cart on component mount
  }, [authenticationData]);

  // Add product to cart
  const addToCart = async (product) => {
    const existingProduct = cartData.find(item => item.productId === product.productId);
    
    let updatedCart;
    if (existingProduct) {
      updatedCart = cartData.map(item =>
        item.productId === product.productId ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      product.quantity = 1;
      updatedCart = [...cartData, product];
    }

    setCartData(updatedCart);  // Update state
    await updateCartJson(updatedCart);  // Save to local JSON
  };

  // Remove product from cart
  const removeFromCart = async (productId) => {
    const updatedCart = cartData.filter(product => product.productId !== productId);
    setCartData(updatedCart);
    await updateCartJson(updatedCart);  // Save to local JSON
  };

  // Clear the entire cart
  const clearCart = async () => {
    setCartData([]);  // Clear the cart
    await updateCartJson([]);  // Save empty cart to local JSON
  };

  const value = {
    cartData,
    addToCart,
    removeFromCart,
    clearCart,
    loading,
    error,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
