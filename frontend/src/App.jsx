import React, { useState } from 'react';
import Email_Verification_Page from './components/Email_Verfication_Page';
import Sign_Up from './components/Sign_Up';
import Sign_In from './components/Sign_In'

// --- Navbar Component ---
// This component displays navigation links and calls a function to change the page.
function Navbar({ onNavigate }) {
  return (
    <nav className="bg-white shadow-md w-full fixed top-0 left-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold text-indigo-600 cursor-pointer" onClick={() => onNavigate('home')}>CoursePlatform</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button onClick={() => onNavigate('signIn')} className="text-gray-700 hover:bg-indigo-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Sign In</button>
              <button onClick={() => onNavigate('signUp')} className="text-gray-700 hover:bg-indigo-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Sign Up</button>
              <button onClick={() => onNavigate('verifyEmail')} className="text-gray-700 hover:bg-indigo-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Verify Email</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// --- Placeholder Home Page ---
function HomePage() {
    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Welcome to CoursePlatform</h1>
            <p className="mt-4 text-lg text-gray-600">Your journey to knowledge starts here. Use the navbar to sign in or sign up.</p>
        </div>
    )
}


// --- Main App Component (Controller) ---
// This component renders the Navbar and the currently active page.
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'signIn':
        return <Sign_In />;
      case 'signUp':
        return <Sign_Up />;
      case 'verifyEmail':
        return <Email_Verification_Page />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar onNavigate={setCurrentPage} />
      {/* Add padding to the top to offset the fixed navbar */}
      <main className="flex items-center justify-center pt-24 px-4">
        {renderPage()}
      </main>
    </div>
  );
}
