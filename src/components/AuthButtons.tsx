import React from 'react';
import { LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const AuthButtons: React.FC = () => {
  const { user, signIn, signUp, signOut } = useAuth();

  if (user) {
    return (
      <button
        onClick={signOut}
        className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
      >
        <span>Sign Out</span>
      </button>
    );
  }

  return (
    <div className="flex space-x-4">
      <button
        onClick={signIn}
        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        <LogIn className="w-4 h-4" />
        <span>Sign In</span>
      </button>
      <button
        onClick={signUp}
        className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
      >
        <UserPlus className="w-4 h-4" />
        <span>Sign Up</span>
      </button>
    </div>
  );
};