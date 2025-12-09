import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Link, useNavigate } from 'react-router-dom';
import Anavbar from './Anavbar';

function Ahome() {
  const [users, setUsers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const adminUser = JSON.parse(localStorage.getItem("admin"));
    if (!adminUser) {
      alert("Please log in first");
      navigate("/alogin");
      return;
    }
    
    fetchProtectedData("/users", setUsers);
    fetchProtectedData("/sellers", setVendors);
    fetchProtectedData("/orders", setOrders);
    fetchItems();
  }, []);
   
  const fetchProtectedData = async (endpoint, setState) => {
    try {
      const res = await axios.get(`http://localhost:4000${endpoint}`, {
        withCredentials: true
      });
      setState(res.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        console.warn('Unauthorized: Redirecting to login');
        navigate("/alogin");
      } else {
        console.error(`Error fetching ${endpoint}:`, err);
      }
    }
  };

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:4000/item");
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching items:', err);
    }
  };

  const totalUsers = users.length;
  const totalVendors = vendors.length;
  const totalItems = items.length;
  const totalOrders = orders.length;

  const data = [
    { name: 'Users', value: totalUsers, fill: '#2B124C' },
    { name: 'Vendors', value: totalVendors, fill: 'cyan' },
    { name: 'Items', value: totalItems, fill: 'blue' },
    { name: 'Orders', value: totalOrders, fill: 'orange' },
  ];

  return (
  <div className="min-h-screen bg-[#fdf6e3]">
    <Anavbar />

    <h3 className="text-center mt-6 text-2xl font-bold text-[#4b3f2f]">
      Admin Dashboard
    </h3>

    <div className="bg-[#fffaf0] w-11/12 max-w-7xl mx-auto mt-6 p-6 rounded-lg shadow-lg border border-[#e0d8c3]">
      
      {/* Dashboard Cards */}
      <div className="flex justify-around items-center flex-wrap gap-6">
        <Link to="/users" className="no-underline">
          <div className="w-64 h-32 bg-[#A0522D] rounded-lg shadow-md flex flex-col justify-center items-center text-xl font-bold text-white text-center hover:brightness-110 transition duration-300">
            USERS <br /> <br /> {totalUsers}
          </div>
        </Link>

        <Link to="/sellers" className="no-underline">
          <div className="w-64 h-32 bg-[#556B2F] rounded-lg shadow-md flex flex-col justify-center items-center text-xl font-bold text-white text-center hover:brightness-110 transition duration-300">
            Vendors <br /> <br /> {totalVendors}
          </div>
        </Link>

        <Link to="/items" className="no-underline">
          <div className="w-64 h-32 bg-[#8B4513] rounded-lg shadow-md flex flex-col justify-center items-center text-xl font-bold text-white text-center hover:brightness-110 transition duration-300">
            Items <br /> <br /> {totalItems}
          </div>
        </Link>

        <Link to="/orders" className="no-underline">
          <div className="w-64 h-32 bg-[#D2B48C] text-[#4b3f2f] font-bold rounded-lg shadow-md flex flex-col justify-center items-center text-xl text-center hover:brightness-110 transition duration-300">
            Total Orders <br /> <br /> {totalOrders}
          </div>
        </Link>
      </div>

      {/* Chart Section */}
      <div className="flex justify-center mt-12">
        <BarChart width={500} height={300} data={data}>
          <XAxis dataKey="name" stroke="#4b3f2f" />
          <YAxis stroke="#4b3f2f" />
          <Tooltip
            contentStyle={{ backgroundColor: '#fffaf0', borderColor: '#d2b48c' }}
            labelStyle={{ color: '#4b3f2f' }}
          />
          <Legend wrapperStyle={{ color: '#4b3f2f' }} />
          <Bar dataKey="value" barSize={50} fill="#8B4513" />
        </BarChart>
      </div>
    </div>
  </div>
);
}

export default Ahome;
