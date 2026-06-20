import { AiService } from './ai.service';

describe('AiService', () => {
  let service: AiService;

  beforeEach(() => {
    service = new AiService();
  });

  describe('getSuggestion', () => {
    it('should throw when OPENROUTER_API_KEY is not set', async () => {
      delete process.env.OPENROUTER_API_KEY;
      await expect(service.getSuggestion('TRANSPORTATION', 100))
        .rejects
        .toThrow('OpenRouter API logic not configured.');
    });

    it('should call OpenRouter API with correct parameters when key is set', async () => {
      process.env.OPENROUTER_API_KEY = 'test-key';
      
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          choices: [{ message: { content: 'Use public transport' } }]
        }),
      };

      global.fetch = jest.fn().mockResolvedValue(mockResponse) as jest.Mock;

      const result = await service.getSuggestion('TRANSPORTATION', 100);

      expect(global.fetch).toHaveBeenCalledWith(
        'https://openrouter.ai/api/v1/chat/completions',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Authorization': 'Bearer test-key',
            'Content-Type': 'application/json',
          }),
        }),
      );

      expect(result).toBeDefined();
      expect(result.choices).toBeDefined();
    });

    it('should throw SERVICE_UNAVAILABLE when OpenRouter returns error', async () => {
      process.env.OPENROUTER_API_KEY = 'test-key';

      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 500,
      }) as jest.Mock;

      await expect(service.getSuggestion('FOOD', 50))
        .rejects
        .toThrow('Failed to communicate with OpenRouter');
    });

    it('should throw SERVICE_UNAVAILABLE on network failure', async () => {
      process.env.OPENROUTER_API_KEY = 'test-key';

      global.fetch = jest.fn().mockRejectedValue(new Error('Network error')) as jest.Mock;

      await expect(service.getSuggestion('ENERGY', 75))
        .rejects
        .toThrow('Failed to communicate with OpenRouter');
    });
  });
});
