import React, { createContext, useContext, useState, useEffect } from 'react';

const I18nContext = createContext();

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

const translations = {
  ru: {
    // Navigation
    dashboard: 'Панель управления',
    career_guidance: 'Карьерное руководство',
    profile: 'Профиль',
    get_started: 'Начать',
    
    // Hero Section
    hero_title: 'MedPath AI',
    hero_slogan: 'Ваш цифровой навигатор в медицинской карьере',
    hero_description: 'Получите персонализированные рекомендации по карьере, анализ пробелов в навыках и стратегические планы развития, специально адаптированные для медицинских специалистов с использованием передовых технологий ИИ.',
    start_analysis: 'Начать анализ карьеры',
    watch_demo: 'Посмотреть демо',
    healthcare_professionals: 'Медицинских специалистов',
    career_satisfaction: 'Удовлетворенность карьерой',
    medical_specializations: 'Медицинских специализаций',
    
    // How It Works
    how_it_works_title: 'Как это работает',
    how_it_works_subtitle: 'Простой процесс',
    how_it_works_description: 'Наша платформа на базе ИИ проводит вас через комплексный процесс анализа карьеры, предоставляя персонализированные инсайты и практические рекомендации для развития вашей медицинской карьеры.',
    
    // Steps
    step_1_title: 'Сбор и нормализация данных',
    step_1_description: 'Безопасно загрузите резюме в формате PDF или DOCX для комплексного анализа.',
    step_2_title: 'Анализ профиля (NLP)',
    step_2_description: 'Наши продвинутые NLP-алгоритмы анализируют ваш опыт, навыки и карьерные траектории.',
    step_3_title: 'Прогноз и план (ML + LLM)',
    step_3_description: 'Определяем пробелы в навыках и сильные стороны в медицинских специализациях.',
    step_4_title: 'Интеграция с EHR/EMR',
    step_4_description: 'Интеграция с электронными медицинскими записями через FHIR/HL7.',
    step_5_title: 'Визуализация траектории',
    step_5_description: 'Чат с нашим ИИ-консультантом по карьере для персонализированных советов.',
    step_6_title: 'Мониторинг и обратная связь',
    step_6_description: 'Отслеживайте прогресс развития карьеры и получайте обновленные рекомендации.',
    
    // Architecture Modules
    architecture_title: 'Архитектура модулей',
    data_collection_module: 'Модуль сбора данных',
    nlp_analysis_module: 'NLP-анализ профиля',
    ml_prediction_module: 'ML-прогноз',
    llm_planning_module: 'LLM-генерация плана',
    ehr_integration_module: 'EHR/EMR-интеграция (FHIR/HL7)',
    ui_visualization_module: 'UI-визуализация',
    monitoring_module: 'Мониторинг & аналитика',
    
    // Data Flow
    data_flow_title: 'Поток данных',
    data_flow_description: 'Визуализация процесса обработки данных от загрузки резюме до мониторинга прогресса',
    
    // Technology Stack
    tech_stack_title: 'Технологический стек',
    tech_stack_description: 'Современные технологии для надежного анализа карьеры',
    
    // CTA Section
    cta_title: 'Готовы трансформировать свою медицинскую карьеру?',
    cta_description: 'Присоединяйтесь к тысячам медицинских специалистов, которые уже открыли свой оптимальный карьерный путь с помощью нашего ИИ-анализа.',
    upload_resume: 'Загрузить резюме',
    select_specialization: 'Выбрать специализацию',
    get_analysis: 'Получить анализ',
    
    // Specializations
    cardiology: 'Кардиология',
    neurology: 'Неврология',
    pediatrics: 'Педиатрия',
    surgery: 'Хирургия',
    internal_medicine: 'Внутренние болезни',
    emergency_medicine: 'Скорая медицинская помощь',
    
    // Chat/FAQ
    chat_title: 'ИИ-Ассистент',
    chat_description: 'Задайте вопрос нашему ИИ-консультанту по карьере',
    chat_placeholder: 'Например: "Какие курсы нужны для перехода на Senior?"',
    ask_question: 'Задать вопрос',
    
    // Common
    loading: 'Загрузка...',
    error: 'Ошибка',
    try_again: 'Попробовать снова',
    upload: 'Загрузить',
    analyze: 'Анализировать',
    submit: 'Отправить',
  },
  kz: {
    // Navigation
    dashboard: 'Басқару панелі',
    career_guidance: 'Мансап жетекшілігі',
    profile: 'Профиль',
    get_started: 'Бастау',
    
    // Hero Section
    hero_title: 'MedPath AI',
    hero_slogan: 'Медициналық мансаптағы сандық навигаторыңыз',
    hero_description: 'Жетілдірілген ЖИ технологияларын пайдалана отырып, медицина мамандарына арнайы бейімделген дербес мансап ұсыныстарын, дағдылардағы олқылықтарды талдауды және стратегиялық даму жоспарларын алыңыз.',
    start_analysis: 'Мансап талдауын бастау',
    watch_demo: 'Демо көру',
    healthcare_professionals: 'Медицина мамандары',
    career_satisfaction: 'Мансап қанағаттануы',
    medical_specializations: 'Медициналық мамандандырулар',
    
    // How It Works
    how_it_works_title: 'Қалай жұмыс істейді',
    how_it_works_subtitle: 'Қарапайым процесс',
    how_it_works_description: 'Біздің ЖИ-негізіндегі платформа сізді кешенді мансап талдау процесі арқылы жетелейді, медициналық мансабыңызды дамыту үшін дербестендірілген түсініктер мен практикалық ұсыныстар береді.',
    
    // Continue with all translations...
    // (For brevity, showing pattern - full implementation would include all translations)
  },
  en: {
    // Navigation
    dashboard: 'Dashboard',
    career_guidance: 'Career Guidance',
    profile: 'Profile',
    get_started: 'Get Started',
    
    // Hero Section
    hero_title: 'MedPath AI',
    hero_slogan: 'Your Digital Navigator in Medical Career',
    hero_description: 'Get personalized career recommendations, skill gap analysis, and strategic development plans tailored specifically for healthcare professionals using advanced AI technology.',
    start_analysis: 'Start Career Analysis',
    watch_demo: 'Watch Demo',
    healthcare_professionals: 'Healthcare Professionals',
    career_satisfaction: 'Career Satisfaction Rate',
    medical_specializations: 'Medical Specializations',
    
    // How It Works
    how_it_works_title: 'How It Works',
    how_it_works_subtitle: 'Simple Process',
    how_it_works_description: 'Our AI-powered platform guides you through a comprehensive career analysis process, providing personalized insights and actionable recommendations for your medical career advancement.',
    
    // Continue with all translations...
  }
};

export const I18nProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('ru');

  useEffect(() => {
    // Detect browser language
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('ru')) {
      setCurrentLanguage('ru');
    } else if (browserLang.startsWith('kk') || browserLang.startsWith('kz')) {
      setCurrentLanguage('kz');
    } else {
      setCurrentLanguage('en');
    }
  }, []);

  const t = (key) => {
    return translations[currentLanguage]?.[key] || translations.en[key] || key;
  };

  const changeLanguage = (lang) => {
    setCurrentLanguage(lang);
  };

  return (
    <I18nContext.Provider value={{ t, currentLanguage, changeLanguage, translations }}>
      {children}
    </I18nContext.Provider>
  );
};