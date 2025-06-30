'use server';
/**
 * @fileOverview A flow to validate a poster image and extract its content.
 *
 * - validatePoster - A function that takes an image URL and returns a comprehensive analysis.
 * - ValidatePosterInput - The input type for the validatePoster function.
 * - ValidatePosterOutput - The return type for the validatePoster function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidatePosterInputSchema = z.object({
  imageUrl: z.string().url().describe('The URL of the image to analyze.'),
});
export type ValidatePosterInput = z.infer<typeof ValidatePosterInputSchema>;

const BoundingBoxSchema = z.object({
    x: z.number().describe('The x-coordinate of the top-left corner of the bounding box.'),
    y: z.number().describe('The y-coordinate of the top-left corner of the bounding box.'),
    width: z.number().describe('The width of the bounding box.'),
    height: z.number().describe('The height of the bounding box.'),
});

const DimensionsCmSchema = z.object({
    width: z.number().describe('The estimated width of the poster in centimeters.'),
    height: z.number().describe('The estimated height of the poster in centimeters.'),
});

const ValidatePosterOutputSchema = z.object({
  containsPoster: z.boolean().describe('Whether a poster was detected in the image.'),
  boundingBox: BoundingBoxSchema.optional().describe('The bounding box of the detected poster.'),
  dimensionsCm: DimensionsCmSchema.optional().describe('The estimated real-world dimensions of the poster in centimeters.'),
  confidence: z.number().optional().describe('The confidence score of the detection (0 to 1).'),
  detectedText: z.string().optional().describe('The AI-improved text content extracted from the poster.'),
});
export type ValidatePosterOutput = z.infer<typeof ValidatePosterOutputSchema>;

export async function validatePoster(input: ValidatePosterInput): Promise<ValidatePosterOutput> {
  return validatePosterFlow(input);
}

const validatePosterPrompt = ai.definePrompt({
  name: 'validatePosterPrompt',
  input: {schema: ValidatePosterInputSchema},
  output: {schema: ValidatePosterOutputSchema},
  prompt: `You are an AI-powered poster analysis expert. Your task is to analyze the image provided and determine if it contains a poster.

Image: {{media url=imageUrl}}

1.  **Analyze the image:** Determine if it contains a poster. Set 'containsPoster' to true or false.
2.  **If a poster is found:**
    *   Identify the poster's location and provide its bounding box (x, y, width, height).
    *   Estimate the poster's real-world dimensions in centimeters (e.g., A3 is 29.7 x 42.0 cm).
    *   Provide a confidence score (from 0.0 to 1.0) for your analysis.
    *   Extract all text from the poster using OCR.
    *   Critically review and improve the extracted text for errors, clarity, and formatting. The final text should be clean and readable.
    *   Populate all the fields in the output schema.
3.  **If no poster is found:** Set 'containsPoster' to false and leave the other fields empty.
`,
});

const validatePosterFlow = ai.defineFlow(
  {
    name: 'validatePosterFlow',
    inputSchema: ValidatePosterInputSchema,
    outputSchema: ValidatePosterOutputSchema,
  },
  async input => {
    const {output} = await validatePosterPrompt(input);
    return output!;
  }
);
