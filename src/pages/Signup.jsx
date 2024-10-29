import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ApiRoutes } from '../../utils/routeAPI';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your signup logic here (e.g., API call)
    console.log({ username, email, password });
    try {
      const config = {
        headers: {
          'Content-type': "application/json"
        }
      }
      const body = JSON.stringify({username, email, password});
      const res = await axios.post(ApiRoutes.signup, body, config);

      if(res.status == 200){
        // todo: add otpverification route here
        navigate('/signin')
      }else {
        setError('Email Already exists try login in.');
      }
      
      
    } catch (error) {
      setError("Email already exists try loggin in with this email. Or use different email!")
      console.log(error);
    }
   
  };

  return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <main className="flex-grow flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
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
            <p className="text-gray-600 text-sm mt-4">
              Already have account?{' '}
              <button
                className="text-blue-500 hover:underline"
                onClick={() => navigate('/signin')}
              >
                sign in
              </button>
            </p>
          </form>
        </main>

      </div>
  );
};

export default Signup;
