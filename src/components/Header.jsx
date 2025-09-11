import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa';
import AuthModal from './AuthModal';

const Header = ({ onMenuClick }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock authentication state
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/' },
    { name: 'Statements', href: '/statements' },
    { name: 'Analytics', href: '/analytics' },
  ];

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border shadow-md">
        <div className="px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button and Logo */}
            <div className="flex items-center space-x-4">
              <button
                onClick={onMenuClick}
                className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Open menu"
              >
                <FaBars className="h-5 w-5 text-foreground" />
              </button>
              
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CS</span>
                </div>
                <span className="font-bold text-xl text-foreground hidden sm:block">
                  CivicSamadhaan
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActiveRoute(item.href)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground-muted hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <FaUser className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="hidden sm:block text-sm font-medium text-foreground">
                      John Doe
                    </span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-surface rounded-lg shadow-elegant border border-border">
                      <div className="py-1">
                        <button className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-muted">
                          <FaCog className="mr-3 h-4 w-4" />
                          Profile Settings
                        </button>
                        <button
                          onClick={() => setIsLoggedIn(false)}
                          className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-muted"
                        >
                          <FaSignOutAlt className="mr-3 h-4 w-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="btn-primary"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onLogin={() => {
          setIsLoggedIn(true);
          setShowAuthModal(false);
        }}
      />
    </>
  );
};

export default Header;