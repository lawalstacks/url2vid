// modules/geminiAPI.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(`AIzaSyBbchQmeYuXzboiQKn9UcLQPGTuK55AC-I`);

/**
 * Function to generate a story from content using Google Gemini API
 * @param {string} content - The content to feed into the API.
 * @returns {Promise<string>} - The generated story.
 */

export async function generateStory(content) {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent(
            `summarize this content into 3 parts 30 words each, no heading,no numbering, no bullet point, only use spaces to separate each part:\n\n${content}`,
        );
        return result.response.text();
    } catch (error) {
        console.error('Error generating story:', error);
    }
}