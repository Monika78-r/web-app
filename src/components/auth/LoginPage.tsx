import React, { useState } from 'react';
import { Github, Chrome, Facebook, CheckSquare } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';

export const LoginPage: React.FC = () => {
  const { signIn } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSignIn = async (provider: 'google' | 'github' | 'facebook') => {
    try {
      setLoading(provider);
      await signIn(provider);
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full">
              <CheckSquare className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome to TaskFlow</h2>
          <p className="mt-2 text-gray-600">
            Your collaborative task management solution
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-6">
              Sign in to your account
            </h3>

            {/* Social Login Buttons */}
            <div className="space-y-3">
              <Button
                onClick={() => handleSignIn('google')}
                loading={loading === 'google'}
                variant="outline"
                className="w-full flex items-center justify-center space-x-3 py-3"
              >
                <Chrome className="w-5 h-5 text-red-500" />
                <span>Continue with Google</span>
              </Button>

              <Button
                onClick={() => handleSignIn('github')}
                loading={loading === 'github'}
                variant="outline"
                className="w-full flex items-center justify-center space-x-3 py-3"
              >
                <Github className="w-5 h-5 text-gray-900" />
                <span>Continue with GitHub</span>
              </Button>

              <Button
                onClick={() => handleSignIn('facebook')}
                loading={loading === 'facebook'}
                variant="outline"
                className="w-full flex items-center justify-center space-x-3 py-3"
              >
                <Facebook className="w-5 h-5 text-blue-600" />
                <span>Continue with Facebook</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h4 className="font-semibold text-gray-900 mb-4">Why TaskFlow?</h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-center">
              <CheckSquare className="w-4 h-4 text-green-500 mr-3" />
              Create and organize tasks with ease
            </li>
            <li className="flex items-center">
              <CheckSquare className="w-4 h-4 text-green-500 mr-3" />
              Collaborate with team members in real-time
            </li>
            <li className="flex items-center">
              <CheckSquare className="w-4 h-4 text-green-500 mr-3" />
              Track progress and stay on schedule
            </li>
            <li className="flex items-center">
              <CheckSquare className="w-4 h-4 text-green-500 mr-3" />
              Access your tasks from anywhere
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};