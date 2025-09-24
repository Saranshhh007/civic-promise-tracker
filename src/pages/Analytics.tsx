import React, { useState, useEffect } from 'react';
import { 
  FaChartPie, 
  FaChartLine, 
  FaClock,
  FaChartBar
} from 'react-icons/fa';

interface AnalyticsData {
  statusDistribution: {
    completed: number;
    inProgress: number;
    pending: number;
  };
  monthlyData: {
    month: string;
    statements: number;
    completed: number;
  }[];
  categoryStats: {
    category: string;
    count: number;
    completionRate: number;
  }[];
  trends: {
    totalChange: number;
    completedChange: number;
    avgCompletionTime: number;
  };
}

const Analytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Mock API call to fetch analytics data
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock API response - would typically come from /api/analytics
        const mockAnalyticsData: AnalyticsData = {
          statusDistribution: {
            completed: 45,
            inProgress: 67,
            pending: 44
          },
          monthlyData: [
            { month: 'Jan', statements: 25, completed: 15 },
            { month: 'Feb', statements: 32, completed: 20 },
            { month: 'Mar', statements: 28, completed: 18 },
            { month: 'Apr', statements: 35, completed: 25 },
            { month: 'May', statements: 42, completed: 30 },
            { month: 'Jun', statements: 38, completed: 28 }
          ],
          categoryStats: [
            { category: 'Infrastructure', count: 35, completionRate: 68 },
            { category: 'Healthcare', count: 28, completionRate: 75 },
            { category: 'Education', count: 22, completionRate: 82 },
            { category: 'Technology', count: 19, completionRate: 63 },
            { category: 'Environment', count: 16, completionRate: 71 },
            { category: 'Agriculture', count: 12, completionRate: 58 }
          ],
          trends: {
            totalChange: 15.2,
            completedChange: 8.7,
            avgCompletionTime: 45
          }
        };

        setAnalyticsData(mockAnalyticsData);
      } catch (err) {
        setError('Failed to fetch analytics data. Please try again.');
        console.error('Error fetching analytics data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  const getTrendIcon = (change: number) => {
    if (change > 0) return FaChartLine;
    if (change < 0) return FaChartLine;
    return FaChartLine;
  };

  const getTrendColor = (change: number) => {
    if (change > 0) return 'text-status-success';
    if (change < 0) return 'text-status-error';
    return 'text-foreground-muted';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-64 mb-4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="card-elegant">
                <div className="h-6 bg-muted rounded w-48 mb-4"></div>
                <div className="h-64 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !analyticsData) {
    return (
      <div className="text-center py-12">
        <div className="text-status-error text-lg font-medium mb-2">
          {error || 'Analytics data not available'}
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  const totalStatements = analyticsData.statusDistribution.completed + 
                         analyticsData.statusDistribution.inProgress + 
                         analyticsData.statusDistribution.pending;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics Dashboard</h1>
        <p className="text-foreground-muted mt-1">
          Insights and trends from government statement tracking
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-elegant">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground-muted">Total Statements</p>
              <p className="text-2xl font-bold text-foreground">{totalStatements}</p>
              <div className="flex items-center mt-2">
                {React.createElement(getTrendIcon(analyticsData.trends.totalChange), {
                  className: `h-4 w-4 mr-1 ${getTrendColor(analyticsData.trends.totalChange)}`
                })}
                <span className={`text-sm font-medium ${getTrendColor(analyticsData.trends.totalChange)}`}>
                  {analyticsData.trends.totalChange > 0 ? '+' : ''}{analyticsData.trends.totalChange}%
                </span>
                <span className="text-sm text-foreground-muted ml-1">vs last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <FaChartLine className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
        </div>

        <div className="card-elegant">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground-muted">Completed</p>
              <p className="text-2xl font-bold text-foreground">{analyticsData.statusDistribution.completed}</p>
              <div className="flex items-center mt-2">
                {React.createElement(getTrendIcon(analyticsData.trends.completedChange), {
                  className: `h-4 w-4 mr-1 ${getTrendColor(analyticsData.trends.completedChange)}`
                })}
                <span className={`text-sm font-medium ${getTrendColor(analyticsData.trends.completedChange)}`}>
                  {analyticsData.trends.completedChange > 0 ? '+' : ''}{analyticsData.trends.completedChange}%
                </span>
                <span className="text-sm text-foreground-muted ml-1">completion rate</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-status-success rounded-lg flex items-center justify-center">
              <FaChartLine className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card-elegant">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground-muted">Avg. Completion Time</p>
              <p className="text-2xl font-bold text-foreground">{analyticsData.trends.avgCompletionTime} days</p>
              <p className="text-sm text-foreground-muted mt-2">
                Based on completed statements
              </p>
            </div>
            <div className="w-12 h-12 bg-status-pending rounded-lg flex items-center justify-center">
              <FaClock className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Status Distribution Pie Chart */}
        <div className="card-elegant">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Status Distribution</h3>
            <FaChartPie className="h-5 w-5 text-foreground-muted" />
          </div>
          
          {/* Simple CSS-based pie chart representation */}
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48 mb-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="hsl(var(--status-success))"
                  strokeWidth="20"
                  strokeDasharray={`${(analyticsData.statusDistribution.completed / totalStatements) * 251.2} 251.2`}
                  strokeDashoffset="0"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="hsl(var(--status-pending))"
                  strokeWidth="20"
                  strokeDasharray={`${(analyticsData.statusDistribution.inProgress / totalStatements) * 251.2} 251.2`}
                  strokeDashoffset={`-${(analyticsData.statusDistribution.completed / totalStatements) * 251.2}`}
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="hsl(var(--status-warning))"
                  strokeWidth="20"
                  strokeDasharray={`${(analyticsData.statusDistribution.pending / totalStatements) * 251.2} 251.2`}
                  strokeDashoffset={`-${((analyticsData.statusDistribution.completed + analyticsData.statusDistribution.inProgress) / totalStatements) * 251.2}`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{totalStatements}</div>
                  <div className="text-sm text-foreground-muted">Total</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 w-full">
              <div className="text-center">
                <div className="w-4 h-4 bg-status-success rounded mx-auto mb-1"></div>
                <div className="text-sm font-medium text-foreground">Completed</div>
                <div className="text-lg font-bold text-foreground">{analyticsData.statusDistribution.completed}</div>
                <div className="text-xs text-foreground-muted">
                  {Math.round((analyticsData.statusDistribution.completed / totalStatements) * 100)}%
                </div>
              </div>
              <div className="text-center">
                <div className="w-4 h-4 bg-status-pending rounded mx-auto mb-1"></div>
                <div className="text-sm font-medium text-foreground">In Progress</div>
                <div className="text-lg font-bold text-foreground">{analyticsData.statusDistribution.inProgress}</div>
                <div className="text-xs text-foreground-muted">
                  {Math.round((analyticsData.statusDistribution.inProgress / totalStatements) * 100)}%
                </div>
              </div>
              <div className="text-center">
                <div className="w-4 h-4 bg-status-warning rounded mx-auto mb-1"></div>
                <div className="text-sm font-medium text-foreground">Pending</div>
                <div className="text-lg font-bold text-foreground">{analyticsData.statusDistribution.pending}</div>
                <div className="text-xs text-foreground-muted">
                  {Math.round((analyticsData.statusDistribution.pending / totalStatements) * 100)}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Trends Line Chart */}
        <div className="card-elegant">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Monthly Trends</h3>
            <FaChartLine className="h-5 w-5 text-foreground-muted" />
          </div>
          
          {/* Simple CSS-based line chart representation */}
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-foreground-muted mb-4">
              <span>Statements Over Time</span>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-primary rounded-full mr-1"></div>
                  <span>Total</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-status-success rounded-full mr-1"></div>
                  <span>Completed</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              {analyticsData.monthlyData.map((data, index) => (
                <div key={data.month} className="flex items-center space-x-3">
                  <div className="w-8 text-xs text-foreground-muted font-medium">
                    {data.month}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div 
                          className="h-2 bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${(data.statements / 50) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-foreground w-6">{data.statements}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div 
                          className="h-2 bg-status-success rounded-full transition-all duration-500"
                          style={{ width: `${(data.completed / 50) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-foreground w-6">{data.completed}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Performance */}
        <div className="card-elegant lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Category Performance</h3>
            <FaChartBar className="h-5 w-5 text-foreground-muted" />
          </div>
          
          <div className="space-y-4">
            {analyticsData.categoryStats.map((category, index) => (
              <div key={category.category} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">{category.category}</h4>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-foreground-muted">
                        {category.count} statements
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {category.completionRate}% completed
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-surface rounded-full h-2">
                    <div 
                      className="h-2 bg-gradient-primary rounded-full transition-all duration-500"
                      style={{ width: `${category.completionRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;