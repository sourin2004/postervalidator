'use server';

/**
 * @fileOverview A flow to improve detected text content using an AI model.
 *
 * - improveDetectedText - A function that takes detected text and improves it.
 * - ImproveDetectedTextInput - The input type for the improveDetectedText function.
 * - ImproveDetectedTextOutput - The return type for the improveDetectedText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImproveDetectedTextInputSchema = z.object({
  detectedText: z
    .string()
    .describe('The text content detected from the poster image.'),
});
export type ImproveDetectedTextInput = z.infer<typeof ImproveDetectedTextInputSchema>;

const ImproveDetectedTextOutputSchema = z.object({
  improvedText: z
    .string()
    .describe('The improved text content after AI processing.'),
});
export type ImproveDetectedTextOutput = z.infer<typeof ImproveDetectedTextOutputSchema>;

export async function improveDetectedText(
  input: ImproveDetectedTextInput
): Promise<ImproveDetectedTextOutput> {
  return improveDetectedTextFlow(input);
}

const improveDetectedTextPrompt = ai.definePrompt({
  name: 'improveDetectedTextPrompt',
  input: {schema: ImproveDetectedTextInputSchema},
  output: {schema: ImproveDetectedTextOutputSchema},
  prompt: `You are an AI expert in text correction and improvement.

You will receive the detected text content from a poster image.
Your task is to correct any errors, improve readability, and ensure the text is accurate and coherent.

Detected Text: {{{detectedText}}}

Improved Text:`,
});

const improveDetectedTextFlow = ai.defineFlow(
  {
    name: 'improveDetectedTextFlow',
    inputSchema: ImproveDetectedTextInputSchema,
    outputSchema: ImproveDetectedTextOutputSchema,
  },
  async input => {
    const {output} = await improveDetectedTextPrompt(input);
    return output!;
  }
);
