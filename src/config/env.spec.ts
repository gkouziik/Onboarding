import { env } from '@/config/env.ts';

it('reads env values', () => {
  expect(env.apiUrl).toBe('https://api.test.test');
  expect(env.apiKey).toBe('test-key');
});
