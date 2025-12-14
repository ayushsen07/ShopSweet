import { Link, useNavigate } from 'react-router-dom';
import { Candy } from 'lucide-react';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // Use real context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold hover:text-indigo-100 transition">
          <Candy size={28} />
          <span>Sweet Shop</span>
        </Link>

        <div className="flex space-x-6 items-center">
          <Link to="/" className="hover:text-indigo-200">Sweets</Link>
          
          {user ? (
            <>
              {/* Show user name */}
              <span className="text-indigo-200 text-sm">Hi, {user.name}</span>
              
              {/* Only show Admin link if user is admin */}
              {user.isAdmin && (
                <Link to="/admin" className="hover:text-indigo-200 font-semibold">Admin</Link>
              )}
              
              <button 
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-indigo-200">Login</Link>
              <Link to="/register" className="bg-white text-indigo-600 px-4 py-2 rounded font-semibold hover:bg-gray-100 transition">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;