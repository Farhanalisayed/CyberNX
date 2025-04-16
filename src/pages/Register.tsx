import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { useStore } from '../store';
import { v4 as uuidv4 } from 'uuid'; // For unique user ID

function Register() {
  const navigate = useNavigate();
  const isDarkMode = useStore((state) => state.isDarkMode);
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const addUser = useStore((state) => state.addUser);
  const currentUser = useStore((state) => state.currentUser);
  
  useEffect(() => {
      if (currentUser) {
        navigate(`/${currentUser.role}/dashboard`);
      }
    }, [currentUser, navigate]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'jobseeker',
    company: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if email already exists
    const emailExists = existingUsers.some(
      (user: any) => user.email.toLowerCase() === formData.email.toLowerCase()
    );

    if (emailExists) {
      alert('Email is already registered. Please use a different one.');
      return;
    }

    // Create new user
    const newUser = {
      id: uuidv4(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role as 'jobseeker' | 'employer',
      company: formData.role === 'employer' ? formData.company : undefined,
    };

    // Save to localStorage
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    addUser(newUser);
    // Optionally set current user
    setCurrentUser(newUser);

    // Navigate to login or dashboard
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto">
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-8`}>
        <div className="flex items-center justify-center mb-8">
          <UserPlus className="w-12 h-12 text-blue-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-8">Create Account</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} border focus:ring-2 focus:ring-blue-500`}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} border focus:ring-2 focus:ring-blue-500`}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={`w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} border focus:ring-2 focus:ring-blue-500`}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Account Type</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className={`w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} border focus:ring-2 focus:ring-blue-500`}
            >
              <option value="jobseeker">Job Seeker</option>
              <option value="employer">Employer</option>
            </select>
          </div>

          {formData.role === 'employer' && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Company Name</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className={`w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} border focus:ring-2 focus:ring-blue-500`}
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
