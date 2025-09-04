'use server';

/**
 * @fileOverview Generates recipe suggestions incorporating a specific type of honey.
 *
 * - generateRecipeSuggestions - A function to generate recipe suggestions.
 * - HoneyRecipeSuggestionsInput - The input type for the generateRecipeSuggestions function.
 * - HoneyRecipeSuggestionsOutput - The return type for the generateRecipeSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HoneyRecipeSuggestionsInputSchema = z.object({
  honeyType: z.string().describe('The type of honey for which to generate recipe suggestions.'),
  userPreferences: z.string().optional().describe('Optional user preferences or dietary restrictions.'),
});
export type HoneyRecipeSuggestionsInput = z.infer<typeof HoneyRecipeSuggestionsInputSchema>;

const HoneyRecipeSuggestionsOutputSchema = z.object({
  recipes: z.array(
    z.object({
      name: z.string().describe('The name of the recipe.'),
      ingredients: z.string().describe('The ingredients required for the recipe.'),
      instructions: z.string().describe('The instructions for preparing the recipe.'),
    })
  ).describe('An array of recipe suggestions incorporating the specified type of honey.'),
});
export type HoneyRecipeSuggestionsOutput = z.infer<typeof HoneyRecipeSuggestionsOutputSchema>;

export async function generateRecipeSuggestions(input: HoneyRecipeSuggestionsInput): Promise<HoneyRecipeSuggestionsOutput> {
  return honeyRecipeSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'honeyRecipeSuggestionsPrompt',
  input: {schema: HoneyRecipeSuggestionsInputSchema},
  output: {schema: HoneyRecipeSuggestionsOutputSchema},
  prompt: `You are a recipe suggestion AI. You suggest recipes that incorporate the type of honey provided.

  Honey Type: {{{honeyType}}}

  {{#if userPreferences}}
  User Preferences: {{{userPreferences}}}
  {{/if}}

  Suggest 3 different recipes using the honey, including the name, ingredients, and instructions.`,
});

const honeyRecipeSuggestionsFlow = ai.defineFlow(
  {
    name: 'honeyRecipeSuggestionsFlow',
    inputSchema: HoneyRecipeSuggestionsInputSchema,
    outputSchema: HoneyRecipeSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
