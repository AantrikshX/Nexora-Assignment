import React, { useState } from 'react'



const billing = () => {
  const [billing, setBilling] = useState({
    fullName: '',
    address: '',
    phone: '',
    email: '',
    
  });

  const [receipt, setReceipt] = useState(null);

  const handleChange = (e) => {
    setBilling({ ...billing, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(billing)
      });

      const data = await res.json();

      if (res.ok) {
        setReceipt(data.receipt);
      } else {
        alert(data.message || 'Checkout failed');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Something went wrong!');
    }
  };

  return (
    <div className='w-full flex justify-center' >
    <div className='text-white bg-zinc-900 p-10 rounded-2xl shadow-lg flex min-h-screen flex-col gap-10 w-[500px] mx-auto mt-10'>
      {!receipt ? (
        <>
          <h1 className='text-3xl font-semibold text-center'>Billing Details</h1>
          <form onSubmit={handleCheckout} className='flex flex-col gap-4 text-sm'>
            <label>Full Name</label>
            <input 
              type="text" 
              name="fullName" 
              value={billing.fullName}
              onChange={handleChange}
              required
              className='bg-transparent border border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500'
              placeholder="Enter your full name"
            />

            <label>Address</label>
            <textarea 
              name="address"
              value={billing.address}
              onChange={handleChange}
              required
              rows="3"
              className='bg-transparent border border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 resize-none'
              placeholder="Enter your address"
            />

            <label>Phone Number</label>
            <input 
              type="text" 
              name="phone" 
              value={billing.phone}
              onChange={handleChange}
              required
              className='bg-transparent border border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500'
              placeholder="+91 XXXXX XXXXX"
            />

            <label>Email</label>
            <input 
              type="email" 
              name="email" 
              value={billing.email}
              onChange={handleChange}
              required
              className='bg-transparent border border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500'
              placeholder="you@example.com"
            />

            <button 
              type="submit"
              className='mt-4 bg-blue-500 hover:bg-blue-600 transition text-white font-medium py-2 rounded-lg cursor-pointer'
            >
              Buy Now
            </button>
          </form>
        </>
      ) : (
        <div>
          <h1 className='text-2xl font-bold mb-4 text-center'>Order Receipt 🧾</h1>

          <div className='flex flex-col gap-2'>
            <p><span className='font-semibold'>Order ID:</span> {receipt.orderId}</p>
            <p><span className='font-semibold'>Date:</span> {receipt.date}</p>

            <h2 className='text-xl mt-4 font-semibold'>Customer</h2>
            <p>{receipt.customer.name}</p>
            <p>{receipt.customer.address}</p>
            <p>{receipt.customer.phone}</p>
            <p>{receipt.customer.email}</p>

            <h2 className='text-xl mt-4 font-semibold'>Items</h2>
            {receipt.items.map((item, i) => (
              <div key={i} className='flex justify-between'>
                <span>{item.title} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <div className='border-t border-zinc-700 mt-4 pt-4'>
              <p>Subtotal: ${receipt.subtotal}</p>
              <p>Tax (5%): ${receipt.tax}</p>
              <h1 className='text-lg font-bold mt-2'>Total: ${receipt.total}</h1>
            </div>

            <p className='text-green-500 mt-3 font-semibold'>{receipt.paymentStatus}</p>
          </div>
        </div>
      )}
    </div>
    </div>
  )
}

export default billing
