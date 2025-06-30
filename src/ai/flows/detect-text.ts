'use server';
/**
 * @fileOverview A flow to detect text content from an image using an AI model.
 *
 * - detectTextInImage - A function that takes an image URL and detects text in it.
 * - DetectTextInImageInput - The input type for the detectTextInImage function.
 * - DetectTextInImageOutput - The return type for the detectTextInImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectTextInImageInputSchema = z.object({
  imageUrl: z
    .string()
    .describe('The URL of the poster image.'),
});
export type DetectTextInImageInput = z.infer<typeof DetectTextInImageInputSchema>;

const DetectTextInImageOutputSchema = z.object({
  detectedText: z
    .string()
    .describe('The text content detected from the poster image.'),
});
export type DetectTextInImageOutput = z.infer<typeof DetectTextInImageOutputSchema>;

export async function detectTextInImage(
  input: DetectTextInImageInput
): Promise<DetectTextInImageOutput> {
  return detectTextInImageFlow(input);
}

const detectTextInImagePrompt = ai.definePrompt({
  name: 'detectTextInImagePrompt',
  input: {schema: DetectTextInImageInputSchema},
  output: {schema: DetectTextInImageOutputSchema},
  prompt: `You are an AI expert in optical character recognition (OCR).
Your task is to extract all text content from the provided image. Respond with only the text detected.

Image: {{media url=imageUrl}}
`,
});

const detectTextInImageFlow = ai.defineFlow(
  {
    name: 'detectTextInImageFlow',
    inputSchema: DetectTextInImageInputSchema,
    outputSchema: DetectTextInImageOutputSchema,
  },
  async input => {
    const {output} = await detectTextInImagePrompt(input);
    return output!;
  }
);
