import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const emailFromSignup = queryParams.get('email'); // Get email from query parameters
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(true);
  const [loading, setLoading] = useState(false);
  const email = emailFromSignup || ''; // Default to empty if not provided

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulating OTP sending
    setTimeout(() => {
      console.log(`OTP sent to: ${email}`);
      setIsOtpSent(true);
      setLoading(false);
    }, 1000);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulating OTP verification
    setTimeout(() => {
      console.log(`OTP verified: ${otp}`);
      // Redirect or handle successful sign-in here
      navigate('/'); // Redirect to landing page or dashboard
      setLoading(false);
    }, 1000);
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
          onSubmit={isOtpSent ? handleVerifyOtp : handleSendOtp}
          className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isOtpSent ? 'Verify Your Email' : 'Sign In'}
          </h2>
          {!isOtpSent && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                readOnly // Prevent the user from editing the email
                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-200"
              />
            </div>
          )}
          {isOtpSent && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                OTP is being sent to the registered email: <strong>{email}</strong>
              </p>
              <label className="block text-gray-700 mb-1">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-gray-600"
              />
            </div>
          )}
          <button
            type="submit"
            className={`w-full ${
              isOtpSent ? 'bg-green-500 hover:bg-green-400' : 'bg-gray-800 hover:bg-gray-600 '
            } text-white text-lg px-4 py-2 rounded`}
            disabled={loading}
          >
            {loading ? (isOtpSent ? 'Verifying...' : 'Sending OTP...') : (isOtpSent ? 'Verify OTP' : 'Send OTP')}
          </button>
        </form>
      </main>

      <footer className="bg-gray-50 py-3 text-center">
        <p className="text-gray-600">© 2024 Not So Special Todo App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SignInPage;
