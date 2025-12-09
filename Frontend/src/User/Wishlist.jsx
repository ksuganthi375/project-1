import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Unavbar from './Unavbar';

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert("Please log in to view your wishlist");
      navigate('/login');
      return;
    }

    axios
      .get(`http://localhost:4000/wishlist/${user.id}`, { withCredentials: true })
      .then((response) => {
        setWishlist(response.data);
      })
      .catch((error) => {
        console.error('Error fetching wishlist items:', error);
        if (error.response && error.response.status === 401) {
          alert("Session expired, please log in again.");
          localStorage.removeItem('user');
          navigate('/login');
        }
      });
  }, [navigate]);

  const removeFromWishlist = async (itemId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        alert("Please log in to manage your wishlist");
        navigate('/login');
        return;
      }

      await axios.post(
        `http://localhost:4000/wishlist/remove`,
        { itemId, userId: user.id },
        { withCredentials: true }
      );

      const response = await axios.get(
        `http://localhost:4000/wishlist/${user.id}`,
        { withCredentials: true }
      );
      setWishlist(response.data);
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
      if (error.response && error.response.status === 401) {
        alert("Session expired, please log in again.");
        localStorage.removeItem('user');
        navigate('/login');
      }
    }
  };

 return (
  <div className="min-h-screen bg-[#fefae0]">
    <Unavbar />
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-[#5e503f] mb-6">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-center text-[#7f5539] text-lg mt-10">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="bg-[#fffaf0] border border-[#e0c097] p-4 rounded-lg shadow-sm hover:shadow-md transition-all w-[250px]"
            >
              <img
                src={`http://localhost:4000/${item.bookId.itemImage}`}
                alt={item.title || 'Wishlist Item'}
                className="rounded-t-lg w-full h-[180px] object-cover mb-3"
              />
              <div className="mt-2 text-[#5e503f]">
                <p className="text-lg font-bold mb-1">{item.bookId.title}</p>
                <p className="text-sm mb-1">Author: {item.bookId.author}</p>
                <p className="text-sm mb-1">Genre: {item.bookId.genre}</p>
                <p className="text-md font-semibold text-[#9c6644]">Price: ₹{item.bookId.price}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => removeFromWishlist(item._id)}
                    className="bg-[#b08968] hover:bg-[#a1795a] text-white px-4 py-1.5 rounded"
                  >
                    Remove
                  </button>

                  <Link to={`/uitem/${item.bookId._id}`}>
                    <button className="bg-[#7f5539] hover:bg-[#6c4a36] text-white px-4 py-1.5 rounded">
                      View
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);
}

export default Wishlist;
