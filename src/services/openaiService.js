import openai from '../utils/openaiClient';

/**
 * Generates a chat completion response based on user input.
 * @param {string} userMessage - The user's input message.
 * @param {string} systemPrompt - The system prompt for context.
 * @returns {Promise<string>} The assistant's response.
 */
export async function getBasicChatCompletion(userMessage, systemPrompt = 'You are a helpful medical career advisor with expertise in healthcare specializations and career development.') {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error in basic chat completion:', error);
    throw error;
  }
}

/**
 * Streams a chat completion response chunk by chunk.
 * @param {string} userMessage - The user's input message.
 * @param {Function} onChunk - Callback to handle each streamed chunk.
 * @param {string} systemPrompt - The system prompt for context.
 */
export async function getStreamingChatCompletion(userMessage, onChunk, systemPrompt = 'You are a helpful medical career advisor with expertise in healthcare specializations and career development.') {
  try {
    const stream = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      stream: true,
      temperature: 0.7,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        onChunk(content);
      }
    }
  } catch (error) {
    console.error('Error in streaming chat completion:', error);
    throw error;
  }
}

/**
 * Analyzes uploaded resume content and provides career insights.
 * @param {string} resumeText - The extracted text from the resume.
 * @param {string} specialization - The selected medical specialization.
 * @returns {Promise<object>} Structured analysis response.
 */
export async function analyzeResume(resumeText, specialization) {
  try {
    const systemPrompt = `You are an expert medical career advisor specializing in ${specialization}. Analyze the provided resume and give structured feedback on career progression, skill gaps, and recommendations.`;
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
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
              next_steps: { type: 'array', items: { type: 'string' } }
            },
            required: ['overall_score', 'strengths', 'skill_gaps', 'recommendations', 'career_level', 'next_steps'],
            additionalProperties: false,
          },
        },
      },
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Error analyzing resume:', error);
    throw error;
  }
}

/**
 * Generates personalized career roadmap based on analysis.
 * @param {object} analysisData - The resume analysis data.
 * @param {string} specialization - The selected medical specialization.
 * @returns {Promise<object>} Structured roadmap response.
 */
export async function generateCareerRoadmap(analysisData, specialization) {
  try {
    const prompt = `Based on this career analysis for ${specialization}, create a detailed career roadmap: ${JSON.stringify(analysisData)}`;
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are an expert medical career strategist. Create detailed career roadmaps with specific milestones, timelines, and actionable steps.' },
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
                    actions: { type: 'array', items: { type: 'string' } }
                  },
                  required: ['title', 'description', 'timeline', 'actions']
                }
              },
              estimated_duration: { type: 'string' },
              key_focus_areas: { type: 'array', items: { type: 'string' } }
            },
            required: ['milestones', 'estimated_duration', 'key_focus_areas'],
            additionalProperties: false,
          },
        },
      },
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Error generating career roadmap:', error);
    throw error;
  }
}