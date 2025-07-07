/**
 * Notification utility for user feedback
 */

let notificationContainer = null;

/**
 * Creates the notification container if it doesn't exist
 */
const createNotificationContainer = () => {
  if (!notificationContainer) {
    notificationContainer = document.createElement('div');
    notificationContainer.id = 'notification-container';
    notificationContainer.className = 'fixed top-4 right-4 z-50 space-y-2';
    document.body.appendChild(notificationContainer);
  }
};

/**
 * Shows a notification with specified type and message
 * @param {string} message - The notification message
 * @param {string} type - The notification type ('success', 'error', 'warning', 'info')
 * @param {number} duration - Duration in milliseconds (default: 5000)
 */
export const showNotification = (message, type = 'info', duration = 5000) => {
  createNotificationContainer();
  
  const notification = document.createElement('div');
  notification.className = `
    max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-lg p-4 
    transform transition-all duration-300 ease-in-out translate-x-full opacity-0
    ${type === 'success' ? 'border-green-200 bg-green-50' : ''}
    ${type === 'error' ? 'border-red-200 bg-red-50' : ''}
    ${type === 'warning' ? 'border-yellow-200 bg-yellow-50' : ''}
    ${type === 'info' ? 'border-blue-200 bg-blue-50' : ''}
  `;
  
  const iconMap = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };
  
  notification.innerHTML = `
    <div class="flex items-center space-x-3">
      <span class="text-lg">${iconMap[type]}</span>
      <div class="flex-1">
        <p class="text-sm font-medium text-gray-900">${message}</p>
      </div>
      <button class="text-gray-400 hover:text-gray-600 transition-colors" onClick="this.parentElement.parentElement.remove()">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </button>
    </div>
  `;
  
  notificationContainer.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.classList.remove('translate-x-full', 'opacity-0');
    notification.classList.add('translate-x-0', 'opacity-100');
  }, 10);
  
  // Auto remove after duration
  setTimeout(() => {
    notification.classList.add('translate-x-full', 'opacity-0');
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 300);
  }, duration);
};

/**
 * Shows a success notification
 * @param {string} message - The success message
 * @param {number} duration - Duration in milliseconds
 */
export const showSuccess = (message, duration = 5000) => {
  showNotification(message, 'success', duration);
};

/**
 * Shows an error notification
 * @param {string} message - The error message
 * @param {number} duration - Duration in milliseconds
 */
export const showError = (message, duration = 7000) => {
  showNotification(message, 'error', duration);
};

/**
 * Shows a warning notification
 * @param {string} message - The warning message
 * @param {number} duration - Duration in milliseconds
 */
export const showWarning = (message, duration = 6000) => {
  showNotification(message, 'warning', duration);
};

/**
 * Shows an info notification
 * @param {string} message - The info message
 * @param {number} duration - Duration in milliseconds
 */
export const showInfo = (message, duration = 5000) => {
  showNotification(message, 'info', duration);
};

/**
 * Shows a development notification for features under development
 * @param {string} featureName - The name of the feature
 */
export const showDevNotification = (featureName = 'This feature') => {
  showNotification(`${featureName} is currently under development and will be available soon!`, 'info', 4000);
};