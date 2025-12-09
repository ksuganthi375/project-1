import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Snavbar from './Snavbar';

axios.defaults.withCredentials = true;

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const sellerRaw = localStorage.getItem('seller');
    const seller = JSON.parse(sellerRaw);
    console.log('Parsed seller object:', seller);

    if (!seller || !seller.id) {
      console.log('No valid seller or id found');
      return;
    }
    const sellerId = seller.id || seller._id;
    axios.get(`http://localhost:4000/getsellerorders/${sellerId}`, { withCredentials: true })
      .then((response) => {
        console.log("Status:", response.status);
        console.log("Orders from backend:", response.data);
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
        alert('Failed to fetch orders.');
      });
  }, []);


  const calculateStatus = (Delivery) => {
    const currentDate = new Date();
    const formattedDeliveryDate = new Date(Delivery);
    return formattedDeliveryDate >= currentDate ? "ontheway" : "delivered";
  };

  return (
    <div className="min-h-screen bg-[#f5ecd9] font-serif text-[#4b3e2b]">
      <Snavbar />
      <div className="py-8 px-4">
        <h3 className="text-3xl font-semibold text-center mb-6 text-[#3b2f1c]">
          Orders
        </h3>

        {orders.length === 0 ? (
          <p className="text-center text-[#7e6b52] mt-4">No orders found.</p>
        ) : (
          orders.map((item) => {
            const status = calculateStatus(item.Delivery);

            return (
              <div
                key={item._id}
                className="bg-[#fcf7ed] w-11/12 mx-auto mb-8 p-6 rounded-lg shadow-md border border-[#e2d8bd]"
              >
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src={`http://localhost:4000/${item?.itemImage}`}
                      alt={`${item.itemtype || "Product"} Image`}
                      className="h-20 object-cover rounded border border-[#d6c7a1]"
                    />
                  </div>

                  <div className="flex flex-col text-sm font-medium">
                    <span className="text-[#7e6b52]">Product Name</span>
                    <span>{item.itemname}</span>
                  </div>

                  <div className="flex flex-col text-sm font-medium">
                    <span className="text-[#7e6b52]">Order ID</span>
                    <span>{item._id.slice(0, 10)}</span>
                  </div>

                  <div className="flex flex-col text-sm font-medium">
                    <span className="text-[#7e6b52]">Customer Name</span>
                    <span>{item.userName}</span>
                  </div>

                  <div className="flex flex-col text-sm font-medium max-w-xs">
                    <span className="text-[#7e6b52]">Address</span>
                    <span>
                      {item.flatno}, {item.city} ({item.pincode}), {item.state}
                    </span>
                  </div>

                  <div className="flex flex-col text-sm font-medium">
                    <span className="text-[#7e6b52]">Booking Date</span>
                    <span>{item.BookingDate}</span>
                  </div>

                  <div className="flex flex-col text-sm font-medium">
                    <span className="text-[#7e6b52]">Delivery By</span>
                    <span>{item.Delivery}</span>
                  </div>

                  <div className="flex flex-col text-sm font-medium">
                    <span className="text-[#7e6b52]">Warranty</span>
                    <span>1 year</span>
                  </div>

                  <div className="flex flex-col text-sm font-medium">
                    <span className="text-[#7e6b52]">Price</span>
                    <span>₹{item.totalamount}</span>
                  </div>

                  <div className="flex flex-col text-sm font-medium">
                    <span className="text-[#7e6b52]">Status</span>
                    <span
                      className={`font-bold ${status === 'ontheway'
                          ? 'text-yellow-700'
                          : 'text-green-700'
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
    </div>
  );
}

export default Orders;
