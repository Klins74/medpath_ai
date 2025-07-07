import openai, { validateOpenAIConfig, handleOpenAIError } from '../utils/openaiClient';

/**
 * Generates a chat completion response based on user input.
 * @param {string} userMessage - The user's input message.
 * @param {string} systemPrompt - The system prompt for context.
 * @returns {Promise<string>} The assistant's response.
 */
export async function getBasicChatCompletion(userMessage, systemPrompt = 'You are a helpful medical career advisor with expertise in healthcare specializations and career development. Provide detailed, accurate, and personalized guidance based on the user\'s medical career questions.') {
  if (!validateOpenAIConfig()) {
    throw new Error('OpenAI service is not available. Please check your API key configuration.');
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error in basic chat completion:', error);
    throw new Error(handleOpenAIError(error));
  }
}

/**
 * Streams a chat completion response chunk by chunk.
 * @param {string} userMessage - The user's input message.
 * @param {Function} onChunk - Callback to handle each streamed chunk.
 * @param {Function} onComplete - Callback when streaming is complete.
 * @param {Function} onError - Callback when an error occurs.
 * @param {string} systemPrompt - The system prompt for context.
 */
export async function getStreamingChatCompletion(userMessage, onChunk, onComplete = () => {}, onError = () => {}, systemPrompt = 'You are a helpful medical career advisor with expertise in healthcare specializations and career development. Provide detailed, accurate, and personalized guidance based on the user\'s medical career questions.') {
  if (!validateOpenAIConfig()) {
    const errorMessage = 'OpenAI service is not available. Please check your API key configuration.';
    onError(new Error(errorMessage));
    throw new Error(errorMessage);
  }

  try {
    const stream = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      stream: true,
      temperature: 0.7,
      max_tokens: 800,
    });

    let fullResponse = '';
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        fullResponse += content;
        onChunk(content);
      }
    }
    onComplete(fullResponse);
  } catch (error) {
    console.error('Error in streaming chat completion:', error);
    const errorMessage = handleOpenAIError(error);
    onError(new Error(errorMessage));
    throw new Error(errorMessage);
  }
}

/**
 * Analyzes uploaded resume content and provides career insights.
 * @param {string} resumeText - The extracted text from the resume.
 * @param {string} specialization - The selected medical specialization.
 * @returns {Promise<object>} Structured analysis response.
 */
export async function analyzeResume(resumeText, specialization) {
  if (!validateOpenAIConfig()) {
    throw new Error('OpenAI client is not properly configured');
  }

  try {
    const systemPrompt = `You are an expert medical career advisor specializing in ${specialization}. Analyze the provided resume and give structured feedback on career progression, skill gaps, and recommendations. Be specific and actionable in your advice.`;
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Please analyze this medical resume for ${specialization} specialization:\n\n${resumeText}` },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'resume_analysis',
          schema: {
            type: 'object',
            properties: {
              overall_score: { type: 'number' },
              strengths: { type: 'array', items: { type: 'string' } },
              skill_gaps: { type: 'array', items: { type: 'string' } },
              recommendations: { type: 'array', items: { type: 'string' } },
              career_level: { type: 'string' },
              next_steps: { type: 'array', items: { type: 'string' } },
              certifications_needed: { type: 'array', items: { type: 'string' } },
              experience_summary: { type: 'string' }
            },
            required: ['overall_score', 'strengths', 'skill_gaps', 'recommendations', 'career_level', 'next_steps', 'certifications_needed', 'experience_summary'],
            additionalProperties: false,
          },
        },
      },
      temperature: 0.3,
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Error analyzing resume:', error);
    throw new Error(handleOpenAIError(error));
  }
}

/**
 * Generates personalized career roadmap based on analysis.
 * @param {object} analysisData - The resume analysis data.
 * @param {string} specialization - The selected medical specialization.
 * @returns {Promise<object>} Structured roadmap response.
 */
export async function generateCareerRoadmap(analysisData, specialization) {
  if (!validateOpenAIConfig()) {
    throw new Error('OpenAI client is not properly configured');
  }

  try {
    const prompt = `Based on this career analysis for ${specialization}, create a detailed career roadmap with specific timelines, milestones, and actionable steps: ${JSON.stringify(analysisData)}`;
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are an expert medical career strategist. Create detailed career roadmaps with specific milestones, timelines, and actionable steps. Include certification requirements, skill development, and networking opportunities.' },
        { role: 'user', content: prompt },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'career_roadmap',
          schema: {
            type: 'object',
            properties: {
              milestones: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    title: { type: 'string' },
                    description: { type: 'string' },
                    timeline: { type: 'string' },
                    actions: { type: 'array', items: { type: 'string' } },
                    priority: { type: 'string' },
                    estimated_duration: { type: 'string' }
                  },
                  required: ['title', 'description', 'timeline', 'actions', 'priority', 'estimated_duration']
                }
              },
              estimated_duration: { type: 'string' },
              key_focus_areas: { type: 'array', items: { type: 'string' } },
              success_metrics: { type: 'array', items: { type: 'string' } },
              resources: { type: 'array', items: { type: 'string' } }
            },
            required: ['milestones', 'estimated_duration', 'key_focus_areas', 'success_metrics', 'resources'],
            additionalProperties: false,
          },
        },
      },
      temperature: 0.5,
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Error generating career roadmap:', error);
    throw new Error(handleOpenAIError(error));
  }
}

/**
 * Generates career recommendations based on user preferences and background.
 * @param {object} userProfile - User's profile information.
 * @returns {Promise<object>} Structured recommendations response.
 */
export async function generateCareerRecommendations(userProfile) {
  if (!validateOpenAIConfig()) {
    throw new Error('OpenAI client is not properly configured');
  }

  try {
    const prompt = `Based on this user profile, provide personalized medical career recommendations: ${JSON.stringify(userProfile)}`;
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are an expert medical career counselor. Provide personalized career recommendations based on user profiles, including suitable specializations, growth opportunities, and career paths.' },
        { role: 'user', content: prompt },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'career_recommendations',
          schema: {
            type: 'object',
            properties: {
              recommended_specializations: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    match_percentage: { type: 'number' },
                    reasoning: { type: 'string' },
                    growth_outlook: { type: 'string' },
                    salary_range: { type: 'string' }
                  },
                  required: ['name', 'match_percentage', 'reasoning', 'growth_outlook', 'salary_range']
                }
              },
              skill_development_plan: { type: 'array', items: { type: 'string' } },
              networking_opportunities: { type: 'array', items: { type: 'string' } },
              immediate_actions: { type: 'array', items: { type: 'string' } }
            },
            required: ['recommended_specializations', 'skill_development_plan', 'networking_opportunities', 'immediate_actions'],
            additionalProperties: false,
          },
        },
      },
      temperature: 0.6,
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Error generating career recommendations:', error);
    throw new Error(handleOpenAIError(error));
  }
}

/**
 * Extracts text from uploaded document files.
 * @param {File} file - The uploaded file.
 * @returns {Promise<string>} Extracted text content.
 */
export async function extractTextFromDocument(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const content = event.target.result;
      
      // Simple text extraction - in production, you'd use more sophisticated parsers
      if (file.type === 'text/plain') {
        resolve(content);
      } else if (file.type === 'application/pdf') {
        // For PDF files, you'd typically use a library like pdf-parse
        // For now, we'll provide a placeholder
        resolve(`PDF content extracted from ${file.name}`);
      } else {
        // For other file types, try to extract as text
        resolve(content);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsText(file);
  });
}