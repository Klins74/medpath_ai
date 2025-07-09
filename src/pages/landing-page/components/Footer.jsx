import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Platform',
      links: [
        { label: 'Career Analysis', path: '/resume-upload-analysis' },
        { label: 'Dashboard', path: '/career-roadmap-dashboard' },
        { label: 'AI Guidance', path: '/ai-career-guidance-chat' },
        { label: 'Profile Settings', path: '/user-profile-settings' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'How It Works', path: '#how-it-works' },
        { label: 'Technology', path: '#technology' },
        { label: 'FAQ', path: '#faq' },
        { label: 'Support Center', path: '#support' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', path: '#about' },
        { label: 'Careers', path: '#careers' },
        { label: 'Press', path: '#press' },
        { label: 'Contact', path: '#contact' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', path: '#privacy' },
        { label: 'Terms of Service', path: '#terms' },
        { label: 'HIPAA Compliance', path: '#hipaa' },
        { label: 'Security', path: '#security' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: 'Linkedin', url: '#linkedin' },
    { name: 'Twitter', icon: 'Twitter', url: '#twitter' },
    { name: 'Facebook', icon: 'Facebook', url: '#facebook' },
    { name: 'YouTube', icon: 'Youtube', url: '#youtube' }
  ];

  const handleNavigation = (path) => {
    if (path.startsWith('#')) {
      // Handle anchor links
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <footer className="bg-secondary-900 text-secondary-100">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-medical flex items-center justify-center">
                <Icon name="Activity" size={24} color="white" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-semibold text-white tracking-tight">
                  MedPath
                </span>
                <span className="text-sm text-primary font-medium -mt-1">
                  AI
                </span>
              </div>
            </div>
            
            <p className="text-secondary-300 mb-6 leading-relaxed max-w-md">
              Empowering healthcare professionals with AI-driven career guidance, 
              personalized development plans, and intelligent insights for career advancement.
            </p>
            
            <div className="flex items-center space-x-4 mb-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-10 h-10 bg-secondary-800 hover:bg-primary rounded-medical flex items-center justify-center medical-transition"
                  aria-label={social.name}
                >
                  <Icon name={social.icon} size={18} />
                </a>
              ))}
            </div>
            
            {/* Обновленные контактные данные */}
            <div className="space-y-2 text-sm text-secondary-400">
              <div className="flex items-center space-x-2">
                <Icon name="Mail" size={16} />
                <span>av7004764@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Phone" size={16} />
                <span>+7 747 293 0623</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} />
                <span>Алматы</span>
              </div>
            </div>
          </div>
          
          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-semibold mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button
                      onClick={() => handleNavigation(link.path)}
                      className="text-secondary-300 hover:text-primary medical-transition text-sm"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-secondary-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-secondary-400">
              © {currentYear} MedPath AI. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-secondary-400">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} color="var(--color-success)" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Lock" size={16} color="var(--color-success)" />
                <span>SOC 2 Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={16} color="var(--color-success)" />
                <span>ISO 27001</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
