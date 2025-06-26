import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import { useI18n } from '../../contexts/I18nContext';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { t, currentLanguage, changeLanguage } = useI18n();
  const languageDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'kz', name: 'Қазақша', flag: '🇰🇿' }
  ];

  const navigationItems = [
    { 
      label: t('dashboard'), 
      path: '/career-roadmap-dashboard', 
      icon: 'LayoutDashboard',
      description: 'Career roadmap visualization and analysis'
    },
    { 
      label: t('career_guidance'), 
      path: '/ai-career-guidance-chat', 
      icon: 'MessageSquare',
      description: 'AI-powered career consultation'
    },
    { 
      label: t('profile'), 
      path: '/user-profile-settings', 
      icon: 'User',
      description: 'Personal information and settings'
    },
    { 
      label: t('get_started'), 
      path: '/landing-page', 
      icon: 'Rocket',
      description: 'Begin your career analysis journey'
    }
  ];

  const isActivePath = (path) => {
    if (path === '/landing-page') {
      return location.pathname === '/' || location.pathname === '/landing-page';
    }
    return location.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLanguageChange = (language) => {
    changeLanguage(language.code);
    setIsLanguageDropdownOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleUserAction = (action) => {
    setIsUserDropdownOpen(false);
    if (action === 'profile') {
      navigate('/user-profile-settings');
    } else if (action === 'logout') {
      // Handle logout logic
      console.log('Logout clicked');
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setIsLanguageDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsLanguageDropdownOpen(false);
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[1];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-1000 bg-surface border-b border-border medical-shadow-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button
                onClick={() => handleNavigation('/landing-page')}
                className="flex items-center space-x-3 medical-transition hover:opacity-80"
              >
                <div className="w-8 h-8 bg-primary rounded-medical flex items-center justify-center">
                  <Icon name="Activity" size={20} color="white" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-semibold text-text-primary tracking-tight">
                    MedPath
                  </span>
                  <span className="text-xs text-primary font-medium -mt-1">
                    AI
                  </span>
                </div>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-medical text-sm font-medium medical-transition ${
                    isActivePath(item.path)
                      ? 'text-primary bg-primary-50 font-semibold' :'text-text-secondary hover:text-primary hover:bg-secondary-50'
                  }`}
                  title={item.description}
                >
                  <Icon name={item.icon} size={16} />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Language Switcher */}
              <div className="relative" ref={languageDropdownRef}>
                <button
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="hidden sm:flex items-center space-x-2 px-3 py-2 text-sm font-medium text-text-secondary hover:text-primary hover:bg-secondary-50 rounded-medical medical-transition"
                >
                  <span className="text-base">{currentLang.flag}</span>
                  <span>{currentLang.code.toUpperCase()}</span>
                  <Icon name="ChevronDown" size={14} />
                </button>

                {isLanguageDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-medical-card medical-shadow-floating z-1050">
                    <div className="py-2">
                      {languages.map((language) => (
                        <button
                          key={language.code}
                          onClick={() => handleLanguageChange(language)}
                          className={`w-full flex items-center space-x-3 px-4 py-2 text-sm medical-transition ${
                            currentLanguage === language.code
                              ? 'text-primary bg-primary-50 font-medium' :'text-text-secondary hover:text-primary hover:bg-secondary-50'
                          }`}
                        >
                          <span className="text-base">{language.flag}</span>
                          <span>{language.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* User Account */}
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-full bg-primary-50 hover:bg-primary-100 medical-transition"
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} color="white" />
                  </div>
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-surface border border-border rounded-medical-card medical-shadow-floating z-1050">
                    <div className="py-2">
                      <div className="px-4 py-3 border-b border-border">
                        <p className="text-sm font-medium text-text-primary">Др. Сара Джонсон</p>
                        <p className="text-xs text-text-secondary">sara.johnson@medpath.ai</p>
                      </div>
                      <button
                        onClick={() => handleUserAction('profile')}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-primary hover:bg-secondary-50 medical-transition"
                      >
                        <Icon name="Settings" size={16} />
                        <span>Настройки профиля</span>
                      </button>
                      <button
                        onClick={() => handleUserAction('logout')}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-error hover:bg-error-50 medical-transition"
                      >
                        <Icon name="LogOut" size={16} />
                        <span>Выйти</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 rounded-medical text-text-secondary hover:text-primary hover:bg-secondary-50 medical-transition"
              >
                <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-1100 md:hidden">
          <div className="fixed inset-0 bg-secondary-900/50 backdrop-blur-sm" onClick={toggleMobileMenu} />
          <div className="fixed top-16 left-0 right-0 bg-surface border-b border-border medical-shadow-floating animate-slide-in">
            <nav className="px-6 py-4 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-medical text-left medical-transition ${
                    isActivePath(item.path)
                      ? 'text-primary bg-primary-50 font-semibold' :'text-text-secondary hover:text-primary hover:bg-secondary-50'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <div>
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-text-muted">{item.description}</div>
                  </div>
                </button>
              ))}
              
              {/* Mobile Language Switcher */}
              <div className="pt-4 border-t border-border">
                <div className="px-4 py-2 text-xs font-medium text-text-muted uppercase tracking-wide">
                  Язык
                </div>
                <div className="space-y-1">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language)}
                      className={`w-full flex items-center space-x-3 px-4 py-2 rounded-medical text-left medical-transition ${
                        currentLanguage === language.code
                          ? 'text-primary bg-primary-50 font-medium' :'text-text-secondary hover:text-primary hover:bg-secondary-50'
                      }`}
                    >
                      <span className="text-base">{language.flag}</span>
                      <span>{language.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  );
};

export default Header;