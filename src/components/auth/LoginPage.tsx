import React, { useState } from 'react';
import { Github, Chrome, Facebook, CheckSquare, Sparkles, Users, Clock, Shield } from 'lucide-react';
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
    <div className="min-h-screen flex bg-black">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-black relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-red-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 flex flex-col justify-center px-12 text-red-500">
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="bg-red-500/20 backdrop-blur-sm p-3 rounded-xl mr-4">
                <CheckSquare className="w-8 h-8 text-red-500" />
              </div>
              <h1 className="text-3xl font-bold text-red-500">TaskFlow</h1>
            </div>
            <h2 className="text-4xl font-bold mb-4 leading-tight text-red-500">
              Streamline Your Workflow
            </h2>
            <p className="text-xl text-red-400 leading-relaxed">
              Collaborate, organize, and achieve more with our intuitive task management platform.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="bg-red-500/20 backdrop-blur-sm p-2 rounded-lg mr-4">
                <Users className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold text-red-500">Team Collaboration</h3>
                <p className="text-red-400 text-sm">Work together seamlessly</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-red-500/20 backdrop-blur-sm p-2 rounded-lg mr-4">
                <Clock className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold text-red-500">Real-time Updates</h3>
                <p className="text-red-400 text-sm">Stay in sync with your team</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-red-500/20 backdrop-blur-sm p-2 rounded-lg mr-4">
                <Shield className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold text-red-500">Secure & Reliable</h3>
                <p className="text-red-400 text-sm">Your data is protected</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-black">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-red-500 p-3 rounded-xl mr-3">
                <CheckSquare className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-red-500">TaskFlow</h1>
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-800">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-red-500 mb-2">
                Welcome back
              </h2>
              <p className="text-red-400">
                Sign in to continue to your workspace
              </p>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-4">
              <Button
                onClick={() => handleSignIn('google')}
                loading={loading === 'google'}
                variant="outline"
                size="lg"
                className="w-full flex items-center justify-center space-x-3 py-4 hover:bg-gray-800 transition-all duration-200 border-gray-700 hover:border-red-500 bg-gray-800 text-red-500"
              >
                <Chrome className="w-5 h-5 text-red-500" />
                <span className="font-medium">Continue with Google</span>
              </Button>

              <Button
                onClick={() => handleSignIn('github')}
                loading={loading === 'github'}
                variant="outline"
                size="lg"
                className="w-full flex items-center justify-center space-x-3 py-4 hover:bg-gray-800 transition-all duration-200 border-gray-700 hover:border-red-500 bg-gray-800 text-red-500"
              >
                <Github className="w-5 h-5 text-red-500" />
                <span className="font-medium">Continue with GitHub</span>
              </Button>

              <Button
                onClick={() => handleSignIn('facebook')}
                loading={loading === 'facebook'}
                variant="outline"
                size="lg"
                className="w-full flex items-center justify-center space-x-3 py-4 hover:bg-gray-800 transition-all duration-200 border-gray-700 hover:border-red-500 bg-gray-800 text-red-500"
              >
                <Facebook className="w-5 h-5 text-red-500" />
                <span className="font-medium">Continue with Facebook</span>
              </Button>
            </div>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-900 text-red-400">New to TaskFlow?</span>
              </div>
            </div>

            {/* Sign up link */}
            <div className="text-center">
              <p className="text-red-400 text-sm">
                Don't have an account?{' '}
                <button className="text-red-500 hover:text-red-400 font-medium transition-colors">
                  Get started for free
                </button>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-red-400 text-sm">
              By signing in, you agree to our{' '}
              <button className="text-red-500 hover:text-red-400 underline">Terms of Service</button>
              {' '}and{' '}
              <button className="text-red-500 hover:text-red-400 underline">Privacy Policy</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};