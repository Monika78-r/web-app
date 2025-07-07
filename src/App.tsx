import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { TaskProvider } from './contexts/TaskContext';
import { ToastProvider } from './components/ui/Toast';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoginPage } from './components/auth/LoginPage';
import { Dashboard } from './components/dashboard/Dashboard';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  // Setup toast listener
  useEffect(() => {
    const handleToast = (event: any) => {
      // This will be handled by the ToastProvider
    };

    window.addEventListener('addToast', handleToast);
    return () => window.removeEventListener('addToast', handleToast);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return user ? (
    <TaskProvider>
      <Dashboard />
    </TaskProvider>
  ) : (
    <LoginPage />
  );
};

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;