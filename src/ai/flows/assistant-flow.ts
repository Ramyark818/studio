'use server';
/**
 * @fileOverview A simple AI assistant flow.
 * - askAssistant - A function that takes a user prompt and returns a response.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const AssistantInputSchema = z.string();
const AssistantOutputSchema = z.string();

export async function askAssistant(promptText: string): Promise<string> {
  const assistantFlow = ai.defineFlow(
    {
      name: 'assistantFlow',
      inputSchema: AssistantInputSchema,
      outputSchema: AssistantOutputSchema,
    },
    async (prompt) => {
      const llmResponse = await ai.generate({
        prompt: `You are a helpful AI assistant for a university platform called StuHub. Answer the user's question concisely. User's question: ${prompt}`,
        model: 'googleai/gemini-2.5-flash',
      });
      return llmResponse.text;
    }
  );

  return await assistantFlow(promptText);
}
