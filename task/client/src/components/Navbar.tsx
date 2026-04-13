import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, LogOut, Shield, User, Menu, X, CreditCard } from 'lucide-react';
import useAuthStore from '../store/authStore';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/login');
  };

  const NavLinks = () => (
    <>
      {isAuthenticated ? (
        <>
          <NavLink
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => 
              `flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${
                isActive 
                  ? 'text-emerald-600 dark:text-emerald-500 bg-emerald-50/50 dark:bg-emerald-500/10 rounded-lg' 
                  : 'text-gray-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-500'
              }`
            }
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </NavLink>
          <NavLink
            to="/plans"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => 
              `flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${
                isActive 
                  ? 'text-emerald-600 dark:text-emerald-500 bg-emerald-50/50 dark:bg-emerald-500/10 rounded-lg' 
                  : 'text-gray-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-500'
              }`
            }
          >
            <CreditCard className="w-4 h-4" />
            Plans
          </NavLink>

          {user?.role === 'admin' && (
            <NavLink
              to="/admin/subscriptions"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => 
                `flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-emerald-600 dark:text-emerald-500 bg-emerald-50/50 dark:bg-emerald-500/10 rounded-lg' 
                    : 'text-gray-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-500'
                }`
              }
            >
              <Shield className="w-4 h-4" />
              Subscriptions
            </NavLink>
          )}
        </>
      ) : (
        <>
          <NavLink
            to="/login"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => 
              `px-3 py-2 text-sm font-medium transition-colors ${
                isActive 
                  ? 'text-emerald-600 dark:text-emerald-500 bg-emerald-50/50 dark:bg-emerald-500/10 rounded-lg' 
                  : 'text-gray-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-500'
              }`
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => 
              `bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-200 dark:shadow-none text-center ${
                isActive ? 'ring-2 ring-emerald-400 ring-offset-2' : ''
              }`
            }
          >
            Get Started
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <>
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="flex-shrink-0 flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 block md:hidden lg:block">
                  SUBSCRIPTIONS
                </span>
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <NavLinks />
              {isAuthenticated && (
                <>
                  <div className="h-6 w-px bg-gray-200 dark:bg-slate-800 mx-2" />
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-slate-200">
                    <User className="w-4 h-4" />
                    {user?.name}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center cursor-pointer gap-1 text-gray-600 dark:text-slate-400 hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              )}
              <ThemeToggle />
            </div>

            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden fixed inset-0 z-[100] bg-white dark:bg-slate-900 overflow-y-auto">
          <div className="flex flex-col min-h-screen">
            <div className="flex items-center justify-between px-4 h-16 border-b border-gray-100 dark:border-slate-800 flex-shrink-0">
              <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                  SUBSCRIPTIONS
                </span>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-grow flex flex-col items-center justify-center gap-8 py-10 px-4 text-center">
              {isAuthenticated ? (
                <>
                  <NavLink
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => 
                      `flex items-center gap-3 text-3xl font-semibold transition-all active:scale-95 ${
                        isActive 
                          ? 'text-emerald-600 dark:text-emerald-400' 
                          : 'text-gray-800 dark:text-slate-100 hover:text-emerald-600 dark:hover:text-emerald-400'
                      }`
                    }
                  >
                    <LayoutDashboard className="w-8 h-8" />
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/plans"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => 
                      `flex items-center gap-3 text-3xl font-semibold transition-all active:scale-95 ${
                        isActive 
                          ? 'text-emerald-600 dark:text-emerald-400' 
                          : 'text-gray-800 dark:text-slate-100 hover:text-emerald-600 dark:hover:text-emerald-400'
                      }`
                    }
                  >
                    <CreditCard className="w-8 h-8" />
                    Plans
                  </NavLink>
                  {user?.role === 'admin' && (
                    <NavLink
                      to="/admin/subscriptions"
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) => 
                        `flex items-center gap-3 text-3xl font-semibold transition-all active:scale-95 ${
                          isActive 
                            ? 'text-emerald-600 dark:text-emerald-400' 
                            : 'text-gray-800 dark:text-slate-100 hover:text-emerald-600 dark:hover:text-emerald-400'
                        }`
                      }
                    >
                      <Shield className="w-8 h-8" />
                      Subscriptions
                    </NavLink>
                  )}
                  
                  <div className="w-20 h-px bg-gray-200 dark:bg-slate-800 my-4" />
                  
                  <div className="flex flex-col items-center gap-6">
                    <div className="flex items-center gap-3 text-xl font-medium text-gray-600 dark:text-slate-300">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm">
                        <User className="w-7 h-7" />
                      </div>
                      <span className="max-w-[200px] truncate">{user?.name}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center cursor-pointer gap-3 text-white bg-red-600 hover:bg-red-700 px-8 py-4 rounded-2xl font-bold text-xl shadow-lg shadow-red-200 dark:shadow-none transition-all active:scale-95"
                    >
                      <LogOut className="w-6 h-6" />
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => 
                      `text-3xl font-semibold transition-all ${
                        isActive 
                          ? 'text-emerald-600 dark:text-emerald-400' 
                          : 'text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400'
                      }`
                    }
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => 
                      `bg-emerald-600 text-white px-6 py-2 rounded-xl text-xl font-semibold hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-200 dark:shadow-none transform active:scale-95 ${
                        isActive ? 'ring-2 ring-emerald-400 ring-offset-2' : ''
                      }`
                    }
                  >
                    Get Started
                  </NavLink>
                </>
              )}
            </div>

            <div className="py-10 flex flex-col items-center gap-4 border-t border-gray-100 dark:border-slate-800 flex-shrink-0">
               <span className="text-sm font-medium text-gray-500 dark:text-slate-500 uppercase tracking-widest">Theme Settings</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
