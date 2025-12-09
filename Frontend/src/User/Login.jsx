import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { email, password };

      const res = await axios.post("http://localhost:4000/login", payload, { withCredentials: true });

      if (res.data.Status === "Success") {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        alert("Login successful");
        navigate('/uhome'); 
      } else {
        alert(res.data.msg || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed. Please check your credentials.");
    }
  };

  const redirectToSignup = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

return (
    <div className="flex items-center justify-center min-h-screen bg-[#fdf6e3]">
      <div className="relative max-w-md w-full bg-[#fffaf0] p-8 rounded-md shadow-md border border-[#e0d8c3] overflow-hidden">
        <div className="relative z-10">
          <div>
            <h2 className="text-3xl font-extrabold text-[#4b3f2f] text-center mb-4">
              Login to User Account
            </h2>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#5a4a42]">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 block w-full border border-[#d2b48c] rounded-md bg-[#fdfaf6] text-[#4b3f2f] placeholder-[#a79887] focus:outline-none focus:ring-[#8B4513] focus:border-[#8B4513] sm:text-sm"
                placeholder="Email address"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#5a4a42]">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 block w-full border border-[#d2b48c] rounded-md bg-[#fdfaf6] text-[#4b3f2f] placeholder-[#a79887] focus:outline-none focus:ring-[#8B4513] focus:border-[#8B4513] sm:text-sm"
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
                Don't have an account? Create
                <button
                  onClick={redirectToSignup}
                  className="ml-2 text-[#8B4513] hover:underline focus:outline-none focus:ring focus:border-[#8B4513] transition-all duration-300"
                >
                  Signup
                </button>
              </p>
            </div>
          </form>
        </div>
        <div className="absolute h-full w-full bg-[#8B4513] opacity-10 transform -skew-y-6 origin-bottom-right pointer-events-none"></div>
      </div>
    </div>
);
};

export default Login;
