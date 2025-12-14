import { useState, useEffect, useContext } from 'react';
import { Trash2, Plus, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sweets, setSweets] = useState([]);
  
  // Form State
  const [newSweet, setNewSweet] = useState({
    name: '', category: '', price: '', quantity: ''
  });

  // Fetch Sweets
  const fetchSweets = async () => {
    try {
      const res = await api.get('/sweets');
      setSweets(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user && !user.isAdmin) {
      toast.error("Access Denied: Admins only");
      navigate('/');
    }
    fetchSweets();
  }, [user, navigate]);

  // Add Sweet
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await api.post('/sweets', newSweet);
      toast.success('Sweet Added!');
      setNewSweet({ name: '', category: '', price: '', quantity: '' }); // Reset form
      fetchSweets();
    } catch (error) {
      toast.error('Failed to add sweet');
    }
  };

  // Delete Sweet
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/sweets/${id}`);
      toast.success('Sweet Deleted');
      fetchSweets();
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  // Restock (Quick add 10)
  const handleRestock = async (id) => {
    try {
      await api.post(`/sweets/${id}/restock`, { quantity: 10 });
      toast.success('Restocked 10 units');
      fetchSweets();
    } catch (error) {
      toast.error('Restock failed');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

      {/* Add Sweet Form */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Plus size={20} /> Add New Sweet
        </h2>
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            placeholder="Name" required className="border p-2 rounded"
            value={newSweet.name} onChange={e => setNewSweet({...newSweet, name: e.target.value})}
          />
          <input 
            placeholder="Category" required className="border p-2 rounded"
            value={newSweet.category} onChange={e => setNewSweet({...newSweet, category: e.target.value})}
          />
          <input 
            type="number" placeholder="Price" required className="border p-2 rounded"
            value={newSweet.price} onChange={e => setNewSweet({...newSweet, price: e.target.value})}
          />
          <input 
            type="number" placeholder="Quantity" required className="border p-2 rounded"
            value={newSweet.quantity} onChange={e => setNewSweet({...newSweet, quantity: e.target.value})}
          />
          <button type="submit" className="bg-green-600 text-white py-2 rounded md:col-span-2 hover:bg-green-700">
            Add Sweet
          </button>
        </form>
      </div>

      {/* List of Sweets */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sweets.map(sweet => (
              <tr key={sweet._id} className="border-t">
                <td className="p-4 font-medium">{sweet.name}</td>
                <td className="p-4 text-gray-600">{sweet.category}</td>
                <td className="p-4">{sweet.quantity}</td>
                <td className="p-4 flex gap-3">
                  <button 
                    onClick={() => handleRestock(sweet._id)}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                    title="Add 10 more"
                  >
                    <RefreshCw size={16} /> Restock
                  </button>
                  <button 
                    onClick={() => handleDelete(sweet._id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;