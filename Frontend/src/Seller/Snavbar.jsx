import { Link } from 'react-router-dom';

const Snavbar = () => {
  const get = localStorage.getItem('seller');
  const user = get ? JSON.parse(get) : { name: "Seller" };

  return (
    <nav className="bg-[#8B4513] text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/shome" className="text-white text-xl font-bold">
          BookStore (Seller)
        </Link>
        <div className="space-x-4 flex items-center">
          <Link to="/shome" className="hover:underline hover:text-[#f0e6d2] transition-colors duration-200">Home</Link>
          <Link to="/myproducts" className="hover:underline hover:text-[#f0e6d2] transition-colors duration-200">My Products</Link>
          <Link to="/addbook"className="hover:underline hover:text-[#f0e6d2] transition-colors duration-200">Add Books</Link>
          <Link to="/orders" className="hover:underline hover:text-[#f0e6d2] transition-colors duration-200">Orders</Link>
          <Link to="/" className="hover:underline hover:text-[#f0e6d2] transition-colors duration-200">Logout</Link>
          <h4 className="text-sm font-medium">({user.name})</h4>
        </div>
      </div>
    </nav>
  );
};

export default Snavbar;
