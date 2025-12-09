import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Slogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/slogin",
        { email, password },
        { withCredentials: true } 
      );

      console.log("Login Response:", res.data);

      if (res.data.Status === "Success") {
        localStorage.setItem('seller', JSON.stringify(res.data.user));

        alert("Login successful!");
        navigate('/shome');
      } else {
        alert(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert("Login failed. Please check your credentials.");
    }
  };

  const handleSignupRedirect = (e) => {
    e.preventDefault();
    navigate("/ssignup");
  };

  return (
       <div className="flex items-center justify-center min-h-screen bg-[#fdf6e3]">
      <div className="relative max-w-md w-full bg-[#fffaf0] p-8 rounded-md shadow-md border border-[#e0d8c3] overflow-hidden">
        <div className="relative z-10">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">
                Login to Seller Account
              </h2>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
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
                  Log in
                </button>
                <br />
               <p className="mt-2 text-sm text-[#5a4a42]">
                  Don't have an account?
                  <button
                    onClick={handleSignupRedirect}
                    className="ml-2 text-[#8B4513] hover:underline focus:outline-none focus:ring focus:border-[#8B4513] transition-all duration-300"
                  >
                    Signup
                  </button>
                </p>
              </div>
            </form>
          </div>
         <div className="absolute h-full w-full bg-[#5c2f10] opacity-10 transform -skew-y-6 origin-bottom-right pointer-events-none"></div>
        </div>
      </div>
  );
};

export default Slogin;
