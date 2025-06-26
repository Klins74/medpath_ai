import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import LandingPage from "pages/landing-page";
import ResumeUploadAnalysis from "pages/resume-upload-analysis";
import AiCareerGuidanceChat from "pages/ai-career-guidance-chat";
import CareerRoadmapDashboard from "pages/career-roadmap-dashboard";
import UserProfileSettings from "pages/user-profile-settings";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/resume-upload-analysis" element={<ResumeUploadAnalysis />} />
        <Route path="/ai-career-guidance-chat" element={<AiCareerGuidanceChat />} />
        <Route path="/career-roadmap-dashboard" element={<CareerRoadmapDashboard />} />
        <Route path="/user-profile-settings" element={<UserProfileSettings />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;