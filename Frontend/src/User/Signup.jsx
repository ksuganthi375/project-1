import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { name, email, password };

    try {
      const res = await axios.post("http://localhost:4000/signup", payload, { withCredentials: true });
      if (res.data.msg === "Account Created") {
        alert("Account created successfully!");
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/login'); 
      } else {
        alert(res.data.msg || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to create an account");
    }
  };

  const redirectToLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fdf6e3]">
      <div className="relative max-w-md w-full bg-[#fffaf0] p-8 rounded-md shadow-md border border-[#e0d8c3] overflow-hidden">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-extrabold text-[#4b3f2f] text-center mb-4"> User Registration</h2>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Name"
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Email address"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Password"
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

          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={redirectToLogin}
              className="ml-2 text-[#8B4513] hover:underline focus:outline-none focus:ring focus:border-[#8B4513] transition-all duration-300"
            >
              Login
            </button>
          </p>
        </form>

      <div className="absolute h-full w-full bg-[#8B4513] opacity-10 transform -skew-y-6 origin-bottom-right pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Signup;
