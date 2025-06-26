import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import TimelineVisualization from './components/TimelineVisualization';
import FilterSidebar from './components/FilterSidebar';
import RecommendationsPanel from './components/RecommendationsPanel';
import ProgressMonitoring from './components/ProgressMonitoring';
import ChatbotWidget from './components/ChatbotWidget';
import ExportControls from './components/ExportControls';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CareerRoadmapDashboard = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('timeline');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isRecommendationsCollapsed, setIsRecommendationsCollapsed] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [filters, setFilters] = useState({});

  const viewOptions = [
    { id: 'timeline', label: 'Timeline View', icon: 'Timeline', description: 'Interactive career timeline' },
    { id: 'progress', label: 'Progress Monitoring', icon: 'TrendingUp', description: 'Track achievements and goals' }
  ];

  const mockUserData = {
    name: "Dr. Sarah Johnson",
    specialization: "Internal Medicine",
    currentPosition: "Resident Physician",
    yearsExperience: 3,
    completionRate: 68
  };

  useEffect(() => {
    // Simulate data loading
    const loadDashboardData = async () => {
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    };

    loadDashboardData();
  }, []);

  const handleMilestoneClick = (milestone) => {
    setSelectedMilestone(milestone);
    console.log('Milestone clicked:', milestone);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters updated:', newFilters);
  };

  const handleBookmark = (itemId, isBookmarked) => {
    console.log('Bookmark toggled:', itemId, isBookmarked);
  };

  const handleExport = (format, data) => {
    console.log('Export completed:', format, data);
  };

  const handleZoomChange = (newZoom) => {
    setZoomLevel(newZoom);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Sidebar - Filters */}
        <FilterSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Dashboard Header */}
          <div className="bg-surface border-b border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-text-primary mb-2">
                  Career Roadmap Dashboard
                </h1>
                <p className="text-text-secondary">
                  Welcome back, {mockUserData.name} • {mockUserData.specialization} • {mockUserData.completionRate}% Complete
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <ExportControls onExport={handleExport} />
                <Button
                  variant="outline"
                  iconName="Settings"
                  onClick={() => navigate('/user-profile-settings')}
                >
                  Settings
                </Button>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-1 bg-secondary-100 rounded-medical p-1">
              {viewOptions.map((view) => (
                <button
                  key={view.id}
                  onClick={() => setActiveView(view.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-medical text-sm font-medium medical-transition ${
                    activeView === view.id
                      ? 'bg-surface text-primary medical-shadow-card'
                      : 'text-text-secondary hover:text-primary'
                  }`}
                  title={view.description}
                >
                  <Icon name={view.icon} size={16} />
                  <span>{view.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Dashboard Content */}
          <div className="flex-1 overflow-hidden">
            {activeView === 'timeline' ? (
              <div className="h-full p-6">
                <div className="h-full bg-surface rounded-medical-card border border-border medical-shadow-card overflow-hidden">
                  <div className="h-full p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-lg font-semibold text-text-primary mb-1">
                          Career Timeline Visualization
                        </h2>
                        <p className="text-sm text-text-secondary">
                          Interactive timeline showing your career milestones and future goals
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="RotateCcw"
                          onClick={() => setZoomLevel(1)}
                        >
                          Reset View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="Maximize"
                          onClick={() => console.log('Fullscreen timeline')}
                        >
                          Fullscreen
                        </Button>
                      </div>
                    </div>

                    <div className="h-[calc(100%-5rem)]">
                      <TimelineVisualization
                        onMilestoneClick={handleMilestoneClick}
                        zoomLevel={zoomLevel}
                        onZoomChange={handleZoomChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full overflow-y-auto p-6">
                <ProgressMonitoring
                  onMilestoneUpdate={(milestone) => console.log('Milestone updated:', milestone)}
                />
              </div>
            )}
          </div>

          {/* Quick Actions Bar */}
          <div className="bg-surface border-t border-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Upload"
                  onClick={() => navigate('/resume-upload-analysis')}
                >
                  Update Resume
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="MessageSquare"
                  onClick={() => navigate('/ai-career-guidance-chat')}
                >
                  Career Chat
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="BookOpen"
                  onClick={() => console.log('View resources')}
                >
                  Resources
                </Button>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Clock" size={14} />
                <span>Last updated: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Recommendations */}
        <RecommendationsPanel
          onBookmark={handleBookmark}
          isCollapsed={isRecommendationsCollapsed}
          onToggleCollapse={() => setIsRecommendationsCollapsed(!isRecommendationsCollapsed)}
        />
      </div>

      {/* Floating Chatbot Widget */}
      <ChatbotWidget
        isOpen={isChatbotOpen}
        onToggle={() => setIsChatbotOpen(!isChatbotOpen)}
      />

      {/* Mobile Responsive Overlay */}
      <div className="lg:hidden fixed inset-0 bg-secondary-900/50 backdrop-blur-sm z-40 pointer-events-none opacity-0" />
    </div>
  );
};

export default CareerRoadmapDashboard;