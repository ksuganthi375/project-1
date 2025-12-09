import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Asignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { name, email, password };
      const res = await axios.post("http://localhost:4000/asignup", payload, { withCredentials: true });

      if (res.data === "Account Created") {
        alert("Account created successfully!");
        navigate("/alogin");
      } else if (res.data === "Already have an account") {
        alert("Account already exists!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to create an account");
    }
  };

return (
  <div className="flex items-center justify-center min-h-screen bg-[#fdf6e3]">
    <div className="relative max-w-md w-full bg-[#fffaf0] p-8 rounded-md shadow-md border border-[#e0d8c3] overflow-hidden">
      
      {/* Header */}
      <div className="relative z-10">
        <h2 className="text-3xl font-extrabold text-[#4b3f2f] text-center mb-4">
          Admin Registration
        </h2>
      </div>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-[#5a4a42]">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 block w-full border border-[#d2b48c] rounded-md bg-[#fdfaf6] text-[#4b3f2f] placeholder-[#a79887] focus:outline-none focus:ring-[#8B4513] focus:border-[#8B4513] sm:text-sm"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-[#5a4a42]">Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 block w-full border border-[#d2b48c] rounded-md bg-[#fdfaf6] text-[#4b3f2f] placeholder-[#a79887] focus:outline-none focus:ring-[#8B4513] focus:border-[#8B4513] sm:text-sm"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-[#5a4a42]">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 block w-full border border-[#d2b48c] rounded-md bg-[#fdfaf6] text-[#4b3f2f] placeholder-[#a79887] focus:outline-none focus:ring-[#8B4513] focus:border-[#8B4513] sm:text-sm"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-[#8B4513] hover:bg-[#a0522d] text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#d2b48c] focus:border-[#8B4513] transition-all duration-300"
          >
            Signup
          </button>
        </div>

        {/* Login Redirect */}
        <p className="text-sm text-[#5a4a42] text-center">
          Already have an account?
          <button
            type="button"
            onClick={() => navigate("/alogin")}
            className="ml-2 text-[#8B4513] hover:underline focus:outline-none focus:ring focus:border-[#8B4513] transition-all duration-300"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  </div>
);
};

export default Asignup;
