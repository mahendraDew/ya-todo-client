import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <nav className="bg-gray-50 px-14 py-3 flex justify-between items-center shadow-md">
        <div className="text-xl cursor-pointer" onClick={() => navigate('/')}>
          Not So Special Todo App
        </div>
        <div>
          <button
            className="bg-gray-800 hover:bg-gray-600 text-white text-sm px-3 py-1 rounded"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center">
        <div className="text-center p-6">
          <h1 className="text-4xl font-bold mb-4">Your not so Special Todo app</h1>
          <p className="text-lg text-gray-600 mb-6">
            Manage your tasks effortlessly. Stay organized and be productive!
          </p>
          <button
            className="bg-gray-800 hover:bg-gray-600  text-white text-lg px-4 py-2 rounded"
            onClick={() => navigate('/signup')}
          >
            Get Started
          </button>
        </div>
      </main>

      <footer className="bg-gray-50 py-3 text-center">
        <p className="text-gray-600">© 2024 Not So Special Todo App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
