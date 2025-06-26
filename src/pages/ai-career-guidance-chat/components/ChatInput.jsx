import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ChatInput = ({ 
  onSendMessage, 
  onFileUpload, 
  disabled = false,
  placeholder = "Ask about your medical career path...",
  suggestions = []
}) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const quickSuggestions = [
    "What specialization matches my background?",
    "How do I transition to research?",
    "What certifications do I need?",
    "Compare salary expectations",
    "Work-life balance in different specialties",
    "International medical opportunities"
  ];

  const displaySuggestions = suggestions.length > 0 ? suggestions : quickSuggestions;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      onFileUpload(files);
    }
    e.target.value = '';
  };

  const handleSuggestionClick = (suggestion) => {
    setMessage(suggestion);
    setShowSuggestions(false);
    textareaRef.current?.focus();
  };

  const toggleVoiceRecording = () => {
    setIsRecording(!isRecording);
    // Voice recording implementation would go here
  };

  return (
    <div className="border-t border-border bg-surface">
      {/* Suggestions */}
      {showSuggestions && displaySuggestions.length > 0 && (
        <div className="p-4 border-b border-border">
          <div className="text-xs font-medium text-text-muted mb-3">
            Suggested questions:
          </div>
          <div className="flex flex-wrap gap-2">
            {displaySuggestions.slice(0, 6).map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-sm px-3 py-2 bg-secondary-50 hover:bg-secondary-100 text-text-secondary hover:text-primary rounded-full transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Main Input */}
          <div className="relative">
            <div className="flex items-end space-x-3">
              {/* File Upload */}
              <div className="flex-shrink-0">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  iconName="Paperclip"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-text-muted hover:text-primary"
                  disabled={disabled}
                />
              </div>

              {/* Text Input */}
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder={placeholder}
                  disabled={disabled}
                  className="w-full resize-none border border-border rounded-lg px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  rows={1}
                  style={{ minHeight: '44px', maxHeight: '120px' }}
                />
                
                {/* Character Count */}
                {message.length > 0 && (
                  <div className="absolute bottom-1 right-12 text-xs text-text-muted">
                    {message.length}/2000
                  </div>
                )}
              </div>

              {/* Voice Input */}
              <div className="flex-shrink-0">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  iconName={isRecording ? "MicOff" : "Mic"}
                  onClick={toggleVoiceRecording}
                  className={`${
                    isRecording 
                      ? 'text-error bg-error-50 hover:bg-error-100' :'text-text-muted hover:text-primary'
                  }`}
                  disabled={disabled}
                />
              </div>

              {/* Send Button */}
              <div className="flex-shrink-0">
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  iconName="Send"
                  disabled={!message.trim() || disabled}
                  className="px-4"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => setShowSuggestions(!showSuggestions)}
                className="flex items-center space-x-2 text-xs text-text-muted hover:text-primary transition-colors"
              >
                <Icon name="Lightbulb" size={14} />
                <span>Suggestions</span>
              </button>
              
              <div className="flex items-center space-x-2 text-xs text-text-muted">
                <Icon name="Zap" size={14} />
                <span>AI-powered responses</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs text-text-muted">
              <Icon name="Shield" size={14} />
              <span>Secure & Private</span>
            </div>
          </div>
        </form>
      </div>

      {/* Recording Indicator */}
      {isRecording && (
        <div className="absolute top-0 left-0 right-0 bg-error-50 border-b border-error-200 px-4 py-2">
          <div className="flex items-center justify-center space-x-2 text-error">
            <div className="w-2 h-2 bg-error rounded-full animate-pulse" />
            <span className="text-sm font-medium">Recording... Tap to stop</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInput;