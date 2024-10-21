import React from "react";
import { useContext } from "react";
import { CartContext } from "../../hooks/CartContext";
import CartItem from "../../components/CartItem";
import AppLoader from "../../components/AppLoader";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const { loading, cartData ,clearCart} = useContext(CartContext);
  const navigate = useNavigate();
  if (loading) {
    return <AppLoader />;
  }
  if (!cartData) {
    return <div>No products found</div>;
  }
  const products = cartData ;
const handleClearCart=()=>{
  clearCart();
  
}
const handleCheckout=()=>{
 

  // Display a celebratory message
  clearCart();
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
    // Trigger confetti animation
  alert("Congratulations! Your order has been placed!");
      navigate("/products");
  
   
  };

  return (
    <div
      className="w-full flex flex-wrap flex-col h-full justify-center content-center items-center mx-auto p-6 "
      style={{ backgroundColor: "#eee" ,minHeight:"calc(100vh - 209px)"}}
    >
      <div className="w-full flex flex-wrap flex-col justify-center content-center items-center mx-auto " >
        {products.map((product) => (
          <CartItem key={product.productId} data={product} />
        ))}
      </div>
{products.length===0 ? <p className="text-3xl text-red-500 font-bold">No Products Found</p>:
      <div className="w-full flex flex-wrap flex-row gap-5 justify-center content-center items-center mx-auto ">
      <button onClick={handleCheckout} className="w-fit bg-lime-700 text-white hover:bg-teal-400 px-8 py-2 rounded-md font-semibold">Checkout</button>
      <button  onClick={handleClearCart} className="w-fit bg-red-500 text-white hover:bg-red-800 px-8 py-2 rounded-md font-semibold">Clear Cart</button>
      </div>
      }
      </div>
    

  );
};

export default Cart;