import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Adjust if using another router library.
import { ApiRoutes } from '../../utils/routeAPI';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async () => {
    // Basic validation.
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    try {
      // Replace with your API endpoint for login.
      const config = {
        headers: {
          'Content-type': "application/json"
        }
      }
      const body = JSON.stringify({email, password});
      const res = await axios.post(ApiRoutes.login, body, config);
      console.log(res);
      const data = await res.data;
      console.log(data);
      if (res.statusText == "OK") {
        // Handle successful sign-in, e.g., store tokens and redirect.
        // You might want to store a token or user data in localStorage or context.
        localStorage.setItem('token', data.token); // Example: storing JWT token.
        localStorage.setItem('user', JSON.stringify(data.user))
        navigate('/todo'); // Adjust the redirect as needed.
      } else {
        setError(data.message || 'Invalid email or password.');
      }

    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md w-80">
        <h2 className="text-lg font-medium mb-4">Sign In</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          className="w-full border border-gray-300 rounded-md p-2 mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
        />
        <button
          onClick={handleSignIn}
          className="bg-gray-800 hover:bg-gray-600 text-white w-full py-2 rounded-md transition-colors duration-150"
        >
          Sign In
        </button>
        <p className="text-gray-600 text-sm mt-4">
          Don’t have an account?{' '}
          <button
            className="text-blue-500 hover:underline"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
