import React,{useState,useContext ,useEffect} from 'react'
import { fetchProductById } from '../api/shopServer';
import AppLoader from './AppLoader';
import { CartContext } from '../hooks/CartContext';
const CartItem = ({data}) => {
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);
    const[cartData, setCartData] = useState(null);
    const[quantity, setQuantity] = useState(data.quantity);
    const { removeFromCart} = useContext(CartContext);
    useEffect(() => {
        const getCart = async () => {
            try {
                const response = await fetchProductById(data.productId);
                setCartData(response);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        getCart();
    }, [data]);
    if(loading){
        return(
            <div>
                <AppLoader />
            </div>
        )   }
        if(error){
            return(
              <p className='text-red-500 text-center'>Error: {error.message}</p>
            )
        }
        if(!cartData){
            return(
                <div>
                    No Products Found.
                </div>
            )
        }

const totalPrice = cartData.price * quantity
const handleDecrease = () => {
  setQuantity((prevQuantity) => (prevQuantity === 1 ? 1 : prevQuantity-1));
}

const handleIncrease = () => { 
  setQuantity((prevQuantity) => prevQuantity + 1);
}

const handleRemove = () => {
  removeFromCart(data.productId);
}

  return (
    <div style={{border: "1px solid #dcf2f2"}} className=" flex items-center gap-5 p-4 bg-neutral-300 w-3/4 border border-gray-200 rounded-lg shadow-md mb-4">
      <img
        src={cartData.image}
        alt={cartData.title}
        className="w-24 h-24 object-cover rounded-full p-0.5 border bg-lime-300 border-white"
      />
      <div className="flex-grow">
        <h2 className="text-lg font-semibold">{cartData.title}</h2>
        <div className='flex items-center gap-3 mt-2'>
          <button
            className="flex items-center justify-center rounded-full pb-2 w-9 h-9 text-2xl bg-blue-500 text-white  hover:bg-cyan-950 font-semibold"
            onClick={handleDecrease}
          >
            -
          </button>
          <p className="text-lg font-bold">{quantity}</p>
          <button
            className="flex items-center justify-center rounded-full pb-2 w-9 h-9 text-2xl bg-blue-500 text-white  hover:bg-cyan-950 font-semibold"
            onClick={handleIncrease}
          >
            +
          </button>
        </div>
        <p className="mt-4 text-gray-700 text-lg font-semibold">Price: <span className="text-green-900">${totalPrice.toFixed(2)}</span></p>
        <div className='flex justify-between items-center flex-col sm:flex-row'> 
        <p className=" text-lg font-semibold">
          Total Price: <span className="text-green-900">${totalPrice.toFixed(2)}</span>
        </p>
        <button onClick={handleRemove} className="w-fit sm:w-1/5 bg-cyan-600 text-white py-2 rounded-lg shadow-md hover:bg-purple-600 transition-colors">
            Remove Item
          </button>
          </div>
      </div>
    </div>
  )
}

export default CartItem
