import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Seller/List.css';
import { useNavigate } from 'react-router-dom';
import Unavbar from './Unavbar';
import Footer from '../Components/Footer';


function Myorders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      alert("Please log in first.");
      navigate('/login');
      return;
    }

    axios
      .get(`http://localhost:4000/getorders/${user.id}`, { withCredentials: true })
      .then((response) => {
        setOrders(response.data);
        console.log("User Orders:", response.data);
      })
      .catch((error) => {
        console.error('Error fetching orders: ', error);
        if (error.response && error.response.status === 401) {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("user");
          navigate('/login');
        }
      });
  }, [navigate]);

  // Calculate order status
  const calculateStatus = (Delivery) => {
    const currentDate = new Date();
    const formattedDeliveryDate = new Date(Delivery);
    return formattedDeliveryDate >= currentDate ? "ontheway" : "delivered";
  };

  return (
  <div className="min-h-screen bg-[#fef9f4] text-[#4b3a2f]">
    <Unavbar />
    <div className="py-8 px-4">
      <h1 className="text-3xl font-semibold text-center mb-6 text-[#5c4331]">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-[#7a6b5d] mt-4">You have no orders yet.</p>
      ) : (
        orders.map((item) => {
          const status = calculateStatus(item.Delivery);

          return (
            <div
              key={item._id}
              className="bg-[#fdf6ee] w-11/12 mx-auto mb-8 p-6 rounded-lg shadow-md border border-[#e0d3c5]"
            >
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div className="flex-shrink-0">
                  <img
                    src={`http://localhost:4000/${item.itemImage}`}
                    alt={`${item.booktitle} Image`}
                    className="h-20 object-cover rounded border border-[#d3c3b3]"
                  />
                </div>

                <div className="flex flex-col text-sm font-medium">
                  <span className="text-[#7c6655]">Product Name</span>
                  <span>{item.booktitle || "Unknown"} - {item._id.slice(3, 7)}</span>
                </div>

                <div className="flex flex-col text-sm font-medium">
                  <span className="text-[#7c6655]">Order ID</span>
                  <span>{item._id.slice(0, 10)}</span>
                </div>

                <div className="flex flex-col text-sm font-medium max-w-xs">
                  <span className="text-[#7c6655]">Address</span>
                  <span>
                    {item.flatno}, {item.city} ({item.pincode}), {item.state}
                  </span>
                </div>

                <div className="flex flex-col text-sm font-medium">
                  <span className="text-[#7c6655]">Seller</span>
                  <span>{item.seller}</span>
                </div>

                <div className="flex flex-col text-sm font-medium">
                  <span className="text-[#7c6655]">Booking Date</span>
                  <span>{item.BookingDate}</span>
                </div>

                <div className="flex flex-col text-sm font-medium">
                  <span className="text-[#7c6655]">Delivery By</span>
                  <span>{item.Delivery}</span>
                </div>

                <div className="flex flex-col text-sm font-medium">
                  <span className="text-[#7c6655]">Price</span>
                  <span>₹{item.totalamount}</span>
                </div>

                <div className="flex flex-col text-sm font-medium">
                  <span className="text-[#7c6655]">Status</span>
                  <span
                    className={`font-bold ${
                      status === 'ontheway' ? 'text-yellow-700' : 'text-green-700'
                    }`}
                  >
                    {status}
                  </span>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>

    <div className="h-64" /> 
    <Footer />
  </div>
);
}

export default Myorders;
