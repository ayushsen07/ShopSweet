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
    <nav className="bg-[#5CC5D5] text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold hover:text-indigo-100 transition">
          <Candy size={28} />
          <span className='text-[#0D3253]'>Sweet Shop</span>
        </Link>

        <div className="flex space-x-6 items-center">
          <Link to="/" className="hover:text-indigo-200">Sweets</Link>
          
          {user ? (
            <>
              {/* Show user name */}
              <span className="text-white text-sm">Hi, {user.name}</span>
              
              {/* Only show Admin link if user is admin */}
              {user.isAdmin && (
                <Link to="/admin" className="hover:text-indigo-200 font-semibold">Admin</Link>
              )}
              
              <button 
                onClick={handleLogout}
                className="bg-[#0D3253] px-4 py-2 rounded transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-indigo-200">Login</Link>
              <Link to="/register" className="bg-[#0D3253] text-white px-4 py-2 rounded font-semibold transition">
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