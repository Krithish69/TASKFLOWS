import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext); // Ensure you add a login function to AuthContext
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // This call now automatically updates LocalStorage and MongoDB state
      await login(formData); 
      navigate('/'); 
    } catch (err) {
      alert(err.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="p-8 bg-white shadow-xl rounded-xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold mb-2 text-center text-gray-800">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-8">Enter your details to access TaskFlow</p>
        
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
        </div>

        <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
          Sign In
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          New to TaskFlow? <Link to="/register" className="text-blue-600 font-bold hover:underline">Create Account</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;