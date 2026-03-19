import { describe, it, expect } from 'vitest';
import { isValidEmail, isValidPhone } from '../src/utils/validation';

describe('Validação utility', () => {
  it('isValidEmail deve validar emails corretamente', () => {
    expect(isValidEmail('teste@teste.com')).toBe(true);
    expect(isValidEmail('usuario.nome@dominio.com.br')).toBe(true);
    expect(isValidEmail('invalido')).toBe(false);
    expect(isValidEmail('teste@')).toBe(false);
    expect(isValidEmail('@dominio.com')).toBe(false);
  });

  it('isValidPhone deve validar formato de telefone BR corretamente', () => {
    expect(isValidPhone('(11) 98765-4321')).toBe(true);
    expect(isValidPhone('11987654321')).toBe(true); // Se aceitarmos sem mascára ou só formatado
    expect(isValidPhone('invalid')).toBe(false);
    expect(isValidPhone('123')).toBe(false);
  });
});
