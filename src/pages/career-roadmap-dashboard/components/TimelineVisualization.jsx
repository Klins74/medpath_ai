import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import Icon from '../../../components/AppIcon';

const TimelineVisualization = ({ 
  milestones, 
  currentPosition, 
  onMilestoneClick, 
  zoomLevel = 1,
  onZoomChange 
}) => {
  const svgRef = useRef();
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

  const timelineData = [
    {
      id: 1,
      title: "Medical School Graduate",
      date: "2020-06-15",
      status: "completed",
      type: "education",
      description: "Completed MD degree with specialization in Internal Medicine",
      requirements: ["USMLE Step 1", "USMLE Step 2", "Clinical Rotations"],
      position: { x: 100, y: 200 }
    },
    {
      id: 2,
      title: "Residency Program",
      date: "2020-07-01",
      status: "completed",
      type: "training",
      description: "Internal Medicine Residency at Johns Hopkins Hospital",
      requirements: ["Match Program", "Board Certification", "Research Publications"],
      position: { x: 250, y: 200 }
    },
    {
      id: 3,
      title: "Board Certification",
      date: "2023-08-15",
      status: "current",
      type: "certification",
      description: "American Board of Internal Medicine Certification",
      requirements: ["Residency Completion", "Board Exam", "Continuing Education"],
      position: { x: 400, y: 200 }
    },
    {
      id: 4,
      title: "Fellowship Training",
      date: "2024-07-01",
      status: "upcoming",
      type: "specialization",
      description: "Cardiology Fellowship at Mayo Clinic",
      requirements: ["Board Certification", "Research Experience", "Letters of Recommendation"],
      position: { x: 550, y: 200 }
    },
    {
      id: 5,
      title: "Attending Physician",
      date: "2026-07-01",
      status: "future",
      type: "career",
      description: "Senior Cardiologist Position at Academic Medical Center",
      requirements: ["Fellowship Completion", "Board Certification", "Clinical Experience"],
      position: { x: 700, y: 200 }
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      const container = svgRef.current?.parentElement;
      if (container) {
        setDimensions({
          width: container.offsetWidth,
          height: 400
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create scales
    const xScale = d3.scaleTime()
      .domain(d3.extent(timelineData, d => new Date(d.date)))
      .range([0, width]);

    // Draw timeline line
    g.append("line")
      .attr("x1", 0)
      .attr("y1", height / 2)
      .attr("x2", width)
      .attr("y2", height / 2)
      .attr("stroke", "var(--color-border)")
      .attr("stroke-width", 2);

    // Create milestone groups
    const milestoneGroups = g.selectAll(".milestone")
      .data(timelineData)
      .enter()
      .append("g")
      .attr("class", "milestone")
      .attr("transform", d => `translate(${xScale(new Date(d.date))}, ${height / 2})`)
      .style("cursor", "pointer");

    // Add milestone circles
    milestoneGroups.append("circle")
      .attr("r", 12)
      .attr("fill", d => {
        switch (d.status) {
          case "completed": return "var(--color-success)";
          case "current": return "var(--color-primary)";
          case "upcoming": return "var(--color-warning)";
          default: return "var(--color-secondary-300)";
        }
      })
      .attr("stroke", "white")
      .attr("stroke-width", 3)
      .style("filter", "drop-shadow(0 2px 4px rgba(0,0,0,0.1))");

    // Add milestone icons
    milestoneGroups.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("fill", "white")
      .attr("font-size", "12px")
      .text(d => {
        switch (d.type) {
          case "education": return "🎓";
          case "training": return "🏥";
          case "certification": return "📜";
          case "specialization": return "🔬";
          case "career": return "👨‍⚕️";
          default: return "•";
        }
      });

    // Add milestone labels
    milestoneGroups.append("text")
      .attr("text-anchor", "middle")
      .attr("y", -25)
      .attr("fill", "var(--color-text-primary)")
      .attr("font-size", "12px")
      .attr("font-weight", "600")
      .text(d => d.title);

    // Add dates
    milestoneGroups.append("text")
      .attr("text-anchor", "middle")
      .attr("y", 35)
      .attr("fill", "var(--color-text-secondary)")
      .attr("font-size", "10px")
      .text(d => new Date(d.date).getFullYear());

    // Add click handlers
    milestoneGroups.on("click", function(event, d) {
      setSelectedMilestone(d);
      onMilestoneClick?.(d);
    });

    // Add hover effects
    milestoneGroups.on("mouseenter", function(event, d) {
      d3.select(this).select("circle")
        .transition()
        .duration(200)
        .attr("r", 15);
    }).on("mouseleave", function(event, d) {
      d3.select(this).select("circle")
        .transition()
        .duration(200)
        .attr("r", 12);
    });

  }, [dimensions, zoomLevel, onMilestoneClick]);

  const handleZoomIn = () => {
    const newZoom = Math.min(zoomLevel * 1.2, 3);
    onZoomChange?.(newZoom);
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoomLevel / 1.2, 0.5);
    onZoomChange?.(newZoom);
  };

  const handleResetZoom = () => {
    onZoomChange?.(1);
  };

  return (
    <div className="relative w-full h-full bg-surface rounded-medical-card border border-border">
      {/* Timeline Controls */}
      <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
        <button
          onClick={handleZoomOut}
          className="p-2 bg-surface border border-border rounded-medical hover:bg-secondary-50 medical-transition"
          title="Zoom Out"
        >
          <Icon name="ZoomOut" size={16} />
        </button>
        <button
          onClick={handleResetZoom}
          className="px-3 py-2 bg-surface border border-border rounded-medical hover:bg-secondary-50 medical-transition text-xs font-medium"
          title="Reset Zoom"
        >
          {Math.round(zoomLevel * 100)}%
        </button>
        <button
          onClick={handleZoomIn}
          className="p-2 bg-surface border border-border rounded-medical hover:bg-secondary-50 medical-transition"
          title="Zoom In"
        >
          <Icon name="ZoomIn" size={16} />
        </button>
      </div>

      {/* Timeline SVG */}
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        className="overflow-visible"
        style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}
      />

      {/* Milestone Detail Popup */}
      {selectedMilestone && (
        <div className="absolute top-16 left-4 right-4 bg-surface border border-border rounded-medical-card medical-shadow-floating p-6 z-20">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-text-primary">
                {selectedMilestone.title}
              </h3>
              <p className="text-sm text-text-secondary">
                {new Date(selectedMilestone.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <button
              onClick={() => setSelectedMilestone(null)}
              className="p-1 hover:bg-secondary-100 rounded-medical medical-transition"
            >
              <Icon name="X" size={16} />
            </button>
          </div>

          <p className="text-sm text-text-secondary mb-4">
            {selectedMilestone.description}
          </p>

          <div>
            <h4 className="text-sm font-medium text-text-primary mb-2">Requirements:</h4>
            <ul className="space-y-1">
              {selectedMilestone.requirements.map((req, index) => (
                <li key={index} className="flex items-center space-x-2 text-sm text-text-secondary">
                  <Icon name="CheckCircle" size={14} className="text-success" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              selectedMilestone.status === 'completed' 
                ? 'bg-success-100 text-success-600'
                : selectedMilestone.status === 'current' ?'bg-primary-100 text-primary-600'
                : selectedMilestone.status === 'upcoming' ?'bg-warning-100 text-warning-600' :'bg-secondary-100 text-secondary-600'
            }`}>
              {selectedMilestone.status.charAt(0).toUpperCase() + selectedMilestone.status.slice(1)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelineVisualization;