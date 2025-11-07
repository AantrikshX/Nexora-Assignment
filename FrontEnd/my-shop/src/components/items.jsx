import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"

const Items = () => {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err))
  }, [])

  const addToCart = async (product) => {
    try {
      const res = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          credentials: 'include',
        },
        body: JSON.stringify({
          productId: product.id,
          title: product.title,
          price: product.price,
          image: product.image
        })
      });

      if (res.ok) {
        alert('Added to cart!');
      } else if (res.status === 401) {
        alert('Please login first');
        navigate("/")
      } else {
        alert('Failed to add to cart');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong!');
    }
  };

  return (
    <div className='text-white w-full flex justify-center mt-10'>
      <div className='flex gap-20 w-full justify-center mt-20 flex-wrap'>
        {products.map((product) => (
          <div key={product.id} className='w-70 h-80 rounded flex flex-col justify-between items-center border border-zinc-600'>
            <div className='imagecontainer rounded-t w-full h-60 flex justify-center items-center'>
              <img src={product.image} alt={product.title} className='h-40 object-contain' />
            </div>
            <div className='footer w-full h-20 flex justify-between rounded-b'>
              <div className='nameandprice relative px-2 py-3'>
                <h1 className='text-white text-xl leading-tight'>{product.title.slice(0, 10)}...</h1>
                <h1 className='text-white font-bold leading-tight absolute bottom-5 left-4'>${product.price}</h1>
              </div>
              <div className='px-3 py-7'>
                <button 
                  onClick={() => addToCart(product)}
                  className='bg-blue-500 hover:bg-blue-600 cursor-pointer transition px-2 py-2 rounded'
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Items