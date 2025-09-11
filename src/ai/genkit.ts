import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GEMINI_API_KEY, // itt a kulcs
    })
  ],
  model: 'googleai/gemini-2.5-flash',
});
