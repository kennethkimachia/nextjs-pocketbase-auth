"use client";
import { useState } from 'react';
import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold text-center mb-6">{isLogin ? 'Log In' : 'Sign Up'}</h2>
        
        {/* Render Login or Signup form based on isLogin state */}
        {isLogin ? <LoginForm /> : <SignupForm />}
        
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:underline"
          >
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Log In'}
          </button>
        </div>
      </div>
    </div>
  );
}
