/**
 * Generates a chat completion response using Google's Gemini API.
 * @param {string} userMessage - The user's input message.
 * @param {string} systemPrompt - The system prompt for context.
 * @returns {Promise<string>} The assistant's response.
 */
export async function getChatCompletion(userMessage, systemPrompt) {
  const prompt = `${systemPrompt}\n\nUser: ${userMessage}\nAI:`;
  const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
  const payload = { contents: chatHistory };
  
  // ИСПРАВЛЕНИЕ: Вставляем ваш API ключ прямо сюда
  const apiKey = "AIzaSyDLkCz3j0rE0HmXPYe3zT5DVEF1MtNtPOA"; 
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error("API Error:", errorBody);
      throw new Error(`API request failed with status ${response.status}: ${errorBody.error.message}`);
    }

    const result = await response.json();
    
    if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
      return result.candidates[0].content.parts[0].text.trim();
    } else {
      if (result.promptFeedback && result.promptFeedback.blockReason) {
         throw new Error(`Запрос был заблокирован: ${result.promptFeedback.blockReason}`);
      }
      throw new Error('ИИ вернул пустой или неверный ответ.');
    }
  } catch (error) {
    console.error('Error getting chat completion:', error);
    throw error;
  }
}
