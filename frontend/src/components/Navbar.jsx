import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-white hover:text-purple-100 transition duration-300">
              Blog Manager
            </span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-white hover:text-purple-100 transition duration-300"
            >
              Home
            </Link>
            
            {user ? (
              <>
                <Link
                  to="/create"
                  className="bg-white text-purple-600 hover:bg-purple-50 px-4 py-2 rounded-lg font-medium transition duration-300"
                >
                  Create Post
                </Link>
                <div className="flex items-center space-x-4">
                  <span className="text-white">
                    Welcome, {user.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-white hover:text-purple-100 transition duration-300"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="space-x-4">
                <Link 
                  to="/login" 
                  className="text-white hover:text-purple-100 transition duration-300"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-white text-purple-600 hover:bg-purple-50 px-4 py-2 rounded-lg font-medium transition duration-300"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;