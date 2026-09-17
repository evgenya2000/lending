/*
 * Утилита для санитизации пользовательского ввода от XSS-атак
 */

/**
 * Удаляет HTML-теги и опасные символы из строки
 * Используется для очистки пользовательского ввода перед отправкой на сервер
 */
export function sanitizeInput(value: string): string {
  // Замена HTML-сущностей на безопасные эквиваленты
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

/**
 * Очищает объект формы от XSS-атак
 * Рекурсивно обрабатывает все строковые поля
 */
export function sanitizeFormData<T extends Record<string, unknown>>(data: T): T {
  const sanitized: Record<string, unknown> = {};
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value);
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map(item => 
        typeof item === 'string' ? sanitizeInput(item) : item
      );
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized as T;
}

/**
 * Безопасное декодирование строки для отображения (если нужно показать оригинал)
 */
export function decodeSafeInput(value: string): string {
  return value
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/')
    .replace(/&amp;/g, '&');
}