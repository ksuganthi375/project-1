import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Anavbar from './Anavbar';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleAuthError = (err) => {
    if (err.response && err.response.status === 401) {
      alert("Session expired. Please log in again.");
      localStorage.removeItem("user");
      window.location.href = "/alogin";
    }
  };

  const fetchUsers = () => {
    axios.get(`http://localhost:4000/users`, { withCredentials: true })
      .then((res) => setUsers(res.data))
      .catch(handleAuthError);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/userdelete/${id}`, { withCredentials: true });
      alert('User deleted');
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      handleAuthError(error);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/userorderdelete/${id}`, { withCredentials: true });
      alert('Order deleted');
      setUserOrders((prev) => prev.filter((order) => order._id !== id));
    } catch (error) {
      handleAuthError(error);
    }
  };

  const fetchUserOrders = (userId) => {
    axios.get(`http://localhost:4000/getorders/${userId}`, { withCredentials: true })
      .then((res) => {
        setUserOrders(res.data);
        setSelectedUser(userId);
      })
      .catch(console.error);
  };

  const calculateStatus = (Delivery) => {
    const currentDate = new Date();
    const formattedDeliveryDate = new Date(Delivery);
    return formattedDeliveryDate >= currentDate ? "ontheway" : "delivered";
  };
return (
  <div className="bg-[#fef9f3] min-h-screen text-[#2b2118]">
    <Anavbar />
    <h1 className="text-center my-6 text-3xl font-bold">Users</h1>

    <div className="flex justify-center">
      <div className="overflow-x-auto w-[90%] md:w-[70%]">
        <table className="min-w-full bg-[#f5e8d5] text-[#2b2118] rounded-md shadow border border-[#dbcbb7]">
          <thead className="bg-[#e8d6bd]">
            <tr>
              <th className="py-3 px-4 border-b border-[#dbcbb7]">Sl/No</th>
              <th className="py-3 px-4 border-b border-[#dbcbb7]">User ID</th>
              <th className="py-3 px-4 border-b border-[#dbcbb7]">Name</th>
              <th className="py-3 px-4 border-b border-[#dbcbb7]">Email</th>
              <th className="py-3 px-4 border-b border-[#dbcbb7]">Operation</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="text-center hover:bg-[#e5d2ba]">
                <td className="py-2 px-4 border-t border-[#dbcbb7]">{index + 1}</td>
                <td className="py-2 px-4 border-t border-[#dbcbb7]">{user._id}</td>
                <td className="py-2 px-4 border-t border-[#dbcbb7]">{user.name}</td>
                <td className="py-2 px-4 border-t border-[#dbcbb7]">{user.email}</td>
                <td className="py-2 px-4 border-t border-[#dbcbb7] flex items-center justify-center gap-4">
                  <Link to={`/useredit/${user._id}`} className="text-[#3f7d66] hover:text-[#2c5c4c]">
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="text-[#9c3b3b] hover:text-[#7a2a2a]"
                  >
                    <FaTrash />
                  </button>
                  <button
                    onClick={() => fetchUserOrders(user._id)}
                    className="bg-[#c0a98f] hover:bg-[#b89a7e] text-white py-1 px-3 rounded"
                  >
                    View Orders
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Modal */}
    {selectedUser && (
      <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50">
        {/* Overlay */}
        <div
          className="bg-[#2b2118] bg-opacity-40 absolute inset-0"
          onClick={() => setSelectedUser(null)}
        ></div>

        {/* Modal Content */}
        <div className="bg-[#fff9f3] p-6 rounded-lg z-10 relative w-[90%] max-h-[80vh] overflow-y-auto shadow-lg">
          <h1 className="text-center text-2xl font-semibold text-[#3b2f2f] mb-4">User Orders</h1>

          {userOrders.map((item) => {
            const status = calculateStatus(item.Delivery);
            return (
              <div
                key={item._id}
                className="bg-[#f2e5d5] p-4 mb-4 rounded-md shadow flex flex-wrap gap-4 justify-between items-center"
              >
                <img
                  src={`http://localhost:4000/${item?.itemImage}`}
                  alt="Order"
                  className="h-20 w-32 object-cover rounded"
                />
                <div>
                  <p className="font-semibold">Product: {item.itemname}</p>
                  <p className="text-sm text-[#5c4a3c]">Order ID: {item._id.slice(0, 10)}</p>
                </div>
                <div>
                  <p>Buyer: {item.userName}</p>
                  <p>Seller: {item.seller}</p>
                </div>
                <div className="text-sm text-[#5c4a3c]">
                  <p>Address:</p>
                  <p>{item.flatno}, {item.city} ({item.pincode}), {item.state}</p>
                </div>
                <div>
                  <p className="font-bold text-green-700">Price: ${item.totalamount}</p>
                  <p className="text-[#38658d] font-medium">Status: {status}</p>
                </div>
                <button
                  onClick={() => deleteOrder(item._id)}
                  className="text-[#a53c3c] hover:text-[#822b2b]"
                >
                  <FaTrash />
                </button>
              </div>
            );
          })}

          <div className="flex justify-center">
            <button
              onClick={() => setSelectedUser(null)}
              className="bg-[#d86767] hover:bg-[#c15656] text-white px-6 py-2 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
};

export default Users;
