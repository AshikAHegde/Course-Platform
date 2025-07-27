import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // REMOVED: This was causing a crash outside of a Router context.

// This component is now self-contained and doesn't need to read cookies manually.
export default function VerifyEmail() {
    const [otp, setOtp] = useState('');
    // Use an object for message to handle success/error states
    const [message, setMessage] = useState({ text: '', type: 'error' });
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    // const navigate = useNavigate(); // REMOVED: Replaced with a standard browser redirect.

    // A reusable function to request a new verification code
    const requestVerificationCode = useCallback(async () => {
        setMessage({ text: '', type: 'error' });
        setResendLoading(true);
        try {
            // The browser will now AUTOMATICALLY send the 'token' cookie
            // because of the `withCredentials: true` setting.
            await axios.get(`${import.meta.env.VITE_API_URL}/auth/emailsend`, {
                withCredentials: true,
            });
            setMessage({ text: 'A new verification code has been sent to your email.', type: 'success' });
        } catch (err) {
            setMessage({
                text: err.response?.data?.message || 'Failed to send verification code.',
                type: 'error',
            });
        } finally {
            setResendLoading(false);
        }
    }, []);

    // Send the initial email when the component mounts
    useEffect(() => {
        requestVerificationCode();
    }, [requestVerificationCode]);

    // Handler for submitting the OTP
    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: 'error' });
        setLoading(true);
        try {
            // We no longer need to send the token in the body.
            // The `withCredentials: true` flag handles sending the cookie.
            await axios.post(`${import.meta.env.VITE_API_URL}/auth/emailverify`,
                { code: otp }, // Only send the OTP code
                { withCredentials: true }
            );

            setMessage({ text: 'Email verified successfully! Redirecting...', type: 'success' });
            
            // Redirect to the dashboard or profile page after a short delay
            setTimeout(() => {
                // FIX: Use standard window.location to redirect. This avoids the need for Router context.
                window.location.href = '/dashboard';
            }, 2000);

        } catch (err) {
            setMessage({
                text: err.response?.data?.message || 'Invalid or expired code. Please try again.',
                type: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md text-center">
                <h1 className="text-2xl font-bold text-gray-900">Verify Your Email</h1>
                <p className="text-sm text-gray-600">
                    We've sent a 6-digit code to your email address. Please enter it below to complete your registration.
                </p>
                <form className="space-y-6" onSubmit={handleOtpSubmit}>
                    <div>
                        <label htmlFor="otp" className="sr-only">OTP</label>
                        <input
                            id="otp"
                            name="otp"
                            type="text"
                            pattern="\d{6}"
                            title="OTP must be 6 digits"
                            maxLength="6"
                            required
                            className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-center tracking-[0.5em]"
                            placeholder="_ _ _ _ _ _"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
                        disabled={loading || otp.length !== 6}
                    >
                        {loading ? 'Verifying...' : 'Verify Account'}
                    </button>
                </form>

                {/* Display Success/Error Messages */}
                {message.text && (
                    <div className={`text-center mt-4 text-sm ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                        {message.text}
                    </div>
                )}

                <div className="text-sm text-gray-500">
                    Didn't receive the code?{' '}
                    <button
                        onClick={requestVerificationCode}
                        disabled={resendLoading}
                        className="font-medium text-indigo-600 hover:text-indigo-500 disabled:text-gray-400"
                    >
                        {resendLoading ? 'Sending...' : 'Resend Code'}
                    </button>
                </div>
            </div>
        </div>
    );
}
 