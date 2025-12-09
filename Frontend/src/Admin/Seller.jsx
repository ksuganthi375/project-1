import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Anavbar from './Anavbar';

const Seller = () => {
  const [sellers, setSellers] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [sellerItems, setSellerItems] = useState([]);

  const handleAuthError = (err) => {
    if (err.response && err.response.status === 401) {
      alert("Unauthorized. Please log in again.");
      localStorage.removeItem("user");
      window.location.href = "/alogin";
    }
  };

  const fetchSellers = () => {
    axios.get(`http://localhost:4000/sellers`, { withCredentials: true })
      .then((response) => setSellers(response.data))
      .catch(handleAuthError);
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  const deleteSeller = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/sellerdelete/${id}`, { withCredentials: true });
      alert('Seller deleted');
      setSellers(prev => prev.filter(user => user._id !== id));
    } catch (error) {
      handleAuthError(error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/useritemdelete/${id}`, { withCredentials: true });
      alert('Item deleted');
      setSellerItems(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      handleAuthError(error);
    }
  };

  const fetchSellerItems = (sellerId) => {
    axios.get(`http://localhost:4000/getitem/${sellerId}`, { withCredentials: true })
      .then((response) => {
        setSellerItems(response.data);
        setSelectedSeller(sellerId);
      })
      .catch(console.error);
  };

  return (
   <div className="bg-[#fef9f3] min-h-screen text-[#2b2118]">
      <Anavbar />
       <h1 className="text-center my-6 text-3xl font-bold">Vendors</h1>

      <div className="flex justify-center">
        <div className="overflow-x-auto w-[90%] md:w-[70%]">
          <table className="min-w-full bg-[#f5e8d5] text-[#2b2118] rounded-md shadow border border-[#dbcbb7]">
             <thead className="bg-[#e8d6bd]">
              <tr>
                <th className="py-3 px-4 border-b border-[#dbcbb7]">Sl/No</th>
                <th className="py-3 px-4 border-b border-[#dbcbb7]">Seller ID</th>
                <th className="py-3 px-4 border-b border-[#dbcbb7]">Name</th>
                <th className="py-3 px-4 border-b border-[#dbcbb7]">Email</th>
                <th className="py-3 px-4 border-b border-[#dbcbb7]">Operation</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((seller, index) => (
                <tr key={seller._id} className="text-center hover:bg-[#e5d2ba]">
                  <td className="py-2 px-4 border-t border-[#dbcbb7]">{index + 1}</td>
                  <td className="py-2 px-4 border-t border-[#dbcbb7]">{seller._id}</td>
                  <td className="py-2 px-4 border-t border-[#dbcbb7]">{seller.name}</td>
                  <td className="py-2 px-4 border-t border-[#dbcbb7]">{seller.email}</td>
                  <td className="py-2 px-4 border-t border-[#dbcbb7] flex items-center justify-center gap-4">
                    <Link to={`/useredit/${seller._id}`} className="text-blue-500 hover:text-blue-700">
                      <FaEdit />
                    </Link>
                    <button 
                    onClick={() => deleteSeller(seller._id)} 
                    className="text-[#9c3b3b] hover:text-[#7a2a2a]">
                      <FaTrash />
                    </button>
                    <button
                      onClick={() => fetchSellerItems(seller._id)}
                      className="bg-[#c0a98f] hover:bg-[#b89a7e] text-white py-1 px-3 rounded"
                    >
                      View Items
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedSeller && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50">
          {/* Overlay */}
          <div
            className="bg-[#2b2118] bg-opacity-40 absolute inset-0"
            onClick={() => setSelectedSeller(null)}
          ></div>

          {/* Modal Content */}
          <div className="bg-[#fff9f3] p-6 rounded-lg z-10 relative w-[90%] max-h-[80vh] overflow-y-auto shadow-lg">
            <h1 className="text-center text-2xl font-semibold text-[#3b2f2f] mb-4">Vendor Products</h1>

            {sellerItems.map((item) => (
              <div
                key={item._id}
                className="bg-gray-100 p-4 mb-4 rounded-md shadow-md flex items-center justify-between flex-wrap"
              >
                <img
                  src={`http://localhost:4000/${item?.itemImage}`}
                  alt="Item"
                  className="h-20 w-32 object-cover rounded"
                />
                <div className="flex-1 ml-4">
                  <p className="font-semibold">{item.title || item.itemtype}</p>
                  <p className="text-sm text-[#5c4a3c]">ID: {item._id.slice(0, 10)}</p>
                </div>
                <div className="font-semibold text-green-700">Price: ${item.price}</div>
                <button
                  onClick={() => deleteItem(item._id)}
                  className="text-[#a53c3c] hover:text-[#822b2b]"
                >
                  <FaTrash />
                </button>
              </div>
            ))}

            <div className="flex justify-center">
              <button
                onClick={() => setSelectedSeller(null)}
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

export default Seller;
