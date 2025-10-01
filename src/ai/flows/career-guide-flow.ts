'use server';
/**
 * @fileOverview An AI career guide that suggests professions based on skills and interests.
 * - getCareerSuggestions - A function that handles the career suggestion process.
 * - CareerGuideInput - The input type for the career suggestion function.
 * - CareerGuideOutput - The return type for the career suggestion function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const CareerGuideInputSchema = z.object({
  skills: z.array(z.string()).describe("A list of the user's professional skills."),
  interests: z.array(z.string()).describe("A list of the user's personal interests."),
});
export type CareerGuideInput = z.infer<typeof CareerGuideInputSchema>;

const CareerSuggestionSchema = z.object({
  title: z.string().describe('The title of the suggested career path.'),
  description: z
    .string()
    .describe('A brief, one-sentence description of why this career is a good fit.'),
});
export type CareerSuggestion = z.infer<typeof CareerSuggestionSchema>;

const CareerGuideOutputSchema = z.object({
  suggestions: z.array(CareerSuggestionSchema).describe('A list of 3-5 career suggestions.'),
});
export type CareerGuideOutput = z.infer<typeof CareerGuideOutputSchema>;

export async function getCareerSuggestions(input: CareerGuideInput): Promise<CareerGuideOutput> {
  return careerGuideFlow(input);
}

const prompt = ai.definePrompt({
  name: 'careerGuidePrompt',
  input: { schema: CareerGuideInputSchema },
  output: { schema: CareerGuideOutputSchema },
  prompt: `You are an expert career counselor for university students. Based on the student's skills and interests, provide a list of 3-5 potential career path suggestions. For each suggestion, provide a title and a brief, one-sentence description explaining why it's a good match.

Student's Skills:
{{#each skills}}
- {{this}}
{{/each}}

Student's Interests:
{{#each interests}}
- {{this}}
{{/each}}
`,
});

const careerGuideFlow = ai.defineFlow(
  {
    name: 'careerGuideFlow',
    inputSchema: CareerGuideInputSchema,
    outputSchema: CareerGuideOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      return { suggestions: [] };
    }
    return output;
  }
);
