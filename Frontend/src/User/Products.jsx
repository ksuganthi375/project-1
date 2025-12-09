import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Unavbar from './Unavbar';
import { Link } from 'react-router-dom';

function Products() {
  const [items, setItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    axios
      .get(`http://localhost:4000/item`, { withCredentials: true })
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      });

    if (user) {
      axios
        .get(`http://localhost:4000/wishlist/${user.id}`, { withCredentials: true })
        .then((response) => {
          setWishlist(response.data);
        })
        .catch((err) => console.error('Error fetching wishlist:', err));
    }
  }, []);

  const refreshWishlist = () => {
    if (!user) return;
    axios
      .get(`http://localhost:4000/wishlist/${user.id}`, { withCredentials: true })
      .then((response) => {
        setWishlist(response.data);
      })
      .catch((err) => console.error('Error refreshing wishlist:', err));
  };

  const addToWishlist = async (itemId) => {

    if (!user) {
      alert('Please log in first!');
      return;
    }

    try {
      const selectedItem = items.find((item) => item._id === itemId);
      if (!selectedItem) throw new Error('Item not found');

      const { title, itemImage, _id } = selectedItem;

      await axios.post(
        `http://localhost:4000/wishlist/add`,
        {
          bookId: _id,
          title,
          itemImage,
          userId: user.id,
          userName: user.name,
        },
        { withCredentials: true }
      );

      refreshWishlist();
    } catch (error) {
      console.error('Error adding item to wishlist: ', error);
    }
  };

  const removeFromWishlist = async (itemId) => {
    if (!user) return;
    try {
      await axios.post(
        `http://localhost:4000/wishlist/remove`,
        { itemId, userId: user.id },
        { withCredentials: true }
      );

      refreshWishlist();
    } catch (error) {
      console.error('Error removing item from wishlist: ', error);
    }
  };

  const isItemInWishlist = (itemId) => {
    return wishlist.some((wish) => wish.itemId === itemId);
  };

  return (
    <div className="min-h-screen bg-[#f4ecd8] text-[#4b3e2e] font-serif">
      <Unavbar />
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-8 text-center">Books List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-[#fdfaf3] border border-[#e5dcc7] w-64 rounded-lg shadow hover:shadow-md transition duration-300"
            >
              <img
                src={`http://localhost:4000/${item.itemImage}`}
                alt="Item"
                className="rounded-t-lg object-cover"
                style={{ height: '200px', width: '100%' }}
              />
              <div className="p-3 space-y-1">
                <p className="text-base font-bold">{item.title}</p>
                <p className="text-sm">Author: {item.author}</p>
                <p className="text-sm">Genre: {item.genre}</p>
                <p className="text-[#6e4c2f] font-semibold">₹{item.price}</p>

                <div className="flex flex-wrap items-center gap-2 mt-3">
                  {isItemInWishlist(item._id) ? (
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm rounded"
                      onClick={() => removeFromWishlist(item._id)}
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      className="bg-[#6b4f3b] hover:bg-[#5b4230] text-white px-3 py-1 text-sm rounded"
                      onClick={() => addToWishlist(item._id)}
                    >
                      Wishlist
                    </button>
                  )}
                  <Link
                    to={`/uitem/${item._id}`}
                    className="bg-[#6b4f3b] hover:bg-[#5b4230] text-white px-3 py-1 text-sm rounded"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
