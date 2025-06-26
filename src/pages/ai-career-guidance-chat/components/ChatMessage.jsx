import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatMessage = ({ 
  message, 
  isUser = false, 
  isTyping = false,
  onCopy,
  onRegenerate,
  onFeedback 
}) => {
  const [showActions, setShowActions] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    onCopy && onCopy(message.id);
  };

  const handleFeedback = (type) => {
    setFeedback(type);
    onFeedback && onFeedback(message.id, type);
  };

  if (isTyping) {
    return (
      <div className="flex items-start space-x-3 p-4">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="Bot" size={16} color="white" />
        </div>
        <div className="flex-1">
          <div className="bg-secondary-50 rounded-lg p-4 max-w-3xl">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-sm text-text-muted">AI is thinking...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`flex items-start space-x-3 p-4 group hover:bg-secondary-25 transition-colors ${
        isUser ? 'flex-row-reverse space-x-reverse' : ''
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser 
          ? 'bg-accent text-accent-foreground' 
          : 'bg-primary text-primary-foreground'
      }`}>
        <Icon 
          name={isUser ? 'User' : 'Bot'} 
          size={16} 
          color="white" 
        />
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-3xl ${isUser ? 'text-right' : ''}`}>
        {/* Message Bubble */}
        <div className={`rounded-lg p-4 ${
          isUser 
            ? 'bg-primary text-primary-foreground ml-auto max-w-2xl' 
            : 'bg-secondary-50 text-text-primary'
        }`}>
          {/* Message Text */}
          <div className="prose prose-sm max-w-none">
            {message.content.split('\n').map((line, index) => (
              <p key={index} className={`${index === 0 ? '' : 'mt-2'} ${
                isUser ? 'text-primary-foreground' : 'text-text-primary'
              }`}>
                {line}
              </p>
            ))}
          </div>

          {/* Attachments */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-3 space-y-2">
              {message.attachments.map((attachment, index) => (
                <div key={index} className={`flex items-center space-x-2 p-2 rounded border ${
                  isUser 
                    ? 'border-primary-200 bg-primary-100' :'border-secondary-200 bg-surface'
                }`}>
                  <Icon name="Paperclip" size={14} />
                  <span className="text-sm font-medium">{attachment.name}</span>
                  <span className="text-xs opacity-75">({attachment.size})</span>
                </div>
              ))}
            </div>
          )}

          {/* Suggested Follow-ups (AI messages only) */}
          {!isUser && message.suggestions && message.suggestions.length > 0 && (
            <div className="mt-4 space-y-2">
              <div className="text-xs font-medium text-text-muted mb-2">
                Suggested follow-ups:
              </div>
              {message.suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="block w-full text-left text-sm p-2 rounded border border-secondary-200 hover:border-primary hover:bg-primary-50 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Message Meta & Actions */}
        <div className={`flex items-center justify-between mt-2 px-1 ${
          isUser ? 'flex-row-reverse' : ''
        }`}>
          {/* Timestamp */}
          <span className="text-xs text-text-muted">
            {formatTimestamp(message.timestamp)}
          </span>

          {/* Actions */}
          <div className={`flex items-center space-x-1 transition-opacity ${
            showActions ? 'opacity-100' : 'opacity-0'
          }`}>
            {!isUser && (
              <>
                {/* Copy Button */}
                <Button
                  variant="ghost"
                  size="xs"
                  iconName="Copy"
                  onClick={handleCopy}
                  className="text-text-muted hover:text-primary"
                />

                {/* Regenerate Button */}
                <Button
                  variant="ghost"
                  size="xs"
                  iconName="RotateCcw"
                  onClick={() => onRegenerate && onRegenerate(message.id)}
                  className="text-text-muted hover:text-primary"
                />

                {/* Feedback Buttons */}
                <div className="flex items-center space-x-1 ml-2">
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="ThumbsUp"
                    onClick={() => handleFeedback('positive')}
                    className={`${
                      feedback === 'positive' ?'text-success bg-success-50' :'text-text-muted hover:text-success'
                    }`}
                  />
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="ThumbsDown"
                    onClick={() => handleFeedback('negative')}
                    className={`${
                      feedback === 'negative' ?'text-error bg-error-50' :'text-text-muted hover:text-error'
                    }`}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;