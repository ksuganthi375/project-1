import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Link, useNavigate } from 'react-router-dom';
import Snavbar from './Snavbar';


function Shome() {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

  useEffect(() => {

    const seller = JSON.parse(localStorage.getItem('seller'));
    if (!seller) {
      console.log('No seller found in localStorage');
      navigate('/slogin');
      return;
    }

     const handleUnauthorized = (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized: Redirecting to login');
      navigate('/slogin');
    } else {
      console.error('Error:', error);
      alert('Something went wrong.');
    }
  };
    
    axios
    .get(`http://localhost:4000/getitem/${seller.id}`, { withCredentials: true })
    .then((response) => {
      setItems(response.data);
    })
    .catch(handleUnauthorized);

  axios
    .get(`http://localhost:4000/getsellerorders/${seller.id}`, { withCredentials: true })
    .then((response) => {
      setOrders(response.data);
    })
    .catch(handleUnauthorized);
  }, []);

  const totalItems = items.length;
  const totalOrders = orders.length;

  const data = [
    { name: 'Items', value: totalItems, fill: 'blue' },
    { name: 'Orders', value: totalOrders, fill: 'orange' },
  ];

  return (
    <div className="min-h-screen bg-[#fdf6e3]">
      <Snavbar />
      <div className="py-8">
        <h3 className="text-center mt-6 text-2xl font-bold text-[#4b3f2f]">Seller Dashboard</h3>
        <div className="bg-[#fffaf0] w-11/12 max-w-7xl mx-auto mt-6 p-6 rounded-lg shadow-lg border border-[#e0d8c3]">
          <div className="flex justify-around items-center flex-wrap gap-6">
            <Link to="/myproducts" className="no-underline">
              <div className="w-64 h-32 bg-[#A0522D] rounded-lg shadow-md flex flex-col justify-center items-center text-xl font-bold text-white text-center hover:brightness-110 transition duration-300">
                Items <br /> <span className="text-3xl">{totalItems}</span>
              </div>
            </Link>

            <Link to="/orders" className="no-underline">
              <div className="w-64 h-32 bg-yellow-500 hover:bg-yellow-600 transition rounded-lg shadow-md flex flex-col justify-center items-center text-xl font-bold text-white text-center">
                Total Orders <br /> <span className="text-3xl">{totalOrders}</span>
              </div>
            </Link>
          </div>

          <div className="mt-12 flex justify-center">
            <BarChart width={400} height={300} data={data}>
              <XAxis dataKey="name" stroke="#4b3f2f" />
              <YAxis stroke="#4b3f2f" />
              <Tooltip
                contentStyle={{ backgroundColor: '#fffaf0', borderColor: '#d2b48c' }}
                labelStyle={{ color: '#4b3f2f' }}
              />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" barSize={50} />
            </BarChart>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Shome;
