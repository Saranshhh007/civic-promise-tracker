import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaCalendar, 
  FaUser, 
  FaTag, 
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle
} from 'react-icons/fa';

interface StatementDetail {
  id: string;
  title: string;
  content: string;
  official: string;
  category: string;
  date: string;
  status: 'completed' | 'in-progress' | 'pending';
  description: string;
  timeline: TimelineEvent[];
}

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'announcement' | 'progress' | 'completion' | 'update';
}

const StatementDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [statement, setStatement] = useState<StatementDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Mock API call to fetch statement details
    const fetchStatementDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock API response - would typically come from /api/statements/${id}
        const mockStatement: StatementDetail = {
          id: id || '1',
          title: 'Infrastructure Development in Rural Areas',
          content: `This comprehensive initiative aims to transform rural infrastructure across the nation through strategic investments in roads, bridges, telecommunications, and essential services. The program encompasses multiple phases designed to bridge the urban-rural divide and ensure equitable development opportunities for all citizens.

Key components of this initiative include:

1. **Road Connectivity**: Construction of 5,000 km of new rural roads and improvement of existing infrastructure to connect remote villages with major commercial centers.

2. **Digital Infrastructure**: Deployment of high-speed internet connectivity to over 2,000 villages, enabling access to digital services, online education, and e-commerce opportunities.

3. **Water and Sanitation**: Implementation of clean water supply systems and modern sanitation facilities in 1,500 villages, directly benefiting over 500,000 residents.

4. **Healthcare Access**: Establishment of 200 primary healthcare centers equipped with telemedicine capabilities to ensure quality healthcare reaches every corner of rural India.

5. **Educational Infrastructure**: Construction and modernization of 300 schools with digital classrooms and libraries to enhance educational opportunities for rural children.

The project is being executed in partnership with state governments, local authorities, and community organizations to ensure maximum impact and sustainability. Regular monitoring and evaluation mechanisms have been established to track progress and ensure accountability.`,
          official: 'Hon. Minister of Rural Development',
          category: 'Infrastructure',
          date: '2024-01-15',
          status: 'in-progress',
          description: 'A comprehensive program to improve infrastructure in rural areas including roads, digital connectivity, and essential services.',
          timeline: [
            {
              id: '1',
              date: '2024-01-15',
              title: 'Program Announcement',
              description: 'Official announcement of the Rural Infrastructure Development Initiative with detailed implementation plan.',
              type: 'announcement'
            },
            {
              id: '2',
              date: '2024-01-20',
              title: 'Phase 1 Launch',
              description: 'Launched Phase 1 covering 500 villages across 10 states with focus on road connectivity.',
              type: 'progress'
            },
            {
              id: '3',
              date: '2024-02-01',
              title: 'Digital Infrastructure Rollout',
              description: 'Began deployment of fiber optic cables and 4G towers in identified rural areas.',
              type: 'progress'
            },
            {
              id: '4',
              date: '2024-02-15',
              title: 'First Milestone Achieved',
              description: 'Successfully completed road connectivity for 100 villages, benefiting 50,000 residents.',
              type: 'progress'
            },
            {
              id: '5',
              date: '2024-03-01',
              title: 'Healthcare Centers Operational',
              description: 'First batch of 25 healthcare centers became operational with telemedicine facilities.',
              type: 'progress'
            }
          ]
        };

        setStatement(mockStatement);
      } catch (err) {
        setError('Failed to fetch statement details. Please try again.');
        console.error('Error fetching statement details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStatementDetail();
    }
  }, [id]);

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

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'announcement':
        return FaExclamationTriangle;
      case 'progress':
        return FaClock;
      case 'completion':
        return FaCheckCircle;
      default:
        return FaClock;
    }
  };

  const getTimelineColor = (type: string) => {
    switch (type) {
      case 'announcement':
        return 'bg-primary text-primary-foreground';
      case 'progress':
        return 'bg-status-pending text-white';
      case 'completion':
        return 'bg-status-success text-white';
      default:
        return 'bg-muted text-foreground-muted';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-32 mb-6"></div>
          <div className="card-elegant">
            <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
            <div className="space-y-2 mb-6">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/6"></div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-16 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !statement) {
    return (
      <div className="text-center py-12">
        <div className="text-status-error text-lg font-medium mb-2">
          {error || 'Statement not found'}
        </div>
        <Link to="/statements" className="btn-primary">
          Back to Statements
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Navigation */}
      <Link 
        to="/statements"
        className="inline-flex items-center text-primary hover:text-primary-hover font-medium"
      >
        <FaArrowLeft className="mr-2 h-4 w-4" />
        Back to Statements
      </Link>

      {/* Statement Header */}
      <div className="card-elegant">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground mb-3">
              {statement.title}
            </h1>
            <p className="text-lg text-foreground-muted mb-4">
              {statement.description}
            </p>
          </div>
          <span className={`status-badge ${getStatusBadge(statement.status)}`}>
            {getStatusLabel(statement.status)}
          </span>
        </div>

        {/* Meta Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-2">
            <FaUser className="h-4 w-4 text-foreground-muted" />
            <div>
              <div className="text-xs text-foreground-muted">Official</div>
              <div className="text-sm font-medium text-foreground">{statement.official}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <FaTag className="h-4 w-4 text-foreground-muted" />
            <div>
              <div className="text-xs text-foreground-muted">Category</div>
              <div className="text-sm font-medium text-foreground">{statement.category}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <FaCalendar className="h-4 w-4 text-foreground-muted" />
            <div>
              <div className="text-xs text-foreground-muted">Date</div>
              <div className="text-sm font-medium text-foreground">
                {new Date(statement.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="text-xs text-foreground-muted">Statement ID</div>
            <div className="text-sm font-mono font-medium text-foreground">#{statement.id}</div>
          </div>
        </div>
      </div>

      {/* Statement Content */}
      <div className="card-elegant">
        <h2 className="text-xl font-semibold text-foreground mb-4">Full Statement</h2>
        <div className="prose prose-gray max-w-none">
          {statement.content.split('\n').map((paragraph, index) => {
            if (paragraph.trim() === '') return null;
            
            // Handle headings (lines starting with ##)
            if (paragraph.startsWith('##')) {
              return (
                <h3 key={index} className="text-lg font-semibold text-foreground mt-6 mb-3">
                  {paragraph.replace('##', '').trim()}
                </h3>
              );
            }
            
            // Handle numbered points (lines starting with numbers)
            if (/^\d+\./.test(paragraph.trim())) {
              const [, number, content] = paragraph.match(/^(\d+\.\s*)(.*)/) || [];
              if (content.startsWith('**') && content.includes('**:')) {
                const [, title, description] = content.match(/\*\*(.*?)\*\*:\s*(.*)/) || [];
                return (
                  <div key={index} className="mb-4">
                    <div className="flex items-start space-x-3">
                      <span className="text-primary font-semibold">{number}</span>
                      <div>
                        <h4 className="font-semibold text-foreground">{title}</h4>
                        <p className="text-foreground-muted mt-1">{description}</p>
                      </div>
                    </div>
                  </div>
                );
              }
            }
            
            return (
              <p key={index} className="text-foreground-muted mb-4 leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>
      </div>

      {/* Timeline */}
      <div className="card-elegant">
        <h2 className="text-xl font-semibold text-foreground mb-6">Progress Timeline</h2>
        <div className="space-y-6">
          {statement.timeline.map((event, index) => {
            const Icon = getTimelineIcon(event.type);
            return (
              <div key={event.id} className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getTimelineColor(event.type)}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 pb-6">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-medium text-foreground">{event.title}</h3>
                    <span className="text-sm text-foreground-muted">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <p className="text-foreground-muted">{event.description}</p>
                  {index < statement.timeline.length - 1 && (
                    <div className="w-px h-6 bg-border ml-5 mt-4"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatementDetail;