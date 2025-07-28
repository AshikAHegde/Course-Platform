import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Helper function to get a cookie by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

// Helper to decode JWT payload
const decodeJwtPayload = (token) => {
  try {
    // Decode the payload from the JWT
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    console.error('Failed to decode JWT:', e);
    return null;
  }
};

// A component to show after successful verification
function MainApplication() {
  return (
    <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-lg shadow-md text-center">
      <h1 className="text-3xl font-bold text-gray-900">Welcome to the App!</h1>
      <p className="text-gray-600">Your email is verified. You can now access the main content.</p>
    </div>
  );
}

export default function EmailVerificationPage() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // This effect runs once when the component mounts
  useEffect(() => {
    const token = getCookie('token');
    if (!token) {
      setMessage('You are not logged in. Please log in to verify your email.');
      return;
    }

    const payload = decodeJwtPayload(token);
    const userEmail = payload ? payload.email : null;
    // console.log(userEmail);
    if (!userEmail) {
      setMessage('Could not find a valid email in your session. Please log in again.');
      return;
    }

    setEmail(userEmail);

    // Function to request the verification code from the backend
    const sendVerificationEmail = async () => {
      setLoading(true);
      setMessage('Requesting a verification code...');
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/auth/emailsend`, {
          email: userEmail
        }, {
          withCredentials: true
        });
        setMessage(`A verification code has been sent to ${userEmail}.`);
      } catch (err) {
        setMessage(err.response?.data?.message || 'Failed to send verification code.');
      } finally {
        setLoading(false);
      }
    };

    sendVerificationEmail();
  }, []); // The empty array ensures this effect runs only once

  // Function to handle the submission of the OTP form
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      setMessage('Please enter the OTP.');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/emailverify`, {
        email,
        code: otp
      }, { withCredentials: true });
      
      setMessage('Email verified successfully!');
      setIsVerified(true); // Set verification status to true
    } catch (err) {
      setMessage(err.response?.data?.message || 'Verification failed. The code may be incorrect or expired.');
    } finally {
      setLoading(false);
    }
  };

  // If the email is verified, show the main application content
  if (isVerified) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
        <MainApplication />
      </div>
    );
  }

  // Otherwise, show the OTP verification form
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Verify Your Email</h1>
          <p className="mt-2 text-sm text-gray-600">
            A 6-digit code has been sent to <span className="font-medium">{email || 'your email'}</span>.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleOtpSubmit}>
          <div>
            <label htmlFor="otp" className="sr-only">OTP</label>
            <input
              id="otp"
              name="otp"
              type="text"
              maxLength="6"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              disabled={!email || loading}
            />
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
              disabled={!email || loading || otp.length < 6}
            >
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>
          </div>
        </form>
        {message && <div className="text-center text-sm text-red-500 mt-4">{message}</div>}
      </div>
    </div>
  );
}
