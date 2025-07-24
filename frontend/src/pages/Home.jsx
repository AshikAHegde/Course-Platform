import React from 'react';

export default function Home() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Image Background */}
      <img
        src="https://images.unsplash.com/photo-1617721926586-4eecce739745?w=1920&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNsYXNzcm9vbXxlbnwwfHwwfHx8MA%3D%3D"
        alt="Classroom background"
        className="fixed top-0 left-0 w-screen h-screen object-cover z-0"
      />
      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center text-white px-4 w-full">
        <div className="w-full max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg animate-fadein-slow">Welcome to CoursePlatform</h1>
          <p className="text-xl md:text-2xl mb-8 font-medium animate-fadein-slow delay-200">Your journey to knowledge starts here. Explore, learn, and grow with our curated courses.</p>
          <a
            href="/signup"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 animate-bounce"
          >
            Get Started
          </a>
        </div>
      </div>
      {/* Light floating animation (bubbles) */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute left-1/4 bottom-0 w-8 h-8 bg-indigo-400/30 rounded-full animate-bubble1" />
        <div className="absolute left-1/2 bottom-10 w-6 h-6 bg-indigo-300/30 rounded-full animate-bubble2" />
        <div className="absolute right-1/3 bottom-4 w-10 h-10 bg-indigo-200/30 rounded-full animate-bubble3" />
      </div>
      {/* Animations */}
      <style>{`
        @keyframes fadein {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadein { animation: fadein 1.5s ease; }
        .animate-fadein-slow { animation: fadein 2.5s ease; }
        @keyframes bubble1 {
          0% { transform: translateY(0) scale(1); opacity: 0.7; }
          100% { transform: translateY(-400px) scale(1.2); opacity: 0; }
        }
        @keyframes bubble2 {
          0% { transform: translateY(0) scale(1); opacity: 0.6; }
          100% { transform: translateY(-350px) scale(1.1); opacity: 0; }
        }
        @keyframes bubble3 {
          0% { transform: translateY(0) scale(1); opacity: 0.5; }
          100% { transform: translateY(-300px) scale(1.3); opacity: 0; }
        }
        .animate-bubble1 { animation: bubble1 7s linear infinite; }
        .animate-bubble2 { animation: bubble2 6s linear infinite 2s; }
        .animate-bubble3 { animation: bubble3 8s linear infinite 4s; }
      `}</style>
    </div>
  );
} 