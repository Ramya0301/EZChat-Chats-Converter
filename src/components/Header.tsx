import React from 'react';
import { MessageSquare, HelpCircle } from 'lucide-react';

export function Header() {
  const handleHowToUse = () => {
    window.open('https://google.com', '_blank');
  };

  return (
    <div className="text-center mb-12">
      <div className="flex justify-center">
        <img 
          src="/src/ezlogo.jpg" 
          alt="EZ Tech Logo" 
          className="w-16 h-16 mx-auto"  // adjust size as needed
        />
      </div>
      <h1 className="mt-4 text-4xl font-extrabold text-gray-900">
        EZChat Converter
      </h1>
      <p className="mt-2 text-lg text-gray-600">
        EZChat - Version1 to Version2 Chats
      </p>
      <button
        onClick={handleHowToUse}
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-base font-bold rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
      >
        <HelpCircle className="w-5 h-5 mr-2" />
        How to Use?
      </button>
    </div>
  );
}