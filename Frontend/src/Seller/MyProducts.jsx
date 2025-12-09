import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Snavbar from './Snavbar';
import { FaTrash } from "react-icons/fa";

function Myproducts() {
  const [items, setItems] = useState([]);

  const fetchItems = () => {
    const seller = JSON.parse(localStorage.getItem('seller'));
    if (!seller) {
      console.log('No seller found in localStorage');
      return;
    }

    axios
      .get(`http://localhost:4000/getitem/${seller.id}`, { withCredentials: true })
      .then((response) => {
        console.log('Seller from localStorage:', seller);
        console.log('Fetched items:', response.data);
        setItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
        alert('Failed to fetch items.');
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const deleteItem = (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    axios
      .post(`http://localhost:4000/itemdelete/${id}`, {}, { withCredentials: true })
      .then(() => {
        alert('Item deleted successfully!');
        setItems((prevItems) => prevItems.filter((item) => item._id !== id));
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
        alert('Failed to delete item.');
      });
  };

 return (
  <div className="min-h-screen bg-[#fdf6e3] text-[#4b3832]">
    <Snavbar />
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-serif font-semibold mb-6 text-center text-[#4b3832]">Books List</h2>

      {items.length === 0 ? (
        <p className="text-center text-[#6f4e37] mt-6 font-medium">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-[#fcf8f3] text-[#3d2b1f] p-3 rounded-md shadow-md relative transition-transform hover:scale-[1.02]"
            >
              <button
                onClick={() => deleteItem(item._id)}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-sm"
              >
                <FaTrash />
              </button>

              <img
                src={`http://localhost:4000/${item.itemImage}`}
                alt="Book"
                className="rounded mb-2 mx-auto"
                style={{ height: '160px', width: '110px', objectFit: 'cover' }}
              />

              <div>
                <p className="text-xl font-serif font-semibold mb-1">{item.title}</p>
                <p className="text-sm mb-1"><strong>Author:</strong> {item.author}</p>
                <p className="text-sm mb-1"><strong>Genre:</strong> {item.genre}</p>
                <p className="text-sm font-semibold text-[#8b5e3c] mb-1">Price: Rs {item.price}</p>
                <p className="text-xs text-[#5c443b] mt-1">
                  <strong>Description:</strong> {item.description ? item.description.slice(0, 100) + '...' : 'No description available.'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);
}

export default Myproducts;
