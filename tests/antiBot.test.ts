import { describe, it, expect } from 'vitest';
import { generateAntiBotChallenge, validateAntiBotAnswer } from '../src/utils/antiBot';

describe('AntiBot utility', () => {
  it('gerateAntiBotChallenge deve gerar dois números entre 1 e 10', () => {
    const challenge = generateAntiBotChallenge();
    expect(challenge.num1).toBeGreaterThanOrEqual(1);
    expect(challenge.num1).toBeLessThanOrEqual(10);
    expect(challenge.num2).toBeGreaterThanOrEqual(1);
    expect(challenge.num2).toBeLessThanOrEqual(10);
    expect(challenge.expectedSum).toBe(challenge.num1 + challenge.num2);
  });

  it('validateAntiBotAnswer deve validar a soma corretamente', () => {
    const challenge = { num1: 5, num2: 3, expectedSum: 8 };
    expect(validateAntiBotAnswer(challenge, 8)).toBe(true);
    expect(validateAntiBotAnswer(challenge, 7)).toBe(false);
  });
});
