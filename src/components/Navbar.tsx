import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, User, LogOut } from 'lucide-react';
import { useStore } from '../store';

function Navbar() {
  const { isDarkMode, toggleDarkMode, currentUser, logout } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to home
  };

  return (
    <nav className={`${isDarkMode ? 'dark bg-gray-800' : 'bg-white'} shadow-md`}>
      <div className="px-4">
        <div className="flex items-center justify-between h-20 text-[22px]">
          <Link to="/" className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            JobPortal
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/jobs" className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} hover:text-blue-600`}>
              Jobs
            </Link>

            {currentUser ? (
              <>
                <Link 
                  to={`/${currentUser.role}/dashboard`}
                  className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} hover:text-blue-600`}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} hover:text-red-500 flex items-center space-x-1`}
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link to="/login" className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} hover:text-blue-600`}>
                Login
              </Link>
            )}

            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;