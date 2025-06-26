import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationsPanel = ({ 
  recommendations, 
  onBookmark, 
  isCollapsed = false, 
  onToggleCollapse 
}) => {
  const [activeTab, setActiveTab] = useState('certifications');
  const [bookmarkedItems, setBookmarkedItems] = useState(new Set());

  const mockRecommendations = {
    certifications: [
      {
        id: 1,
        title: "Advanced Cardiac Life Support (ACLS)",
        provider: "American Heart Association",
        priority: "high",
        timeToComplete: "2-3 weeks",
        cost: "$350",
        description: "Essential certification for cardiology specialization",
        requirements: ["Basic Life Support (BLS)", "Medical License"],
        nextAvailable: "2024-02-15",
        isBookmarked: false
      },
      {
        id: 2,
        title: "Board Certification in Cardiology",
        provider: "American Board of Internal Medicine",
        priority: "critical",
        timeToComplete: "6 months prep",
        cost: "$2,500",
        description: "Required for practicing as a cardiologist",
        requirements: ["Fellowship Completion", "Clinical Experience"],
        nextAvailable: "2024-10-01",
        isBookmarked: false
      },
      {
        id: 3,
        title: "Echocardiography Certification",
        provider: "National Board of Echocardiography",
        priority: "medium",
        timeToComplete: "3-4 months",
        cost: "$1,200",
        description: "Specialized imaging certification for cardiac diagnostics",
        requirements: ["Cardiology Training", "Case Log"],
        nextAvailable: "2024-03-01",
        isBookmarked: false
      }
    ],
    skills: [
      {
        id: 4,
        title: "Interventional Cardiology Procedures",
        category: "Clinical Skills",
        priority: "high",
        timeToComplete: "12-18 months",
        description: "Advanced catheterization and intervention techniques",
        resources: ["Fellowship Training", "Simulation Lab", "Mentorship"],
        proficiencyLevel: "Advanced",
        isBookmarked: false
      },
      {
        id: 5,
        title: "Healthcare Leadership & Management",
        category: "Soft Skills",
        priority: "medium",
        timeToComplete: "6 months",
        description: "Essential skills for career advancement in healthcare",
        resources: ["Online Courses", "MBA Programs", "Leadership Workshops"],
        proficiencyLevel: "Intermediate",
        isBookmarked: false
      },
      {
        id: 6,
        title: "Medical Research & Publication",
        category: "Academic Skills",
        priority: "medium",
        timeToComplete: "Ongoing",
        description: "Research methodology and academic writing skills",
        resources: ["Research Mentorship", "Writing Workshops", "Statistical Training"],
        proficiencyLevel: "Intermediate",
        isBookmarked: false
      }
    ],
    networking: [
      {
        id: 7,
        title: "American College of Cardiology (ACC)",
        type: "Professional Association",
        priority: "high",
        membershipCost: "$395/year",
        description: "Premier cardiovascular professional organization",
        benefits: ["Conferences", "Continuing Education", "Networking", "Research Access"],
        nextEvent: "ACC Scientific Conference 2024",
        isBookmarked: false
      },
      {
        id: 8,
        title: "Local Cardiology Society Meetings",
        type: "Local Network",
        priority: "medium",
        membershipCost: "Free",
        description: "Regional networking and case discussions",
        benefits: ["Case Studies", "Local Referrals", "Mentorship"],
        nextEvent: "Monthly Meeting - Feb 20, 2024",
        isBookmarked: false
      },
      {
        id: 9,
        title: "Medical LinkedIn Professional Groups",
        type: "Online Community",
        priority: "low",
        membershipCost: "Free",
        description: "Digital networking and knowledge sharing",
        benefits: ["Industry Updates", "Job Opportunities", "Peer Discussions"],
        nextEvent: "Weekly Discussions",
        isBookmarked: false
      }
    ]
  };

  const tabs = [
    { id: 'certifications', label: 'Certifications', icon: 'Award', count: mockRecommendations.certifications.length },
    { id: 'skills', label: 'Skills', icon: 'TrendingUp', count: mockRecommendations.skills.length },
    { id: 'networking', label: 'Networking', icon: 'Users', count: mockRecommendations.networking.length }
  ];

  const handleBookmark = (itemId) => {
    const newBookmarked = new Set(bookmarkedItems);
    if (newBookmarked.has(itemId)) {
      newBookmarked.delete(itemId);
    } else {
      newBookmarked.add(itemId);
    }
    setBookmarkedItems(newBookmarked);
    onBookmark?.(itemId, !bookmarkedItems.has(itemId));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-error bg-error-50 border-error-200';
      case 'high': return 'text-warning bg-warning-50 border-warning-200';
      case 'medium': return 'text-primary bg-primary-50 border-primary-200';
      default: return 'text-secondary-600 bg-secondary-50 border-secondary-200';
    }
  };

  if (isCollapsed) {
    return (
      <div className="w-16 bg-surface border-l border-border h-full flex flex-col items-center py-4 space-y-4">
        <button
          onClick={onToggleCollapse}
          className="p-3 hover:bg-secondary-50 rounded-medical medical-transition"
          title="Expand Recommendations"
        >
          <Icon name="Lightbulb" size={20} />
        </button>
        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
          {Object.values(mockRecommendations).flat().length}
        </div>
      </div>
    );
  }

  return (
    <div className="w-96 bg-surface border-l border-border h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Recommendations</h2>
          <button
            onClick={onToggleCollapse}
            className="p-2 hover:bg-secondary-50 rounded-medical medical-transition"
            title="Collapse Recommendations"
          >
            <Icon name="PanelRightClose" size={16} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-secondary-100 rounded-medical p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-medical text-sm font-medium medical-transition ${
                activeTab === tab.id
                  ? 'bg-surface text-primary medical-shadow-card'
                  : 'text-text-secondary hover:text-primary'
              }`}
            >
              <Icon name={tab.icon} size={14} />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="text-xs bg-current text-surface rounded-full w-5 h-5 flex items-center justify-center opacity-60">
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {mockRecommendations[activeTab]?.map((item) => (
            <div
              key={item.id}
              className="bg-surface border border-border rounded-medical-card p-4 medical-shadow-card hover:medical-shadow-floating medical-transition"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-medium text-text-primary mb-1">{item.title}</h3>
                  <p className="text-sm text-text-secondary">
                    {item.provider || item.category || item.type}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(item.priority)}`}>
                    {item.priority}
                  </div>
                  <button
                    onClick={() => handleBookmark(item.id)}
                    className={`p-1 rounded-medical medical-transition ${
                      bookmarkedItems.has(item.id)
                        ? 'text-warning bg-warning-50' :'text-text-muted hover:text-warning hover:bg-warning-50'
                    }`}
                  >
                    <Icon name="Bookmark" size={16} />
                  </button>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-text-secondary mb-3">{item.description}</p>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">Time to Complete:</span>
                  <span className="font-medium text-text-primary">{item.timeToComplete}</span>
                </div>
                {item.cost && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">Cost:</span>
                    <span className="font-medium text-text-primary">{item.cost}</span>
                  </div>
                )}
                {item.membershipCost && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">Membership:</span>
                    <span className="font-medium text-text-primary">{item.membershipCost}</span>
                  </div>
                )}
                {item.nextAvailable && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">Next Available:</span>
                    <span className="font-medium text-text-primary">
                      {new Date(item.nextAvailable).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {item.nextEvent && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">Next Event:</span>
                    <span className="font-medium text-text-primary">{item.nextEvent}</span>
                  </div>
                )}
              </div>

              {/* Requirements/Resources/Benefits */}
              {item.requirements && (
                <div className="mb-4">
                  <h4 className="text-xs font-medium text-text-primary mb-2">Requirements:</h4>
                  <div className="flex flex-wrap gap-1">
                    {item.requirements.map((req, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-secondary-100 text-secondary-600 rounded-medical text-xs"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {item.resources && (
                <div className="mb-4">
                  <h4 className="text-xs font-medium text-text-primary mb-2">Resources:</h4>
                  <div className="flex flex-wrap gap-1">
                    {item.resources.map((resource, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-accent-100 text-accent-600 rounded-medical text-xs"
                      >
                        {resource}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {item.benefits && (
                <div className="mb-4">
                  <h4 className="text-xs font-medium text-text-primary mb-2">Benefits:</h4>
                  <div className="flex flex-wrap gap-1">
                    {item.benefits.map((benefit, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-success-100 text-success-600 rounded-medical text-xs"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-2">
                <Button
                  variant="primary"
                  size="sm"
                  iconName="ExternalLink"
                  iconPosition="right"
                  className="flex-1"
                >
                  Learn More
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Calendar"
                >
                  Schedule
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-border">
        <Button
          variant="ghost"
          fullWidth
          iconName="BookOpen"
          onClick={() => console.log('View all recommendations')}
        >
          View All Recommendations
        </Button>
      </div>
    </div>
  );
};

export default RecommendationsPanel;