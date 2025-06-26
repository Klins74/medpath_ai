import React from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import HowItWorksSection from './components/HowItWorksSection';
import SystemArchitectureSection from './components/SystemArchitectureSection';
import DataFlowSection from './components/DataFlowSection';
import TechnologyStackSection from './components/TechnologyStackSection';
import CTASection from './components/CTASection';
import ChatBotSection from './components/ChatBotSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroSection />
        <HowItWorksSection />
        <SystemArchitectureSection />
        <DataFlowSection />
        <TechnologyStackSection />
        <CTASection />
        <ChatBotSection />
        <FAQSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage;