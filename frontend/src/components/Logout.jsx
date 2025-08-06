import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove the JWT token cookie by setting its expiry date to the past
        // Include sameSite attribute to match how the cookie was set during login
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; sameSite=Lax;';

        // Redirect to the sign-in page
        navigate('/signin');
    };

    return (
        <button
            onClick={handleLogout}
            className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
            Logout
        </button>
    );
};

export default Logout;
