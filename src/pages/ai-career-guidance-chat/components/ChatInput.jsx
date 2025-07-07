import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { slideUp, buttonHover } from '../../../utils/animations';

const ChatInput = ({ 
  onSendMessage, 
  onFileUpload, 
  disabled = false,
  placeholder = "Ask about your medical career path...",
  suggestions = []
}) => {
  const [message, setMessage] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  // Listen for suggestion events
  useEffect(() => {
    const handleSuggestion = (event) => {
      setMessage(event.detail);
      setTimeout(() => textareaRef.current?.focus(), 0);
    };

    window.addEventListener('sendSuggestion', handleSuggestion);
    return () => window.removeEventListener('sendSuggestion', handleSuggestion);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      setIsComposing(false);
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
    // Reset file input
    e.target.value = '';
  };

  const handleSuggestionClick = (suggestion) => {
    setMessage(suggestion);
    setTimeout(() => textareaRef.current?.focus(), 0);
  };

  return (
    <motion.div
      className="border-t border-border bg-surface"
      variants={slideUp}
      initial="hidden"
      animate="visible"
    >
      {/* Suggestions */}
      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div
            className="p-4 border-b border-border"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Lightbulb" size={14} color="var(--color-text-muted)" />
              <span className="text-sm text-text-muted">Suggested questions:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <motion.button
                  key={index}
                  className="px-3 py-1.5 text-sm bg-secondary-50 hover:bg-secondary-100 text-text-primary rounded-full border border-border transition-colors"
                  whileHover={buttonHover}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4">
        <div className="relative bg-background rounded-medical border border-border">
          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setIsComposing(e.target.value.length > 0);
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className="w-full resize-none border-0 bg-transparent p-3 pr-20 text-text-primary placeholder-text-muted focus:outline-none focus:ring-0 disabled:opacity-50"
            rows={1}
            style={{ minHeight: '44px', maxHeight: '120px' }}
          />

          {/* Actions */}
          <div className="absolute right-2 bottom-2 flex items-center space-x-2">
            {/* File Upload */}
            <motion.button
              type="button"
              className="p-2 text-text-muted hover:text-text-primary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
            >
              <Icon name="Paperclip" size={16} />
            </motion.button>

            {/* Send Button */}
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={disabled || !message.trim()}
              className="px-3 py-1.5"
            >
              <Icon name="Send" size={14} />
            </Button>
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".txt,.pdf,.doc,.docx,.rtf"
          multiple
          onChange={handleFileSelect}
        />

        {/* Status */}
        <div className="flex items-center justify-between mt-2 text-xs text-text-muted">
          <div className="flex items-center space-x-4">
            <span>Press Enter to send, Shift+Enter for new line</span>
            {isComposing && (
              <motion.span
                className="flex items-center space-x-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Icon name="Edit3" size={12} />
                <span>Typing...</span>
              </motion.span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={12} />
            <span>Secure & Private</span>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default ChatInput;