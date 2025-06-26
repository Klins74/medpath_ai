import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    {
      question: "How accurate is the AI career analysis?",
      answer: `Our AI analysis achieves 89.3% accuracy in career trajectory predictions, based on analysis of over 100,000 healthcare professional profiles. The system uses advanced machine learning models trained specifically on medical career data, combined with natural language processing to understand medical terminology and career patterns.\n\nWe continuously update our models with new data and user feedback to improve accuracy. The analysis considers factors like education, certifications, work experience, skills, and current market trends in healthcare.`
    },
    {
      question: "Is my personal and professional data secure?",
      answer: `Yes, we maintain the highest standards of data security and privacy. Our platform is fully HIPAA compliant and uses enterprise-grade encryption for all data transmission and storage. We employ multiple layers of security including:\n\n• End-to-end encryption for all data transfers\n• Secure cloud storage with encryption at rest\n• Regular security audits and penetration testing\n• Strict access controls and authentication protocols\n• No sharing of personal data with third parties without explicit consent`
    },
    {
      question: "What medical specializations does the platform support?",
      answer: `Our platform supports over 50 medical specializations and subspecialties, including:\n\n• Primary care specialties (Family Medicine, Internal Medicine, Pediatrics)\n• Surgical specialties (General Surgery, Orthopedics, Neurosurgery, etc.)\n• Medical specialties (Cardiology, Oncology, Endocrinology, etc.)\n• Emergency Medicine and Critical Care\n• Radiology and Pathology\n• Psychiatry and Mental Health\n• Nursing specializations\n• Healthcare administration and management roles\n\nWe regularly add new specializations based on user requests and industry developments.`
    },
    {
      question: "How long does the career analysis take?",
      answer: `The initial analysis typically takes 5-10 minutes to complete:\n\n• Resume upload and processing: 1-2 minutes\n• AI analysis and skill extraction: 2-3 minutes\n• Career mapping and recommendation generation: 2-5 minutes\n\nOnce complete, you'll have immediate access to your personalized career roadmap, skill gap analysis, and development recommendations. The AI chat feature is available instantly for follow-up questions and guidance.`
    },
    {
      question: "Can I update my profile and get new recommendations?",
      answer: `Absolutely! Your career profile is dynamic and can be updated at any time. When you add new experiences, certifications, or skills, our AI will automatically generate updated recommendations.\n\nFeatures include:\n• Real-time profile updates\n• Automatic re-analysis when significant changes are made\n• Progress tracking over time\n• Updated market insights and opportunities\n• Revised career roadmaps based on your growth\n\nWe recommend updating your profile quarterly or after major career milestones.`
    },
    {
      question: "Is there ongoing support and guidance available?",
      answer: `Yes, we provide comprehensive ongoing support:\n\n• 24/7 AI career advisor chat for instant guidance\n• Regular career market updates and insights\n• Personalized notifications about relevant opportunities\n• Access to career development resources and articles\n• Email support for technical issues\n• Community forums for peer networking\n• Monthly webinars with healthcare career experts\n\nOur goal is to support your entire career journey, not just provide a one-time analysis.`
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <section className="py-20 lg:py-32 bg-secondary-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="HelpCircle" size={16} />
            <span>Frequently Asked Questions</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold text-text-primary mb-6">
            Got Questions? We Have Answers
          </h2>
          
          <p className="text-lg text-text-secondary">
            Find answers to common questions about our AI-powered career guidance platform 
            and how it can help advance your medical career.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-surface border border-border rounded-2xl medical-shadow-card overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 lg:px-8 py-6 text-left flex items-center justify-between hover:bg-secondary-50 medical-transition"
              >
                <h3 className="text-lg font-semibold text-text-primary pr-4">
                  {faq.question}
                </h3>
                <div className={`flex-shrink-0 medical-transition ${
                  activeIndex === index ? 'rotate-180' : ''
                }`}>
                  <Icon name="ChevronDown" size={20} color="var(--color-primary)" />
                </div>
              </button>
              
              <div className={`overflow-hidden medical-transition ${
                activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 lg:px-8 pb-6">
                  <div className="pt-4 border-t border-border">
                    <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-16 text-center">
          <div className="bg-primary-50 rounded-2xl p-8 lg:p-12">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                <Icon name="MessageSquare" size={24} color="white" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Still Have Questions?
            </h3>
            
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Our support team is here to help you get the most out of MedPath AI. 
              Reach out to us for personalized assistance with your career development journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Mail" size={16} color="var(--color-primary)" />
                <span>support@medpath.ai</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Clock" size={16} color="var(--color-primary)" />
                <span>24/7 AI Support Available</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Phone" size={16} color="var(--color-primary)" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;