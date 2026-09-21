import { sanitizeInput, sanitizeFormData } from './sanitize';

describe('sanitizeInput', () => {
  it('trims whitespace', () => {
    expect(sanitizeInput('  hello  ')).toBe('hello');
  });

  it('removes control characters', () => {
    expect(sanitizeInput('hello\x00world')).toBe('hello world');
  });

  it('removes extra spaces between words', () => {
    expect(sanitizeInput('hello   world')).toBe('hello world');
  });

  it('returns empty string for non-string values', () => {
    expect(sanitizeInput(null as unknown as string)).toBe('');
    expect(sanitizeInput(undefined as unknown as string)).toBe('');
    expect(sanitizeInput(123 as unknown as string)).toBe('');
  });
});

describe('sanitizeFormData', () => {
  it('sanitizes string values and items inside arrays', () => {
    const input = {
      name: '  JOHN  ',
      tags: ['  VANILLA  ', '  CHOCOLATE  '],
    };

    expect(sanitizeFormData(input)).toEqual({
      name: 'JOHN',
      tags: ['VANILLA', 'CHOCOLATE'],
    });
  });

  it('leaves nested objects and non-string primitives unchanged', () => {
    const input = {
      count: 42,
      active: true,
      nested: { title: '  HELLO   WORLD  ' },
    };

    expect(sanitizeFormData(input)).toEqual({
      count: 42,
      active: true,
      nested: { title: '  HELLO   WORLD  ' },
    });
  });
});
