import OpenAI from 'openai';

// Initialize OpenAI client with proper error handling
let openai;

try {
  if (!import.meta.env.VITE_OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not configured. Please add VITE_OPENAI_API_KEY to your environment variables.');
  }

  if (!import.meta.env.VITE_OPENAI_API_KEY.startsWith('sk-')) {
    throw new Error('Invalid OpenAI API key format. API key should start with "sk-".');
  }

  openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });
} catch (error) {
  console.error('Failed to initialize OpenAI client:', error.message);
  openai = null;
}

/**
 * Validates OpenAI configuration
 * @returns {boolean} True if OpenAI is properly configured
 */
export function validateOpenAIConfig() {
  if (!openai) {
    console.error('OpenAI client is not initialized');
    return false;
  }
  
  if (!import.meta.env.VITE_OPENAI_API_KEY) {
    console.error('OpenAI API key is missing');
    return false;
  }
  
  return true;
}

/**
 * Handles OpenAI API errors with user-friendly messages
 * @param {Error} error - The error object from OpenAI
 * @returns {string} User-friendly error message
 */
export function handleOpenAIError(error) {
  console.error('OpenAI API Error:', error);
  
  if (error?.status === 401) {
    return 'Invalid or expired OpenAI API key. Please check your API key configuration and ensure it\'s valid and has sufficient credits.';
  }
  
  if (error?.status === 429) {
    return 'API rate limit exceeded. Please try again in a few moments.';
  }
  
  if (error?.status === 500) {
    return 'OpenAI service is temporarily unavailable. Please try again later.';
  }
  
  if (error?.code === 'insufficient_quota') {
    return 'OpenAI API quota exceeded. Please check your billing settings and add credits to your account.';
  }
  
  if (error?.message?.includes('API key') || error?.message?.includes('Incorrect API key')) {
    return 'API key error. Please verify your OpenAI API key is correct, active, and has sufficient credits. Visit https://platform.openai.com/account/api-keys to manage your keys.';
  }
  
  if (error?.message?.includes('network') || error?.code === 'ECONNREFUSED') {
    return 'Network connection error. Please check your internet connection and try again.';
  }
  
  return error?.message || 'An unexpected error occurred with the AI service. Please try again.';
}

/**
 * Test OpenAI connection
 * @returns {Promise<boolean>} True if connection is successful
 */
export async function testOpenAIConnection() {
  if (!validateOpenAIConfig()) {
    return false;
  }
  
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Hello' }],
      max_tokens: 5
    });
    
    return response?.choices?.length > 0;
  } catch (error) {
    console.error('OpenAI connection test failed:', error);
    return false;
  }
}

/**
 * Get OpenAI configuration status
 * @returns {object} Configuration status object
 */
export function getOpenAIConfigStatus() {
  const hasApiKey = !!import.meta.env.VITE_OPENAI_API_KEY;
  const hasValidFormat = hasApiKey && import.meta.env.VITE_OPENAI_API_KEY.startsWith('sk-');
  const isInitialized = !!openai;
  
  return {
    hasApiKey,
    hasValidFormat,
    isInitialized,
    isConfigured: hasApiKey && hasValidFormat && isInitialized
  };
}

export default openai;