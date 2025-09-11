import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFileAlt, 
  FaCheckCircle, 
  FaClock, 
  FaExclamationTriangle,
  FaChartBar,
  FaArrowRight,
} from 'react-icons/fa';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStatements: 0,
    completed: 0,
    inProgress: 0,
    pending: 0
  });
  const [recentStatements, setRecentStatements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call for dashboard data
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock API response
        const mockStats = {
          totalStatements: 156,
          completed: 45,
          inProgress: 67,
          pending: 44
        };

        const mockRecentStatements = [
          {
            id: '1',
            title: 'Infrastructure Development in Rural Areas',
            official: 'Hon. Minister of Rural Development',
            date: '2024-01-15',
            status: 'in-progress'
          },
          {
            id: '2',
            title: 'Digital India Initiative Phase 2',
            official: 'Hon. Minister of Electronics & IT',
            date: '2024-01-14',
            status: 'completed'
          },
          {
            id: '3',
            title: 'Healthcare Access Improvement Program',
            official: 'Hon. Minister of Health',
            date: '2024-01-13',
            status: 'pending'
          },
          {
            id: '4',
            title: 'Education Reform Implementation',
            official: 'Hon. Minister of Education',
            date: '2024-01-12',
            status: 'in-progress'
          },
          {
            id: '5',
            title: 'Clean Energy Transition Plan',
            official: 'Hon. Minister of Power',
            date: '2024-01-11',
            status: 'completed'
          }
        ];

        setStats(mockStats);
        setRecentStatements(mockRecentStatements);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: 'Total Statements',
      value: stats.totalStatements,
      icon: FaFileAlt,
      color: 'bg-primary',
      textColor: 'text-primary-foreground'
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: FaCheckCircle,
      color: 'bg-status-success',
      textColor: 'text-white'
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: FaClock,
      color: 'bg-status-pending',
      textColor: 'text-white'
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: FaExclamationTriangle,
      color: 'bg-status-warning',
      textColor: 'text-white'
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return 'status-completed';
      case 'in-progress':
        return 'status-in-progress';
      case 'pending':
        return 'status-pending';
      default:
        return 'status-pending';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'pending':
        return 'Pending';
      default:
        return 'Unknown';
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        {/* Loading skeleton */}
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-64 mb-2"></div>
          <div className="h-4 bg-muted rounded w-96"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card-elegant animate-pulse">
              <div className="h-6 bg-muted rounded w-24 mb-4"></div>
              <div className="h-8 bg-muted rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-primary rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, John Doe</h1>
            <p className="text-white/90 text-lg">
              Track government statements and monitor their progress
            </p>
          </div>
          <div className="hidden lg:block">
            <FaChartBar className="h-16 w-16 text-white/30" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="card-elegant hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground-muted mb-1">
                    {card.title}
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {card.value}
                  </p>
                </div>
                <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}>
                  <Icon className={`h-6 w-6 ${card.textColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Chart */}
        <div className="card-elegant">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Statements by Category</h3>
            <FaChartBar className="h-5 w-5 text-foreground-muted" />
          </div>
          
          {/* Simple CSS-based bar chart */}
          <div className="space-y-4">
            {[
              { name: 'Infrastructure', value: 30, color: 'bg-primary' },
              { name: 'Healthcare', value: 25, color: 'bg-status-success' },
              { name: 'Education', value: 20, color: 'bg-status-pending' },
              { name: 'Technology', value: 15, color: 'bg-status-warning' },
              { name: 'Environment', value: 10, color: 'bg-status-error' }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-24 text-sm text-foreground-muted font-medium">
                  {item.name}
                </div>
                <div className="flex-1 bg-muted rounded-full h-3">
                  <div 
                    className={`h-3 ${item.color} rounded-full transition-all duration-500`}
                    style={{ width: `${item.value * 2}%` }}
                  ></div>
                </div>
                <div className="w-12 text-sm text-foreground font-medium text-right">
                  {item.value}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card-elegant">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Recent Statements</h3>
            <Link 
              to="/statements"
              className="text-primary hover:text-primary-hover text-sm font-medium flex items-center space-x-1"
            >
              <span>View All</span>
              <FaArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-4">
            {recentStatements.map((statement) => (
              <div key={statement.id} className="border border-border rounded-lg p-4 hover:bg-surface-hover transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1 line-clamp-2">
                      {statement.title}
                    </h4>
                    <p className="text-sm text-foreground-muted mb-2">
                      {statement.official}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-foreground-muted">
                        {new Date(statement.date).toLocaleDateString()}
                      </span>
                      <span className={`status-badge ${getStatusBadge(statement.status)}`}>
                        {getStatusLabel(statement.status)}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/statement/${statement.id}`}
                    className="ml-4 text-primary hover:text-primary-hover text-sm font-medium"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;