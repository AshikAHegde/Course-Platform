import React, { useState } from 'react';
import axios from 'axios';

// --- Email Verification Page Component ---
// This component now handles a multi-step verification process:
// 1. User enters their email.
// 2. User enters the OTP sent to their email.
function EmailVerificationPage({ onVerify }) {
  // State to manage which step of the verification we are on.
  const [step, setStep] = useState('enter_email'); // 'enter_email' or 'enter_otp'
  // State for the email input field.
  const [email, setEmail] = useState('');
  // State for the OTP input field.
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // --- Handler for submitting the email ---
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      // Call /auth/emailsend?token=email
      await axios.get(`/auth/emailsend?token=${encodeURIComponent(email)}`);
      setStep('enter_otp');
      setMessage('Verification code sent to your email.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to send verification code.');
    } finally {
      setLoading(false);
    }
  };

  // --- Handler for verifying the OTP ---
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      // Call /auth/emailverify with { email, code }
      await axios.post('/auth/emailverify', {
        email,
        code: otp
      });
      setMessage('Email verified successfully!');
      onVerify();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Verification failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      {step === 'enter_email' ? (
        // --- Step 1: Email Input Form ---
        <div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Verify Your Email</h1>
            <p className="mt-2 text-sm text-gray-600">
              Please enter your email address to receive a verification code.
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleEmailSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Verification Code'}
              </button>
            </div>
          </form>
          {message && <div className="text-center text-red-500 mt-2">{message}</div>}
        </div>
      ) : (
        // --- Step 2: OTP Input Form ---
        <div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Enter OTP</h1>
            <p className="mt-2 text-sm text-gray-600">
              A 6-digit code has been sent to <span className="font-medium">{email}</span>.
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleOtpSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="otp" className="sr-only">OTP</label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  maxLength="6"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify'}
              </button>
            </div>
          </form>
          {message && <div className="text-center text-red-500 mt-2">{message}</div>}
        </div>
      )}
    </div>
  );
}

// --- Main Application Component ---
// This component represents the main part of your application after verification.
function MainApplication({ onSwitchPage }) {
  return (
    <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-lg shadow-md text-center">
      <h1 className="text-3xl font-bold text-gray-900">Welcome to the App!</h1>
      <p className="text-gray-600">This is the main content area. You can only see this because you are "verified".</p>
      <button
        onClick={onSwitchPage}
        className="mt-4 px-6 py-2 text-sm text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
      >
        Go back to Verification Page
      </button>
    </div>
  );
}

// --- App Component (The Main Controller) ---
// This component decides which page to show based on the application's state.
// This would be the only component you render in your `main.jsx` file.
export default function email_Verfication_Page() {
  // 'useState' hook to manage which page is currently active.
  const [currentPage, setCurrentPage] = useState('verification');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
      {currentPage === 'verification' ? (
        <EmailVerificationPage onVerify={() => setCurrentPage('main_app')} />
      ) : (
        <MainApplication onSwitchPage={() => setCurrentPage('verification')} />
      )}
    </div>
  );
}
