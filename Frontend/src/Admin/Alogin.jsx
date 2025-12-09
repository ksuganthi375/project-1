import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Alogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

    axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/alogin",
        { email, password },
        { withCredentials: true }
      );

      console.log("Login response:", res.data);

      if (res.data.Status === "Success") {
        localStorage.setItem("admin", JSON.stringify(res.data.user));

        alert("Login successful!");
        navigate("/ahome");
      } else {
        alert("Invalid email or password");
      }
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed, please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fdf6e3]">
      <div className="relative max-w-md w-full bg-[#fffaf0] p-8 rounded-md shadow-md border border-[#e0d8c3] overflow-hidden">
        <div className="relative z-10">
          <div>
            <h2 className="text-3xl font-extrabold text-[#4b3f2f] text-center mb-4">
              Login to Admin Account
            </h2>
          </div>


          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your password"
              />
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="bg-[#8B4513] hover:bg-[#a0522d] text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#d2b48c] focus:border-[#8B4513] transition-all duration-300"
              >
                Log in
              </button>
            </div>

            {/* Signup redirect */}
            <p className="mt-2 text-sm text-gray-600 text-center">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/asignup")}
                className="ml-2 text-[#8B4513] hover:underline focus:outline-none focus:ring focus:border-[#8B4513] transition-all duration-300"
              >
                Signup
              </button>
            </p>
          </form>
        </div>
        <div className="absolute h-full w-full bg-[#8B4513] opacity-10 transform -skew-y-6 origin-bottom-right pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Alogin;
