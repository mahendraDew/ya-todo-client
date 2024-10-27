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
    localStorage.removeItem('user'); 
    localStorage.removeItem('token'); 
    // Redirect to the login page or any other appropriate action
    navigate('/');
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
      <div className="text-xl cursor-pointer relative group">
          <span
            className="text-gray-800" // Change the text color as needed
            onClick={() => navigate('/')}
          >
            YA Todo
          </span>
          <span
            className="absolute left-0 bottom-0 h-1 w-full bg-gray-800 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
          ></span>
        </div>
        <div className="flex items-center relative">
          {user ? (
            <>
             { user.avatar ? <img
                src={user.avatar || '/default-avatar.png'}
                alt={`${user.name}'s avatar`}
                className="w-8 h-8 rounded-full object-cover cursor-pointer"
                onClick={toggleDropdown}
              /> :<button onClick={toggleDropdown} className='bg-slate-300 p-1 rounded-full'> <User /></button>}
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
            <div className='flex gap-4'>

              <button
                className="border hover:bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded"
                onClick={() => navigate('/signin')}
                >
                signin
              </button>

              <button
                className="bg-gray-800 hover:bg-gray-600 text-white text-sm px-3 py-1 rounded"
                onClick={() => navigate('/signup')}
                >
                signup
              </button>
            </div>
          )}
        </div>
      </nav>
      <main className="flex-grow ">{children}</main>
      <footer className="bg-gray-50 py-3 text-center">
          <p className="text-gray-600">© 2024 YA Todo App. All rights reserved.</p>
        </footer>
    </div>
  );
};

export default Layout;
