import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaFileAlt, 
  FaChartBar, 
  FaTimes,
  FaBookmark,
  FaClock,
  FaCheckCircle 
} from 'react-icons/fa';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navigation = [
    {
      name: 'Overview',
      href: '/',
      icon: FaTachometerAlt,
      description: 'Dashboard overview'
    },
    {
      name: 'All Statements',
      href: '/statements',
      icon: FaFileAlt,
      description: 'Browse all statements'
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: FaChartBar,
      description: 'Data insights'
    },
  ];

  const quickActions = [
    {
      name: 'Recent Updates',
      icon: FaClock,
      count: 12
    },
    {
      name: 'Bookmarked',
      icon: FaBookmark,
      count: 5
    },
    {
      name: 'Completed',
      icon: FaCheckCircle,
      count: 28
    }
  ];

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-64 lg:overflow-y-auto lg:bg-sidebar lg:border-r lg:border-sidebar-border">
        <div className="flex h-full flex-col pt-16">
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <div className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActiveRoute(item.href)
                        ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    }`}
                  >
                    <Icon 
                      className={`mr-3 h-5 w-5 ${
                        isActiveRoute(item.href) ? 'text-sidebar-primary-foreground' : 'text-foreground-muted'
                      }`} 
                    />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className={`text-xs ${
                        isActiveRoute(item.href) ? 'text-sidebar-primary-foreground/80' : 'text-foreground-muted'
                      }`}>
                        {item.description}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <h3 className="px-3 text-xs font-semibold text-foreground-muted uppercase tracking-wider">
                Quick Actions
              </h3>
              <div className="mt-3 space-y-1">
                {quickActions.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.name}
                      className="group flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg transition-colors"
                    >
                      <div className="flex items-center">
                        <Icon className="mr-3 h-4 w-4 text-foreground-muted" />
                        {item.name}
                      </div>
                      <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-0.5 rounded-full">
                        {item.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar transform transition-transform duration-300 ease-in-out lg:hidden ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CS</span>
              </div>
              <span className="font-bold text-lg text-sidebar-foreground">CivicSamadhaan</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
            >
              <FaTimes className="h-5 w-5 text-sidebar-foreground" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <div className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={onClose}
                    className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActiveRoute(item.href)
                        ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    }`}
                  >
                    <Icon 
                      className={`mr-3 h-5 w-5 ${
                        isActiveRoute(item.href) ? 'text-sidebar-primary-foreground' : 'text-foreground-muted'
                      }`} 
                    />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className={`text-xs ${
                        isActiveRoute(item.href) ? 'text-sidebar-primary-foreground/80' : 'text-foreground-muted'
                      }`}>
                        {item.description}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;