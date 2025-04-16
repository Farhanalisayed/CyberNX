import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useStore } from '../store';

function Login() {
  const navigate = useNavigate();
  const currentUser = useStore((state) => state.currentUser);
  const isDarkMode = useStore((state) => state.isDarkMode);
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const users = useStore((state) => state.users); // Grab users from Zustand
  console.log(users);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentUser) {
      navigate(`/${currentUser.role}/dashboard`);
    }
  }, [currentUser, navigate]);
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      setCurrentUser(user);
      navigate(`/${user.role}/dashboard`);
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-8`}>
        <div className="flex items-center justify-center mb-8">
          <LogIn className="w-12 h-12 text-blue-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-8">Welcome Back</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} border focus:ring-2 focus:ring-blue-500`}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} border focus:ring-2 focus:ring-blue-500`}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-center mt-6">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
      </div>
    </div>
  );
}

export default Login;
