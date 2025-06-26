import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressMonitoring = ({ 
  milestones, 
  achievements, 
  onMilestoneUpdate 
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const mockProgressData = {
    overallProgress: 68,
    completedMilestones: 12,
    totalMilestones: 18,
    currentStreak: 15,
    achievements: [
      {
        id: 1,
        title: "Board Certification Completed",
        description: "Successfully passed American Board of Internal Medicine exam",
        date: "2024-01-15",
        type: "certification",
        points: 500,
        icon: "Award",
        color: "success"
      },
      {
        id: 2,
        title: "Research Publication",
        description: "Published peer-reviewed article in Journal of Cardiology",
        date: "2024-01-10",
        type: "academic",
        points: 300,
        icon: "BookOpen",
        color: "primary"
      },
      {
        id: 3,
        title: "Fellowship Application Submitted",
        description: "Completed and submitted cardiology fellowship applications",
        date: "2024-01-05",
        type: "application",
        points: 200,
        icon: "Send",
        color: "warning"
      },
      {
        id: 4,
        title: "Networking Milestone",
        description: "Connected with 50+ cardiology professionals",
        date: "2023-12-28",
        type: "networking",
        points: 150,
        icon: "Users",
        color: "accent"
      }
    ],
    weeklyProgress: [
      { week: 'Week 1', completed: 3, planned: 4 },
      { week: 'Week 2', completed: 4, planned: 4 },
      { week: 'Week 3', completed: 2, planned: 3 },
      { week: 'Week 4', completed: 5, planned: 5 }
    ],
    skillProgress: [
      { skill: 'Clinical Skills', current: 85, target: 90, color: 'success' },
      { skill: 'Research Skills', current: 70, target: 80, color: 'primary' },
      { skill: 'Leadership', current: 60, target: 75, color: 'warning' },
      { skill: 'Communication', current: 80, target: 85, color: 'accent' }
    ]
  };

  const periodOptions = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const getAchievementColor = (type) => {
    switch (type) {
      case 'certification': return 'text-success bg-success-50 border-success-200';
      case 'academic': return 'text-primary bg-primary-50 border-primary-200';
      case 'application': return 'text-warning bg-warning-50 border-warning-200';
      case 'networking': return 'text-accent bg-accent-50 border-accent-200';
      default: return 'text-secondary-600 bg-secondary-50 border-secondary-200';
    }
  };

  const getSkillColor = (color) => {
    switch (color) {
      case 'success': return 'bg-success';
      case 'primary': return 'bg-primary';
      case 'warning': return 'bg-warning';
      case 'accent': return 'bg-accent';
      default: return 'bg-secondary-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="bg-surface rounded-medical-card border border-border p-6 medical-shadow-card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-text-primary">Progress Overview</h2>
          <div className="flex items-center space-x-2">
            {periodOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedPeriod(option.value)}
                className={`px-3 py-1 rounded-medical text-sm font-medium medical-transition ${
                  selectedPeriod === option.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-primary hover:bg-secondary-50'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-primary-50 rounded-medical border border-primary-200">
            <div className="text-2xl font-bold text-primary mb-1">
              {mockProgressData.overallProgress}%
            </div>
            <div className="text-sm text-text-secondary">Overall Progress</div>
          </div>
          <div className="text-center p-4 bg-success-50 rounded-medical border border-success-200">
            <div className="text-2xl font-bold text-success mb-1">
              {mockProgressData.completedMilestones}/{mockProgressData.totalMilestones}
            </div>
            <div className="text-sm text-text-secondary">Milestones</div>
          </div>
          <div className="text-center p-4 bg-warning-50 rounded-medical border border-warning-200">
            <div className="text-2xl font-bold text-warning mb-1">
              {mockProgressData.currentStreak}
            </div>
            <div className="text-sm text-text-secondary">Day Streak</div>
          </div>
          <div className="text-center p-4 bg-accent-50 rounded-medical border border-accent-200">
            <div className="text-2xl font-bold text-accent mb-1">
              {mockProgressData.achievements.reduce((sum, achievement) => sum + achievement.points, 0)}
            </div>
            <div className="text-sm text-text-secondary">Total Points</div>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary">Career Roadmap Progress</span>
            <span className="text-sm text-text-secondary">{mockProgressData.overallProgress}%</span>
          </div>
          <div className="w-full bg-secondary-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-primary to-accent h-3 rounded-full medical-transition-normal"
              style={{ width: `${mockProgressData.overallProgress}%` }}
            />
          </div>
        </div>

        {/* Skill Progress */}
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-3">Skill Development</h3>
          <div className="space-y-3">
            {mockProgressData.skillProgress.map((skill, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-text-secondary">{skill.skill}</span>
                  <span className="text-sm font-medium text-text-primary">
                    {skill.current}% / {skill.target}%
                  </span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div className="relative h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getSkillColor(skill.color)} medical-transition-normal`}
                      style={{ width: `${skill.current}%` }}
                    />
                    <div
                      className="absolute top-0 h-full border-r-2 border-text-muted opacity-50"
                      style={{ left: `${skill.target}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-surface rounded-medical-card border border-border p-6 medical-shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Recent Achievements</h2>
          <Button variant="ghost" size="sm" iconName="Trophy">
            View All
          </Button>
        </div>

        <div className="space-y-4">
          {mockProgressData.achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="flex items-start space-x-4 p-4 bg-secondary-50 rounded-medical hover:bg-secondary-100 medical-transition"
            >
              <div className={`p-2 rounded-medical border ${getAchievementColor(achievement.type)}`}>
                <Icon name={achievement.icon} size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-text-primary mb-1">{achievement.title}</h3>
                <p className="text-sm text-text-secondary mb-2">{achievement.description}</p>
                <div className="flex items-center space-x-4 text-xs text-text-muted">
                  <span>{new Date(achievement.date).toLocaleDateString()}</span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Star" size={12} />
                    <span>{achievement.points} points</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <div className="bg-surface rounded-medical-card border border-border p-6 medical-shadow-card">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Weekly Progress</h2>
        
        <div className="space-y-4">
          {mockProgressData.weeklyProgress.map((week, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-16 text-sm text-text-secondary">{week.week}</div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm text-text-primary">
                    {week.completed} / {week.planned} tasks
                  </span>
                  <span className="text-xs text-text-muted">
                    ({Math.round((week.completed / week.planned) * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full medical-transition-normal ${
                      week.completed === week.planned ? 'bg-success' : 'bg-primary'
                    }`}
                    style={{ width: `${(week.completed / week.planned) * 100}%` }}
                  />
                </div>
              </div>
              <div className="text-right">
                {week.completed === week.planned ? (
                  <Icon name="CheckCircle" size={16} className="text-success" />
                ) : (
                  <Icon name="Clock" size={16} className="text-warning" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressMonitoring;