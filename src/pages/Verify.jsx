import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Adjust if using another router library.

const Verify = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // To redirect the user after successful verification.

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerify = async () => {
    // Validate that the OTP is not empty or too short/long.
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 4-digit OTP.');
      return;
    }

    try {
      // Replace with your API endpoint and logic.
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle success - you can redirect the user to the dashboard or login page.
        navigate('/dashboard'); // Adjust the route as needed.
      } else {
        // Handle error - display a meaningful error message.
        setError(data.message || 'Failed to verify OTP. Please try again.');
      }
    } catch (error) {
      setError('An error occurred while verifying the OTP. Please try again later.');
    }
  };

  const resendOTP = () =>{
    console.log("otp resend")
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md w-80">
        <h2 className="text-lg font-medium mb-4">Verify Your Email</h2>
        <p className="text-gray-600 text-sm mb-4">
          Please enter the 4-digit OTP sent to your email.
        </p>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={handleOtpChange}
          className="w-full border border-gray-300 rounded-md p-2 mb-2"
          maxLength={6} // Limit to 6 characters.
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          onClick={handleVerify}
          className="bg-gray-800 hover:bg-gray-600 text-white w-full py-2 rounded-md transition-colors duration-150"
        >
          Verify
        </button>
        <p className="text-gray-600 text-sm mt-4">
          Didn’t receive an OTP?{' '}
          <button className="text-blue-500 hover:underline" onClick={resendOTP}>
            Resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default Verify;
