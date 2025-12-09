import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Unavbar from '../User/Unavbar';
import { Link, useNavigate } from 'react-router-dom';

const Items = () => {
  const [items, setItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  const handleAuthError = (err) => {
    console.error(err);
    if (err.response && err.response.status === 401) {
      alert("Session expired. Please log in again.");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:4000/item`)
      .then((response) => setItems(response.data))
      .catch((error) => console.error('Error fetching items:', error));

    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      axios.get(`http://localhost:4000/wishlist/${user.id}`, { withCredentials: true })
        .then((response) => setWishlist(response.data))
        .catch((error) => handleAuthError(error));
    }
  }, []);

  const addToWishlist = async (itemId) => {
    const selectedItem = items.find((item) => item._id === itemId);
    if (!selectedItem) return alert('Item not found');

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return alert("Please login to add items to wishlist");

    const payload = { 
      itemId: selectedItem._id, 
      title: selectedItem.title, 
      itemImage: selectedItem.itemImage, 
      userId: user.id, 
      userName: user.name 
    };

    try {
      await axios.post(`http://localhost:4000/wishlist/add`, payload, { withCredentials: true });
      setWishlist((prev) => [...prev, payload]);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const removeFromWishlist = async (itemId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return alert("Please login to remove items from wishlist");

    try {
      await axios.post(`http://localhost:4000/wishlist/remove`, { itemId }, { withCredentials: true });
      setWishlist((prev) => prev.filter((item) => item.itemId !== itemId));
    } catch (error) {
      handleAuthError(error);
    }
  };

  const isItemInWishlist = (itemId) => {
    return wishlist.some((item) => item.itemId === itemId);
  };

return (
  <div>
    <Unavbar />
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-semibold mb-4 text-center">Books List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {items.map((item) => (
          <div key={item._id} className="bg-white p-4 rounded shadow">
            <img
              src={`http://localhost:4000/${item.itemImage}`}
              alt="Item"
              className="rounded-t-lg w-full"
              style={{ height: '350px', objectFit: 'cover' }}
            />
            <div className="mt-4 space-y-2">
              <p className="text-xl font-bold">{item.title}</p>
              <p className="text-gray-700">Author: {item.author}</p>
              <p className="text-gray-700">Genre: {item.genre}</p>
              <p className="text-blue-500 font-bold">Price: ${item.price}</p>

              {/* Wishlist Button */}
              {isItemInWishlist(item._id) ? (
                <button
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                  onClick={() => removeFromWishlist(item._id)}
                >
                  Remove from Wishlist
                </button>
              ) : (
                <button
                  className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded"
                  onClick={() => addToWishlist(item._id)}
                >
                  Add to Wishlist
                </button>
              )}

              {/* View Button */}
              <Link to={`/uitem/${item._id}`}>
                <button className="ml-4 bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded">
                  View
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
}

export default Items;
