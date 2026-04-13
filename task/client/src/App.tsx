import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PlansPage from './pages/PlansPage';
import DashboardPage from './pages/DashboardPage';
import AdminSubscriptionsPage from './pages/AdminSubscriptionsPage';
import { useThemeStore } from './store/themeStore';
import { Toaster } from 'sonner';

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <Toaster richColors closeButton position="top-right" />
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Protected User Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/plans" element={<PlansPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </Route>

            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute adminOnly={true} />}>
              <Route path="/admin/subscriptions" element={<AdminSubscriptionsPage />} />
            </Route>

            <Route path="/" element={<Navigate to="/plans" replace />} />
          </Routes>
        </main>
        
        <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 py-8 transition-colors">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500 dark:text-slate-400">
            © {new Date().getFullYear()} . All rights reserved.  Subscription Management.
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
