import { useState, useEffect, useContext } from 'react';
import { Search, ShoppingBag, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Fetch Sweets from Backend
  const fetchSweets = async () => {
    try {
      // If user types, use search endpoint, otherwise get all
      const endpoint = searchTerm 
        ? `/sweets/search?query=${searchTerm}` 
        : '/sweets';
      
      const res = await api.get(endpoint);
      setSweets(res.data);
    } catch (error) {
      console.error("Failed to fetch sweets", error);
      // If 401 Unauthorized, redirect to login
      if(error.response && error.response.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  // Run fetch when component loads or search term changes
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchSweets();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  // 2. Handle Purchase
  const handlePurchase = async (id, name) => {
    try {
      await api.post(`/sweets/${id}/purchase`);
      toast.success(`Purchased 1 ${name}!`);
      fetchSweets(); // Refresh data to show new quantity
    } catch (error) {
      const msg = error.response?.data?.message || "Purchase failed";
      toast.error(msg);
    }
  };

  if (loading && sweets.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin text-indigo-600" size={48} />
      </div>
    );
  }

  return (
    <div>
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">
          Available Sweets
        </h1>
        
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search sweets..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Grid of Sweets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sweets.map((sweet) => (
          <div key={sweet._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 flex flex-col">
            {/* Image Placeholder */}
            <div className="h-40 bg-indigo-50 flex items-center justify-center text-indigo-300">
              <ShoppingBag size={48} />
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{sweet.name}</h3>
                <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full whitespace-nowrap">
                  {sweet.category}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4 font-medium">${sweet.price.toFixed(2)}</p>
              
              <div className="mt-auto flex justify-between items-center">
                <span className={`text-sm font-medium ${sweet.quantity > 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {sweet.quantity > 0 ? `${sweet.quantity} in stock` : 'Out of Stock'}
                </span>

                <button 
                  onClick={() => handlePurchase(sweet._id, sweet.name)}
                  disabled={sweet.quantity === 0}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                    sweet.quantity > 0 
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sweets.length === 0 && !loading && (
        <div className="text-center text-gray-500 mt-10">
          No sweets found. {user?.isAdmin && "Go to Admin panel to add some!"}
        </div>
      )}
    </div>
  );
};

export default Dashboard;