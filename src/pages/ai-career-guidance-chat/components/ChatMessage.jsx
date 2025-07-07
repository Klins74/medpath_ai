import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import { messageSlideIn, typingIndicator } from '../../../utils/animations';

const ChatMessage = ({ 
  message, 
  isUser, 
  isTyping = false, 
  isStreaming = false,
  onCopy, 
  onRegenerate, 
  onFeedback 
}) => {
  if (isTyping) {
    return (
      <motion.div
        className="flex items-start space-x-4 p-6 border-b border-border"
        variants={messageSlideIn}
        initial="hidden"
        animate="visible"
      >
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="Bot" size={16} color="white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm font-medium text-text-primary">MedPath AI</span>
            <span className="text-xs text-text-muted">typing...</span>
          </div>
          <motion.div 
            className="flex space-x-1"
            variants={typingIndicator}
            animate="animate"
          >
            <div className="w-2 h-2 bg-text-muted rounded-full" />
            <div className="w-2 h-2 bg-text-muted rounded-full" />
            <div className="w-2 h-2 bg-text-muted rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`flex items-start space-x-4 p-6 border-b border-border ${
        isUser ? 'bg-secondary-25' : 'bg-background'
      }`}
      variants={messageSlideIn}
      initial="hidden"
      animate="visible"
    >
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser ? 'bg-secondary' : 'bg-primary'
      }`}>
        <Icon 
          name={isUser ? "User" : "Bot"} 
          size={16} 
          color="white" 
        />
      </div>

      {/* Message Content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-sm font-medium text-text-primary">
            {isUser ? 'You' : 'MedPath AI'}
          </span>
          <span className="text-xs text-text-muted">
            {message?.timestamp?.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
          {isStreaming && (
            <motion.div
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
          )}
        </div>

        {/* Message Text */}
        <div className="prose prose-sm max-w-none text-text-primary">
          {message?.content ? (
            <div className="whitespace-pre-wrap break-words">
              {message.content}
            </div>
          ) : (
            <div className="text-text-muted italic">No content</div>
          )}
        </div>

        {/* Attachments */}
        {message?.attachments && message.attachments.length > 0 && (
          <div className="mt-3 space-y-2">
            {message.attachments.map((attachment, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 p-2 bg-secondary-50 rounded-medical border border-border"
              >
                <Icon name="FileText" size={16} color="var(--color-text-muted)" />
                <span className="text-sm text-text-primary">{attachment.name}</span>
                <span className="text-xs text-text-muted">({attachment.size})</span>
              </div>
            ))}
          </div>
        )}

        {/* Suggestions */}
        {message?.suggestions && message.suggestions.length > 0 && !isUser && (
          <div className="mt-4 space-y-2">
            <div className="text-xs text-text-muted font-medium">Suggested follow-ups:</div>
            <div className="flex flex-wrap gap-2">
              {message.suggestions.map((suggestion, index) => (
                <motion.button
                  key={index}
                  className="px-3 py-1 text-xs bg-secondary-50 hover:bg-secondary-100 text-text-primary rounded-full border border-border transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    // This would trigger sending the suggestion as a new message
                    window.dispatchEvent(new CustomEvent('sendSuggestion', { detail: suggestion }));
                  }}
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        {!isUser && !isStreaming && (
          <div className="flex items-center space-x-2 mt-3">
            <motion.button
              className="flex items-center space-x-1 px-2 py-1 text-xs text-text-muted hover:text-text-primary transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCopy?.(message.id)}
            >
              <Icon name="Copy" size={12} />
              <span>Copy</span>
            </motion.button>
            
            <motion.button
              className="flex items-center space-x-1 px-2 py-1 text-xs text-text-muted hover:text-text-primary transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onRegenerate?.(message.id)}
            >
              <Icon name="RefreshCw" size={12} />
              <span>Regenerate</span>
            </motion.button>
            
            <div className="flex items-center space-x-1">
              <motion.button
                className="p-1 text-text-muted hover:text-green-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onFeedback?.(message.id, 'thumbs_up')}
              >
                <Icon name="ThumbsUp" size={12} />
              </motion.button>
              
              <motion.button
                className="p-1 text-text-muted hover:text-red-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onFeedback?.(message.id, 'thumbs_down')}
              >
                <Icon name="ThumbsDown" size={12} />
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;