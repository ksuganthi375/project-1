import { Link } from "react-router-dom";

const Anavbar = () => {
  const get = localStorage.getItem('admin');
  const user = get ? JSON.parse(get) : { name: "Admin" };

  return (
    <nav className="bg-[#8B4513] text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/shome" className="text-white text-xl font-bold">
          BookStore (Admin)
        </Link>

        <div className="space-x-6 flex items-center">
          <Link to="/ahome" className="hover:underline hover:text-[#f0e6d2] transition-colors duration-200">
            Home
          </Link>
          <Link to="/users" className="hover:underline hover:text-[#f0e6d2] transition-colors duration-200">
            Users
          </Link>
          <Link to="/sellers" className="hover:underline hover:text-[#f0e6d2] transition-colors duration-200">
            Sellers
          </Link>
          <Link to="/" className="hover:underline hover:text-[#f0e6d2] transition-colors duration-200">
            Logout
          </Link>
          <span className="text-sm font-medium">({user.name})</span>
        </div>
      </div>
    </nav>
  );
};

export default Anavbar;
