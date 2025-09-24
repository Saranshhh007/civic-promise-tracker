import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaEye, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Statement {
  id: string;
  title: string;
  official: string;
  category: string;
  date: string;
  status: 'completed' | 'in-progress' | 'pending';
}

const Statements: React.FC = () => {
  const [statements, setStatements] = useState<Statement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter and search states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Mock API call to fetch statements
    const fetchStatements = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock API response - would typically come from /api/statements
        const mockStatements: Statement[] = [
          {
            id: '1',
            title: 'Infrastructure Development in Rural Areas',
            official: 'Hon. Minister of Rural Development',
            category: 'Infrastructure',
            date: '2024-01-15',
            status: 'in-progress'
          },
          {
            id: '2',
            title: 'Digital India Initiative Phase 2',
            official: 'Hon. Minister of Electronics & IT',
            category: 'Technology',
            date: '2024-01-14',
            status: 'completed'
          },
          {
            id: '3',
            title: 'Healthcare Access Improvement Program',
            official: 'Hon. Minister of Health',
            category: 'Healthcare',
            date: '2024-01-13',
            status: 'pending'
          },
          {
            id: '4',
            title: 'Education Reform Implementation',
            official: 'Hon. Minister of Education',
            category: 'Education',
            date: '2024-01-12',
            status: 'in-progress'
          },
          {
            id: '5',
            title: 'Clean Energy Transition Plan',
            official: 'Hon. Minister of Power',
            category: 'Environment',
            date: '2024-01-11',
            status: 'completed'
          },
          {
            id: '6',
            title: 'Urban Planning and Smart Cities',
            official: 'Hon. Minister of Urban Development',
            category: 'Infrastructure',
            date: '2024-01-10',
            status: 'pending'
          },
          {
            id: '7',
            title: 'Agricultural Subsidy Distribution',
            official: 'Hon. Minister of Agriculture',
            category: 'Agriculture',
            date: '2024-01-09',
            status: 'in-progress'
          },
          {
            id: '8',
            title: 'Public Transportation Enhancement',
            official: 'Hon. Minister of Transport',
            category: 'Infrastructure',
            date: '2024-01-08',
            status: 'completed'
          },
          {
            id: '9',
            title: 'Cybersecurity Framework Development',
            official: 'Hon. Minister of Electronics & IT',
            category: 'Technology',
            date: '2024-01-07',
            status: 'in-progress'
          },
          {
            id: '10',
            title: 'Water Conservation Initiative',
            official: 'Hon. Minister of Water Resources',
            category: 'Environment',
            date: '2024-01-06',
            status: 'pending'
          },
          // Add more mock data to test pagination
          {
            id: '11',
            title: 'Financial Inclusion Program',
            official: 'Hon. Minister of Finance',
            category: 'Finance',
            date: '2024-01-05',
            status: 'completed'
          },
          {
            id: '12',
            title: 'Skill Development Initiative',
            official: 'Hon. Minister of Skill Development',
            category: 'Education',
            date: '2024-01-04',
            status: 'in-progress'
          }
        ];

        setStatements(mockStatements);
      } catch (err) {
        setError('Failed to fetch statements. Please try again.');
        console.error('Error fetching statements:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatements();
  }, []);

  // Filter statements based on search and filter criteria
  const filteredStatements = statements.filter(statement => {
    const matchesSearch = statement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         statement.official.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || statement.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || statement.category === categoryFilter;
    
    // Simple date filtering (would be more sophisticated in real app)
    let matchesDate = true;
    if (dateFilter === 'recent') {
      const statementDate = new Date(statement.date);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      matchesDate = statementDate >= thirtyDaysAgo;
    }

    return matchesSearch && matchesStatus && matchesCategory && matchesDate;
  });

  // Pagination
  const totalPages = Math.ceil(filteredStatements.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStatements = filteredStatements.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status: string) => {
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

  const getStatusLabel = (status: string) => {
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

  const categories = ['all', 'Infrastructure', 'Technology', 'Healthcare', 'Education', 'Environment', 'Agriculture', 'Finance'];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-64 mb-4"></div>
          <div className="h-16 bg-muted rounded mb-6"></div>
          <table className="table-modern">
            <thead>
              <tr>
                {[...Array(6)].map((_, i) => (
                  <th key={i}>
                    <div className="h-4 bg-muted rounded"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i}>
                  {[...Array(6)].map((_, j) => (
                    <td key={j}>
                      <div className="h-4 bg-muted rounded"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-status-error text-lg font-medium mb-2">Error Loading Statements</div>
        <p className="text-foreground-muted">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="btn-primary mt-4"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Government Statements</h1>
          <p className="text-foreground-muted mt-1">
            Track and monitor official government statements and promises
          </p>
        </div>
        <div className="text-sm text-foreground-muted">
          Showing {filteredStatements.length} of {statements.length} statements
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card-elegant">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground-muted h-4 w-4" />
            <input
              type="text"
              placeholder="Search statements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-surface text-foreground placeholder-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground-muted h-4 w-4" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
            >
              <option value="all">All Time</option>
              <option value="recent">Last 30 Days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Statements Table */}
      <div className="bg-surface rounded-lg shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-modern">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Official</th>
                <th>Category</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedStatements.map((statement) => (
                <tr key={statement.id}>
                  <td className="font-mono text-xs">#{statement.id}</td>
                  <td>
                    <div className="font-medium text-foreground max-w-xs">
                      {statement.title}
                    </div>
                  </td>
                  <td className="text-foreground-muted">{statement.official}</td>
                  <td>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-foreground">
                      {statement.category}
                    </span>
                  </td>
                  <td className="text-foreground-muted">
                    {new Date(statement.date).toLocaleDateString()}
                  </td>
                  <td>
                    <span className={`status-badge ${getStatusBadge(statement.status)}`}>
                      {getStatusLabel(statement.status)}
                    </span>
                  </td>
                  <td>
                    <Link
                      to={`/statement/${statement.id}`}
                      className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                    >
                      <FaEye className="mr-1 h-3 w-3" />
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="text-sm text-foreground-muted">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredStatements.length)} of {filteredStatements.length} results
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-foreground-muted hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaChevronLeft className="mr-1 h-3 w-3" />
                  Previous
                </button>
                
                <div className="flex space-x-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg ${
                        currentPage === i + 1
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground-muted hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-foreground-muted hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <FaChevronRight className="ml-1 h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Statements;