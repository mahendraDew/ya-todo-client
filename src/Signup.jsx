import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here (e.g., API call)
    console.log({ username, email, password });
    // Redirect to another page or show a success message
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <nav className="bg-gray-50 px-14 py-3 flex justify-between items-center shadow-md">
        <div className="text-xl cursor-pointer" onClick={() => navigate('/')}>
          Not So Special Todo App
        </div>
        <div>
          <button
            className="bg-gray-800 hover:bg-gray-600 text-white text-sm px-3 py-1 rounded"
            onClick={() => navigate('/')}
          >
            Home
          </button>
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-gray-600"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-600  text-white text-lg px-4 py-2 rounded"
          >
            Sign Up
          </button>
        </form>
      </main>

      <footer className="bg-gray-50 py-3 text-center">
        <p className="text-gray-600">© 2024 Not So Special Todo App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Signup;
