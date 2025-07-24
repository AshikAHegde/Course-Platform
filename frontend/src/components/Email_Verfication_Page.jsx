import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Utility to get token from cookies
function getTokenFromCookies() {
  const match = document.cookie.match(/(?:^|;\s*)token=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : '';
}

export default function EmailVerificationPage({ onVerify }) {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Send email with token when component mounts
  useEffect(() => {
    const sendEmail = async () => {
      setMessage('');
      setLoading(true);
      try {
        const token = getTokenFromCookies();
        await axios.get(`${import.meta.env.VITE_API_URL}/auth/emailsend?token=${encodeURIComponent(token)}`);
        setMessage('Verification code sent to your email.');
      } catch (err) {
        setMessage(err.response?.data?.message || 'Failed to send verification code.');
      } finally {
        setLoading(false);
      }
    };
    sendEmail();
  }, []);

  // Handler for verifying the OTP
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      const token = getTokenFromCookies();
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/emailverify`, {
        token,
        code: otp
      });
      setMessage('Email verified successfully!');
      if (onVerify) onVerify();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Verification failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
      <form className="space-y-6" onSubmit={handleOtpSubmit}>
        <div>
          <label htmlFor="otp" className="sr-only">OTP</label>
          <input
            id="otp"
            name="otp"
            type="text"
            maxLength="6"
            required
            className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter 6-digit code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={loading}
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </form>
      {message && <div className="text-center text-red-500 mt-2">{message}</div>}
    </div>
  );
}
