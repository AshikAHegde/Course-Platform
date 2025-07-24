import React from 'react';

export default function Profile() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
        <span role="img" aria-label="Profile" className="text-5xl">👤</span>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">User Profile</h1>
      <p className="text-lg text-gray-600">Profile details will appear here.</p>
    </div>
  );
} 