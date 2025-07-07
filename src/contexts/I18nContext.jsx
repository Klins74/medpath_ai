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
    
    // Header specific
    profile_settings: 'Настройки профиля',
    logout: 'Выйти',
    language: 'Язык',
    career_roadmap_desc: 'Визуализация и анализ карьерного пути',
    ai_career_consultation_desc: 'Консультация по карьере на основе ИИ',
    personal_info_settings_desc: 'Личная информация и настройки',
    start_career_journey_desc: 'Начать путь анализа карьеры',
    user_name: 'Др. Сара Джонсон',
    user_email: 'sara.johnson@medpath.ai',
    
    // Welcome Screen
    welcome_ai_career_guidance: 'Добро пожаловать в ИИ-руководство по карьере',
    welcome_description: 'Получите персонализированные советы по медицинской карьере на основе передового ИИ. Задавайте вопросы о специализациях, сертификациях, смене карьеры и многом другом.',
    ai_powered_guidance: 'ИИ-руководство',
    ai_powered_guidance_desc: 'Получите персонализированные советы по карьере на основе вашего медицинского опыта и целей',
    specialization_planning: 'Планирование специализации',
    specialization_planning_desc: 'Изучите различные медицинские специальности и найдите идеальное соответствие вашим интересам',
    career_progression: 'Карьерный рост',
    career_progression_desc: 'Планируйте свое профессиональное развитие с отслеживанием вех и руководством по сертификации',
    global_opportunities: 'Глобальные возможности',
    global_opportunities_desc: 'Откройте для себя международные пути медицинской карьеры и требования',
    quick_start_topics: 'Темы быстрого старта',
    quick_start_topics_desc: 'Нажмите на любую тему ниже, чтобы начать разговор',
    medical_specialization: 'Медицинская специализация',
    medical_specialization_question: 'Какая медицинская специализация лучше всего подходит для моего опыта и интересов?',
    certification_path: 'Путь сертификации',
    certification_path_question: 'Какие сертификаты и квалификации мне нужны для желаемой специальности?',
    career_transition: 'Смена карьеры',
    career_transition_question: 'Как мне перейти от клинической практики к медицинским исследованиям?',
    salary_expectations: 'Ожидания по зарплате',
    salary_expectations_question: 'Какие ожидания по зарплате для различных медицинских специальностей?',
    start_new_conversation: 'Начать новый разговор',
    private_secure: 'Конфиденциально и безопасно',
    ai_powered: 'На основе ИИ',
    available_24_7: 'Доступно 24/7',
    how_to_get_best_results: 'Как получить лучшие результаты:',
    be_specific_background: '• Будьте конкретны относительно своего медицинского опыта',
    mention_career_goals: '• Упомяните свои карьерные цели и интересы',
    ask_followup_questions: '• Задавайте дополнительные вопросы для подробного руководства',
    upload_relevant_documents: '• Загрузите соответствующие документы для персонализированного совета',
    
    // File Upload
    upload_your_resume: 'Загрузить резюме',
    drag_drop_resume: 'Перетащите сюда резюме или нажмите для выбора',
    supports_pdf_docx: 'Поддерживает файлы PDF и DOCX до 10МБ',
    choose_file: 'Выбрать файл',
    file_uploaded_successfully: 'Файл успешно загружен',
    processing: 'Обработка...',
    replace_file: 'Заменить файл',
    file_type_error: 'Пожалуйста, загрузите только файлы PDF или DOCX',
    file_size_error: 'Размер файла должен быть меньше 10МБ',
    
    // Profile Form
    personal_information: 'Личная информация',
    manage_basic_professional_info: 'Управление базовой и профессиональной информацией',
    edit_profile: 'Редактировать профиль',
    basic_information: 'Основная информация',
    first_name: 'Имя',
    last_name: 'Фамилия',
    email_address: 'Адрес электронной почты',
    phone_number: 'Номер телефона',
    date_of_birth: 'Дата рождения',
    gender: 'Пол',
    select_gender: 'Выберите пол',
    male: 'Мужской',
    female: 'Женский',
    other: 'Другой',
    prefer_not_to_say: 'Предпочитаю не говорить',
    professional_information: 'Профессиональная информация',
    medical_license_number: 'Номер медицинской лицензии',
    license_state: 'Штат лицензии',
    license_expiry_date: 'Дата истечения лицензии',
    dea_number: 'Номер DEA',
    npi_number: 'Номер NPI',
    years_of_experience: 'Годы опыта',
    hospital_affiliation: 'Принадлежность к больнице',
    department: 'Отдел',
    current_position: 'Текущая должность',
    professional_bio_links: 'Профессиональная биография и ссылки',
    professional_bio: 'Профессиональная биография',
    linkedin_url: 'URL LinkedIn',
    orcid_id: 'ORCID ID',
    cancel: 'Отменить',
    save_changes: 'Сохранить изменения',
    
    // Validation Messages
    first_name_required: 'Имя обязательно',
    last_name_required: 'Фамилия обязательна',
    email_required: 'Email обязателен',
    invalid_email: 'Неверный адрес электронной почты',
    license_number_required: 'Номер лицензии обязателен',
    
    // Success/Error Messages
    profile_updated_success: 'Личная информация успешно обновлена!',
    profile_update_error: 'Не удалось обновить профиль. Пожалуйста, попробуйте еще раз.',
    
    // Hero Section Additional
    ai_career_analytics_platform: 'ИИ-платформа карьерной аналитики',
    career_analysis_dashboard: 'Панель анализа карьеры',
    ai_insights: 'ИИ-инсайты',
    career_growth: 'Карьерный рост',
    skill_match: 'Соответствие навыков',
    emergency_medicine_short: 'Скорая помощь',
    
    // Form Placeholders
    bio_placeholder: 'Расскажите о своем профессиональном опыте, специализациях и интересах...',
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
    
    // Common
    loading: 'Жүктелуде...',
    error: 'Қате',
    try_again: 'Қайта көріңіз',
    upload: 'Жүктеу',
    analyze: 'Талдау',
    submit: 'Жіберу',
    
    // Header specific
    profile_settings: 'Профиль параметрлері',
    logout: 'Шығу',
    language: 'Тіл',
    career_roadmap_desc: 'Мансап жолының көрнекілігі мен талдауы',
    ai_career_consultation_desc: 'ЖИ негізіндегі мансап кеңесі',
    personal_info_settings_desc: 'Жеке ақпарат пен параметрлер',
    start_career_journey_desc: 'Мансап талдау саяхатын бастаңыз',
    user_name: 'Др. Сара Джонсон',
    user_email: 'sara.johnson@medpath.ai',
    
    // Welcome Screen
    welcome_ai_career_guidance: 'ЖИ мансап жетекшілігіне қош келдіңіз',
    welcome_description: 'Жетілдірілген ЖИ арқылы дербестендірілген медициналық мансап кеңестерін алыңыз. Мамандандырулар, сертификаттар, мансап өзгерістері және басқа да көп нәрсе туралы сұрақтар қойыңыз.',
    ai_powered_guidance: 'ЖИ жетекшілігі',
    ai_powered_guidance_desc: 'Медициналық тәжірибе мен мақсаттарыңызға негізделген дербес мансап кеңестерін алыңыз',
    specialization_planning: 'Мамандандыру жоспарлау',
    specialization_planning_desc: 'Әртүрлі медициналық мамандықтарды зерттеп, қызығушылықтарыңызға сәйкес келетін тамаша сәйкестік табыңыз',
    career_progression: 'Мансап дамуы',
    career_progression_desc: 'Кезеңдерді бақылау және сертификаттау жетекшілігімен кәсіби дамуыңызды жоспарлаңыз',
    global_opportunities: 'Жаһандық мүмкіндіктер',
    global_opportunities_desc: 'Халықаралық медициналық мансап жолдары мен талаптарды ашыңыз',
    quick_start_topics: 'Жылдам бастау тақырыптары',
    quick_start_topics_desc: 'Сөйлесуді бастау үшін төмендегі кез келген тақырыпты басыңыз',
    medical_specialization: 'Медициналық мамандандыру',
    medical_specialization_question: 'Менің тәжірибем мен қызығушылықтарыма қандай медициналық мамандандыру жақсы?',
    certification_path: 'Сертификаттау жолы',
    certification_path_question: 'Қалаған мамандығым үшін қандай сертификаттар мен біліктіліктер керек?',
    career_transition: 'Мансап өзгерісі',
    career_transition_question: 'Клиникалық тәжірибеден медициналық зерттеулерге қалай көшуге болады?',
    salary_expectations: 'Жалақы күтулері',
    salary_expectations_question: 'Әртүрлі медициналық мамандықтар үшін жалақы күтулері қандай?',
    start_new_conversation: 'Жаңа сөйлесу бастау',
    private_secure: 'Жеке және қауіпсіз',
    ai_powered: 'ЖИ негізінде',
    available_24_7: '24/7 қол жетімді',
    how_to_get_best_results: 'Ең жақсы нәтижелерді қалай алуға болады:',
    be_specific_background: '• Медициналық тәжірибеңіз туралы нақты болыңыз',
    mention_career_goals: '• Мансап мақсаттары мен қызығушылықтарыңызды айтыңыз',
    ask_followup_questions: '• Егжей-тегжейлі жетекшілік үшін қосымша сұрақтар қойыңыз',
    upload_relevant_documents: '• Дербес кеңес үшін тиісті құжаттарды жүктеңіз',
    
    // File Upload
    upload_your_resume: 'Резюмеңізді жүктеңіз',
    drag_drop_resume: 'Резюмеңізді осы жерге сүйреп апарыңыз немесе таңдау үшін басыңыз',
    supports_pdf_docx: '10МБ дейін PDF және DOCX файлдарын қолдайды',
    choose_file: 'Файл таңдау',
    file_uploaded_successfully: 'Файл сәтті жүктелді',
    processing: 'Өңдеу...',
    replace_file: 'Файлды ауыстыру',
    file_type_error: 'Тек PDF немесе DOCX файлдарын жүктеңіз',
    file_size_error: 'Файл өлшемі 10МБ-тан аз болуы керек',
    
    // Profile Form
    personal_information: 'Жеке ақпарат',
    manage_basic_professional_info: 'Негізгі және кәсіби ақпаратты басқару',
    edit_profile: 'Профильді өңдеу',
    basic_information: 'Негізгі ақпарат',
    first_name: 'Аты',
    last_name: 'Тегі',
    email_address: 'Электрондық пошта мекенжайы',
    phone_number: 'Телефон нөмірі',
    date_of_birth: 'Туған күні',
    gender: 'Жынысы',
    select_gender: 'Жынысын таңдаңыз',
    male: 'Ер',
    female: 'Әйел',
    other: 'Басқа',
    prefer_not_to_say: 'Айтуды қаламаймын',
    professional_information: 'Кәсіби ақпарат',
    medical_license_number: 'Медициналық лицензия нөмірі',
    license_state: 'Лицензия мемлекеті',
    license_expiry_date: 'Лицензия мерзімі',
    dea_number: 'DEA нөмірі',
    npi_number: 'NPI нөмірі',
    years_of_experience: 'Тәжірибе жылдары',
    hospital_affiliation: 'Ауруханамен байланысы',
    department: 'Бөлім',
    current_position: 'Қазіргі лауазымы',
    professional_bio_links: 'Кәсіби өмірбаян және сілтемелер',
    professional_bio: 'Кәсіби өмірбаян',
    linkedin_url: 'LinkedIn URL',
    orcid_id: 'ORCID ID',
    cancel: 'Бас тарту',
    save_changes: 'Өзгерістерді сақтау',
    
    // Validation Messages
    first_name_required: 'Аты міндетті',
    last_name_required: 'Тегі міндетті',
    email_required: 'Email міндетті',
    invalid_email: 'Жарамсыз электрондық пошта мекенжайы',
    license_number_required: 'Лицензия нөмірі міндетті',
    
    // Success/Error Messages
    profile_updated_success: 'Жеке ақпарат сәтті жаңартылды!',
    profile_update_error: 'Профильді жаңарту мүмкін болмады. Қайта көріңіз.',
    
    // Hero Section Additional
    ai_career_analytics_platform: 'ЖИ мансап аналитикасы платформасы',
    career_analysis_dashboard: 'Мансап талдау панелі',
    ai_insights: 'ЖИ түсініктері',
    career_growth: 'Мансап өсуі',
    skill_match: 'Дағды сәйкестігі',
    emergency_medicine_short: 'Жедел медицина',
    
    // Form Placeholders
    bio_placeholder: 'Кәсіби тәжірибеңіз, мамандандырулар және қызығушылықтар туралы айтыңыз...',
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
    
    // Common
    loading: 'Loading...',
    error: 'Error',
    try_again: 'Try Again',
    upload: 'Upload',
    analyze: 'Analyze',
    submit: 'Submit',
    
    // Header specific
    profile_settings: 'Profile Settings',
    logout: 'Logout',
    language: 'Language',
    career_roadmap_desc: 'Career roadmap visualization and analysis',
    ai_career_consultation_desc: 'AI-powered career consultation',
    personal_info_settings_desc: 'Personal information and settings',
    start_career_journey_desc: 'Begin your career analysis journey',
    user_name: 'Dr. Sarah Johnson',
    user_email: 'sara.johnson@medpath.ai',
    
    // Welcome Screen
    welcome_ai_career_guidance: 'Welcome to AI Career Guidance',
    welcome_description: 'Get personalized medical career advice powered by advanced AI. Ask questions about specializations, certifications, career transitions, and more.',
    ai_powered_guidance: 'AI-Powered Guidance',
    ai_powered_guidance_desc: 'Get personalized career advice based on your medical background and goals',
    specialization_planning: 'Specialization Planning',
    specialization_planning_desc: 'Explore different medical specialties and find the perfect match for your interests',
    career_progression: 'Career Progression',
    career_progression_desc: 'Plan your professional development with milestone tracking and certification guidance',
    global_opportunities: 'Global Opportunities',
    global_opportunities_desc: 'Discover international medical career paths and requirements',
    quick_start_topics: 'Quick Start Topics',
    quick_start_topics_desc: 'Click on any topic below to begin your conversation',
    medical_specialization: 'Medical Specialization',
    medical_specialization_question: 'What medical specialization would be best for my background and interests?',
    certification_path: 'Certification Path',
    certification_path_question: 'What certifications and qualifications do I need for my desired specialty?',
    career_transition: 'Career Transition',
    career_transition_question: 'How can I transition from clinical practice to medical research?',
    salary_expectations: 'Salary Expectations',
    salary_expectations_question: 'What are the salary expectations for different medical specialties?',
    start_new_conversation: 'Start New Conversation',
    private_secure: 'Private & Secure',
    ai_powered: 'AI-Powered',
    available_24_7: '24/7 Available',
    how_to_get_best_results: 'How to get the best results:',
    be_specific_background: '• Be specific about your medical background and experience',
    mention_career_goals: '• Mention your career goals and interests',
    ask_followup_questions: '• Ask follow-up questions for detailed guidance',
    upload_relevant_documents: '• Upload relevant documents for personalized advice',
    
    // File Upload
    upload_your_resume: 'Upload Your Resume',
    drag_drop_resume: 'Drag and drop your resume here, or click to browse',
    supports_pdf_docx: 'Supports PDF and DOCX files up to 10MB',
    choose_file: 'Choose File',
    file_uploaded_successfully: 'File Uploaded Successfully',
    processing: 'Processing...',
    replace_file: 'Replace File',
    file_type_error: 'Please upload only PDF or DOCX files',
    file_size_error: 'File size must be less than 10MB',
    
    // Profile Form
    personal_information: 'Personal Information',
    manage_basic_professional_info: 'Manage your basic and professional information',
    edit_profile: 'Edit Profile',
    basic_information: 'Basic Information',
    first_name: 'First Name',
    last_name: 'Last Name',
    email_address: 'Email Address',
    phone_number: 'Phone Number',
    date_of_birth: 'Date of Birth',
    gender: 'Gender',
    select_gender: 'Select Gender',
    male: 'Male',
    female: 'Female',
    other: 'Other',
    prefer_not_to_say: 'Prefer not to say',
    professional_information: 'Professional Information',
    medical_license_number: 'Medical License Number',
    license_state: 'License State',
    license_expiry_date: 'License Expiry Date',
    dea_number: 'DEA Number',
    npi_number: 'NPI Number',
    years_of_experience: 'Years of Experience',
    hospital_affiliation: 'Hospital Affiliation',
    department: 'Department',
    current_position: 'Current Position',
    professional_bio_links: 'Professional Bio & Links',
    professional_bio: 'Professional Bio',
    linkedin_url: 'LinkedIn URL',
    orcid_id: 'ORCID ID',
    cancel: 'Cancel',
    save_changes: 'Save Changes',
    
    // Validation Messages
    first_name_required: 'First name is required',
    last_name_required: 'Last name is required',
    email_required: 'Email is required',
    invalid_email: 'Invalid email address',
    license_number_required: 'License number is required',
    
    // Success/Error Messages
    profile_updated_success: 'Personal information updated successfully!',
    profile_update_error: 'Failed to update profile. Please try again.',
    
    // Hero Section Additional
    ai_career_analytics_platform: 'AI Career Analytics Platform',
    career_analysis_dashboard: 'Career Analysis Dashboard',
    ai_insights: 'AI Insights',
    career_growth: 'Career Growth',
    skill_match: 'Skill Match',
    emergency_medicine_short: 'Emergency Medicine',
    
    // Form Placeholders
    bio_placeholder: 'Tell us about your professional background, specializations, and interests...',
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

export default I18nContext;