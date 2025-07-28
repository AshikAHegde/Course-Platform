import React, { useState } from 'react';
import axios from 'axios';

export default function SignIn() {
  const [view, setView] = useState('signIn');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email: formData.email,
        password: formData.password
      }, {
        withCredentials: true // to send/receive cookies
      }
      );
      setMessage('Login successful!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    console.log('Password reset requested for:', formData.email);
    setView('resetSent'); // Switch to the confirmation view
  };

  const renderSignIn = () => (
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Sign In to Your Account</h1>
        <p className="mt-2 text-sm text-gray-600">Welcome back! Please enter your details.</p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSignInSubmit}>
        <div>
          <label htmlFor="email-address" className="sr-only">Email address</label>
          <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Email address" value={formData.email} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Password" value={formData.password} onChange={handleInputChange} />
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <button type="button" onClick={() => setView('forgotPassword')} className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none">
              Forgot your password?
            </button>
          </div>
        </div>
        <div>
          <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </div>
      </form>
      {message && <div className="text-center text-red-500 mt-2">{message}</div>}
    </>
  );

  const renderForgotPassword = () => (
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Reset Your Password</h1>
        <p className="mt-2 text-sm text-gray-600">Enter your email address and we will send you a link to reset your password.</p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleForgotPasswordSubmit}>
        <div>
          <label htmlFor="email-address" className="sr-only">Email address</label>
          <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Email address" value={formData.email} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Send Reset Link
          </button>
        </div>
        <div className="text-center text-sm">
          <button type="button" onClick={() => setView('signIn')} className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none">
            Back to Sign In
          </button>
        </div>
      </form>
    </>
  );

  const renderResetSent = () => (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-900">Check Your Email</h1>
      <p className="mt-4 text-sm text-gray-600">
        If an account with <span className="font-medium">{formData.email}</span> exists, we have sent a password reset link to it.
      </p>
      <div className="mt-6">
        <button onClick={() => setView('signIn')} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Back to Sign In
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        {view === 'signIn' && renderSignIn()}
        {view === 'forgotPassword' && renderForgotPassword()}
        {view === 'resetSent' && renderResetSent()}
      </div>
    </div>
  );
}
