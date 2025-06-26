import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatHeader = ({ 
  onToggleSidebar, 
  onExportChat, 
  onClearChat, 
  isConnected = true,
  conversationTitle = "Career Guidance Chat"
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleExport = (format) => {
    onExportChat(format);
    setShowMenu(false);
  };

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear this conversation? This action cannot be undone.')) {
      onClearChat();
    }
    setShowMenu(false);
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-border bg-surface">
      {/* Left Section */}
      <div className="flex items-center space-x-3">
        {/* Sidebar Toggle */}
        <Button
          variant="ghost"
          size="sm"
          iconName="Menu"
          onClick={onToggleSidebar}
          className="lg:hidden text-text-muted hover:text-primary"
        />

        {/* Chat Info */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Bot" size={20} color="white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-text-primary">
              {conversationTitle}
            </h1>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                isConnected ? 'bg-success' : 'bg-error'
              }`} />
              <span className="text-sm text-text-muted">
                {isConnected ? 'AI Assistant Online' : 'Connection Lost'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2">
        {/* Connection Status */}
        <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full bg-success-50 text-success text-sm">
          <Icon name="Wifi" size={14} />
          <span>Connected</span>
        </div>

        {/* Actions Menu */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            iconName="MoreVertical"
            onClick={() => setShowMenu(!showMenu)}
            className="text-text-muted hover:text-primary"
          />

          {showMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-lg medical-shadow-floating z-50">
              <div className="py-2">
                {/* Export Options */}
                <div className="px-3 py-2 text-xs font-medium text-text-muted uppercase tracking-wide">
                  Export Chat
                </div>
                <button
                  onClick={() => handleExport('pdf')}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-primary hover:bg-secondary-50 transition-colors"
                >
                  <Icon name="FileText" size={16} />
                  <span>Export as PDF</span>
                </button>
                <button
                  onClick={() => handleExport('txt')}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-primary hover:bg-secondary-50 transition-colors"
                >
                  <Icon name="Download" size={16} />
                  <span>Export as Text</span>
                </button>

                <div className="border-t border-border my-2" />

                {/* Chat Actions */}
                <button
                  onClick={() => setShowMenu(false)}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-primary hover:bg-secondary-50 transition-colors"
                >
                  <Icon name="Settings" size={16} />
                  <span>Chat Settings</span>
                </button>
                <button
                  onClick={handleClearChat}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-error hover:bg-error-50 transition-colors"
                >
                  <Icon name="Trash2" size={16} />
                  <span>Clear Conversation</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {showMenu && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  );
};

export default ChatHeader;