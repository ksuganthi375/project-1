import { Link } from 'react-router-dom';

const Unavbar = () => {
  const get = localStorage.getItem('user');
  const user = get ? JSON.parse(get) : { name: 'User' };

  return (
    <nav className="bg-[#8B4513] text-white shadow-md font-serif">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/uhome" className="text-white text-xl font-bold">
          BookStore
        </Link>
        
        <div className="space-x-4 flex items-center">
          <Link to="/uhome" className="hover:underline hover:text-[#f0e6d2] transition-colors duration-200">Home</Link>
          <Link to="/uproducts" className="hover:underline hover:text-[#f0e6d2] transition-colors duration-200">Books</Link>
          <Link to="/wishlist" className="hover:underline hover:text-[#f0e6d2] transition-colors duration-200">Wishlist</Link>
          <Link to="/myorders" className="hover:underline hover:text-[#f0e6d2] transition-colors duration-200">My Orders</Link>
          <Link to="/" className="hover:underline hover:text-[#f0e6d2] transition-colors duration-200">Logout</Link>
          <span className="text-sm font-medium italic">({user.name})</span>
        </div>
      </div>
    </nav>
  );
};

export default Unavbar;
