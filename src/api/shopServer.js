import axios from "axios";


export const login = async (username, password) => {
  try {
    const response = await axios.post("https://fakestoreapi.com/auth/login", {
      username,
      password,
    });
    localStorage.setItem("token", JSON.stringify(response.data.token));
    return response.data;
  } catch (e) {
    throw new Error("Invalid username or password");
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
