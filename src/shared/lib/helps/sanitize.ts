/*
 * Утилиты нормализации пользовательского ввода.
 *
 * ВАЖНО: здесь НЕ выполняется HTML-экранирование.
 * React автоматически экранирует значения при рендере, а экранирование на входе
 * портит данные (например, `ООО "Ромашка"` превращалось в `ООО &quot;Ромашка&quot;`)
 * и приводит к двойному экранированию при выводе.
 *
 * Задача этих функций — убрать управляющие символы и нормализовать пробелы,
 * чтобы на сервер уходил предсказуемый текст.
 */

// Управляющие символы C0/C1, которые не должны попадать в текстовые поля
const CONTROL_CHARS = /[\u0000-\u001F\u007F-\u009F]/g;

/**
 * Нормализует строку: удаляет управляющие символы, схлопывает пробелы, обрезает края.
 * Не экранирует HTML — это ответственность слоя рендера.
 */
export function sanitizeInput(value: string): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(CONTROL_CHARS, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Рекурсивно нормализует строковые поля объекта (включая строки внутри массивов).
 */
export function sanitizeFormData<T extends Record<string, unknown>>(data: T): T {
  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value);
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map((item) =>
        typeof item === 'string' ? sanitizeInput(item) : item
      );
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized as T;
}
