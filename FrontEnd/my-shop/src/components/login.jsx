import React from 'react'
import {useNavigate} from "react-router-dom"
import { useState } from 'react'
const login = () => {

  const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
    
          if (res.ok) {
            const data = await res.json();
            console.log('Login response:', data);
            localStorage.setItem('token', data.token);
            setFormData({ email: "", password: "" });
            navigate("/shop");
          } else {
            const text = await res.text();
            alert(`Login failed: ${text}`);
          }
        } catch (err) {
          console.error(err);
          alert("Something went wrong!");
        }
      };

  return (
   <div className="text-white bg-zinc-900 p-8 rounded-2xl shadow-lg">
  <h1 className="text-3xl font-semibold mb-6 text-center">Login</h1>
  
  <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-sm w-64">
    <label htmlFor="email">Email Address</label>
    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="border border-zinc-700 rounded-lg px-3 py-2 bg-transparent focus:outline-none focus:border-blue-500" placeholder="Enter your email"/>

    <label htmlFor="password">Password</label>
    <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} className="border border-zinc-700 rounded-lg px-3 py-2 bg-transparent focus:outline-none focus:border-blue-500" placeholder="Enter your password" />

    <button type="submit" className="mt-4 cursor-pointer bg-blue-500 hover:bg-blue-600 transition text-white font-medium py-2 rounded-lg" >
      Login
    </button>
  </form>
</div>
  )
}

export default login