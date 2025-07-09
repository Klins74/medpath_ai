import React, { useState, useEffect, useMemo } from 'react';
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

// Исходные данные для таймлайна
const allMilestones = [
    { id: 1, title: "Окончание мед. вуза", date: "2020-06-15", status: "completed", type: "education" },
    { id: 2, title: "Резидентура", date: "2023-06-30", status: "completed", type: "training" },
    { id: 3, title: "Сертификация", date: "2023-08-15", status: "current", type: "certification" },
    { id: 4, title: "Ординатура (Кардиология)", date: "2024-07-01", status: "upcoming", type: "specialization" },
    { id: 5, title: "Должность лечащего врача", date: "2026-07-01", status: "future", type: "career" }
];

const CareerRoadmapDashboard = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('timeline');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isRecommendationsCollapsed, setIsRecommendationsCollapsed] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [filters, setFilters] = useState({ timeframe: 'all', status: 'all' });

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

  // Логика фильтрации
  const filteredMilestones = useMemo(() => {
    return allMilestones.filter(milestone => {
        const today = new Date();
        const milestoneDate = new Date(milestone.date);

        // Фильтр по статусу
        const statusMatch = filters.status === 'all' || milestone.status === filters.status;

        // Фильтр по времени
        let timeMatch = true;
        if (filters.timeframe !== 'all') {
            const years = parseInt(filters.timeframe.replace('years', '').replace('year', ''));
            const futureDate = new Date();
            futureDate.setFullYear(today.getFullYear() + years);
            timeMatch = milestoneDate <= futureDate;
        }

        return statusMatch && timeMatch;
    });
  }, [filters]);

  const handleMilestoneClick = (milestone) => {
    setSelectedMilestone(milestone);
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Sidebar - Filters */}
        <FilterSidebar
          onApplyFilters={handleApplyFilters}
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
                <ExportControls onExport={() => {}} />
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
                    </div>

                    <div className="h-[calc(100%-5rem)]">
                      <TimelineVisualization
                        milestones={filteredMilestones} // Передаем отфильтрованные данные
                        onMilestoneClick={handleMilestoneClick}
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
        </div>

        {/* Right Sidebar - Recommendations */}
        <RecommendationsPanel
          onBookmark={() => {}}
          isCollapsed={isRecommendationsCollapsed}
          onToggleCollapse={() => setIsRecommendationsCollapsed(!isRecommendationsCollapsed)}
        />
      </div>

      <ChatbotWidget
        isOpen={isChatbotOpen}
        onToggle={() => setIsChatbotOpen(!isChatbotOpen)}
      />
    </div>
  );
};

export default CareerRoadmapDashboard;
