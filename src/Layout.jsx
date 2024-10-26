import React, { useState, useRef, useEffect } from 'react';
import { User } from 'lucide-react'; // You can replace this with a user icon or your preferred icon library.
import { useNavigate } from 'react-router-dom';

const Layout = ({ user, children }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    // Logic to handle user logout
    console.log('User logged out');
    // Redirect to the login page or any other appropriate action
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-50 px-14 py-3 flex justify-between items-center shadow-md">
        <div
          className="text-xl cursor-pointer"
          onClick={() => navigate('/')}
        >
          Not So Special Todo App
        </div>
        <div className="flex items-center relative">
          {user ? (
            <>
              <img
                src={user.avatar || '/default-avatar.png'}
                alt={`${user.name}'s avatar`}
                className="w-8 h-8 rounded-full object-cover cursor-pointer"
                onClick={toggleDropdown}
              />
              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-7 right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200"
                >
                  <div className="px-4 py-2 text-sm font-semibold">{user.username}</div>
                  <div className="px-4 py-2 text-xs text-gray-500">{user.email}</div>
                  <button
                    className="block w-full text-left bg-red-500 hover:bg-red-400 text-white text-sm px-3 py-1 rounded"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <button
              className="bg-gray-800 hover:bg-gray-600 text-white text-sm px-3 py-1 rounded"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          )}
        </div>
      </nav>
      <main className="flex-grow bg-gray-100">{children}</main>
    </div>
  );
};

export default Layout;
