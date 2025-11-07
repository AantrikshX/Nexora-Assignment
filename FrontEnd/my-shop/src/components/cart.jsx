import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Cart = () => {
  const [cartItems, setCartItems] = useState([])
  const navigate = useNavigate()
  useEffect(() => { 
    fetch('/api/cart', { credentials: 'include' })
      .then(res => {
        if (res.status === 401) {
          alert("Please login first");
          return { cart: [] };
        }
        return res.json();
      })
      .then(data => {
        if (data?.cart) setCartItems(data.cart);
      })
      .catch(err => console.error('Error fetching cart:', err));
  }, [])

  const increaseQuantity = (productId) => {
    setCartItems(prev =>
      prev.map(item =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }

  const decreaseQuantity = (productId) => {
    setCartItems(prev =>
      prev.map(item =>
        item.productId === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    )
  }
   const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
  
    


  const removeItem = async (productId) => {
    try {
      const res = await fetch(`/api/cart/${productId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      const data = await res.json();

      if (res.ok) {
        setCartItems(data.cart); 
        
      } else {
        alert(data.message || 'Failed to remove item');
      }
    } catch (err) {
      console.error('Error removing item:', err);
      alert('Something went wrong!');
    }
  }


  return (
    <div className='w-full min-h-screen py-10 flex flex-col gap-10 sm:gap-20 items-center ' >
      
      <div className='scroll bg-black/50 overflow-y-scroll overflow-x-hidden py-10 max-h-200 flex flex-col items-center gap-10 sm:gap-30 px-6 sm:px-10' >
        
        {cartItems.length === 0 ? (
          <h1 className='text-white text-2xl'>Your cart is empty 🛒</h1>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} className=' py-2 sm:py-10 bg-zinc-800 rounded-xl flex sm:px-10 px-2  items-center gap-5 sm:gap-20' >
              <div className='forimage w-30 h-25 sm:w-45 sm:h-50 rounded-xl border border-zinc-700' >
                <img src={item.image} alt={item.title} className='w-full h-full object-contain rounded-xl' />
              </div>

              <div className='sm:h-50 flex flex-col  sm:gap-5' >
                <h1 className='  sm:text-3xl sm:w-70 text-white font-semibold '>{item.title.slice(0, 25)}...</h1>
                <div className='flex flex-col gap-1 sm:gap-10' >
                  <h1 className='sm:text-2xl text-white font-bold '>${item.price}</h1>
                  <div className='flex flex-col gap-1' >
                    <h1 className='text-white'>Quantity</h1>
                    <div className='flex bg-zinc-200 w-12 sm:w-20 rounded ' >
                      <button className='w-4 sm:w-5' onClick={() => increaseQuantity(item.productId)}>+</button>
                      <input 
                        type="text" 
                        className=' w-5 sm:w-10 bg-zinc-300 border text-xs sm:text-sm border-zinc-400 text-center' 
                        value={item.quantity} 
                        readOnly
                      />
                      <button className='w-4 sm:w-5' onClick={() => decreaseQuantity(item.productId)}>-</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex flex-col justify-end sm:h-40'>
                <button className='text-red-500 sm:text-xl cursor-pointer ' onClick={() => removeItem(item.productId)}>Remove</button>
              </div>
            </div>
          ))
        )}

      </div>
        <div className='sm:w-200 w-90  flex items-center justify-between' >
          <div className='flex gap-2 sm:gap-5' >
            <h1 className='text-white font-semibold text-xl sm:text-3xl' >Sub Total:</h1>
            <h1 className='text-white font-medium text-xl sm:text-3xl' >${subtotal.toFixed(2)}</h1>
          </div>
          <button onClick={() => navigate('/shop/checkout')} className='bg-blue-500 cursor-pointer text-white sm:text-xl font-medium rounded-xl px-2 py-3 sm:px-3 sm:py-2 ' >Check Out</button>

          </div>

    </div>
  )
}

export default Cart
