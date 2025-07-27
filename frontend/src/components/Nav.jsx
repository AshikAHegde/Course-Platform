import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className="bg-white shadow-md w-full fixed top-0 left-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-indigo-600">CoursePlatform</Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-gray-700 hover:bg-indigo-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/dashboard" className="text-gray-700 hover:bg-indigo-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
              <Link to="/signin" className="text-gray-700 hover:bg-indigo-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Sign In</Link>
              <Link to="/signup" className="text-gray-700 hover:bg-indigo-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Sign Up</Link>
              <Link to="/verify-email" className="text-gray-700 hover:bg-indigo-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Verify Email</Link>
              <Link to="/profile" className="ml-4 flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 hover:bg-indigo-500">
                <span role="img" aria-label="Profile" className="text-xl">👤</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 