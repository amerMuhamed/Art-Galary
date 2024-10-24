import axios from "axios";
import CryptoJS from "crypto-js";
export const login = async (username, password) => {
  try {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      throw new Error('Invalid username or password');
    }
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15); // Random string for additional complexity
    const rawToken = `${user.username}-${timestamp}-${randomString}`;

  
    const token = CryptoJS.SHA256(rawToken).toString();
    localStorage.setItem('token', JSON.stringify(token));
    return { token, user };  
  } catch (error) {
    console.error('Error during login:', error);
    throw new Error('Invalid username or password');
  }
};
export const registerUser = async (userData) => {
  try {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    existingUsers.push(userData);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15); // Random string for additional complexity
    const rawToken = `${userData.username}-${timestamp}-${randomString}`;
    const token = CryptoJS.SHA256(rawToken).toString();
    localStorage.setItem('token', JSON.stringify(token));
    return { success: true,token, message: "User registered successfully!" };
  } catch (error) {
    console.error("Error posting user data:", error);
    return { success: false,userData, message: "Failed to register user." };
  }
};

export const fetchProducts = async () => {
  try {
    const response = await fetch("/galary.json");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    const localProducts = JSON.parse(localStorage.getItem("localProducts")) || [];
    return [...data.galary, ...localProducts];
  } catch (error) {
    throw new Error("Failed to fetch products from local JSON");
  }
};

export const postProduct = async (productData) => {
  try {
    const localProducts = JSON.parse(localStorage.getItem("localProducts")) || [];
    localProducts.push(productData);
    localStorage.setItem("localProducts", JSON.stringify(localProducts));
    return productData;
  } catch (error) {
    console.error("Error posting product data:", error);
    throw error;
  }
};
export const fetchProductById = async (id) => {
  try {
    const response = await axios.get('galary.json');
    const product = response.data.galary.find((item) => item.id === id);
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    return product;
  } catch (e) {
    throw new Error('Failed to fetch product');
  }
};

export const fetchCart = async () => {
  const url = "/cart.json";
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.cart;
  } catch (error) {
    console.error("Error fetching cart data from local JSON:", error);
  }
};

export const updateCartJson = async (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
   
  } catch (error) {
    console.error("Error updating cart data:", error);
  }
};
