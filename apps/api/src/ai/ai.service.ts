import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AiService {
  async getSuggestion(hotspot: string, currentEmission: number) {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new HttpException('OpenRouter API logic not configured.', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': 'https://carbonwise.io',
          'X-Title': 'CarbonWise',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'google/gemini-pro',
          messages: [
            { role: 'system', content: 'You are a sustainability expert evaluating footprint reduction strategies.' },
            { role: 'user', content: `Suggest 3 actionable tips for a user whose dominant emission hotspot is ${hotspot} with ${currentEmission} kg emitted.`}
          ]
        })
      });

      if (!response.ok) {
        throw new Error('LLM provider returned an error');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new HttpException('Failed to communicate with OpenRouter', HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
}
