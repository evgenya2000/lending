import { handleCopy } from './handleCopy';

describe('handleCopy', () => {
  const originalClipboard = global.navigator.clipboard;
  const createMockEvent = (): React.MouseEvent<HTMLButtonElement> =>
    ({ preventDefault: jest.fn() } as unknown as React.MouseEvent<HTMLButtonElement>);

  afterEach(() => {
    Object.defineProperty(global.navigator, 'clipboard', {
      value: originalClipboard,
      writable: true,
      configurable: true,
    });
    jest.restoreAllMocks();
  });

  it('copies text to clipboard and toggles copied state', async () => {
    jest.useFakeTimers();
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(global.navigator, 'clipboard', {
      value: { writeText },
      writable: true,
      configurable: true,
    });
    const setIsCopied = jest.fn();

    await handleCopy(createMockEvent(), 'hello', setIsCopied);

    expect(writeText).toHaveBeenCalledWith('hello');
    expect(setIsCopied).toHaveBeenCalledWith(true);

    jest.advanceTimersByTime(2000);
    expect(setIsCopied).toHaveBeenCalledWith(false);

    jest.useRealTimers();
  });

  it('logs an error when clipboard API is unavailable', async () => {
    Object.defineProperty(global.navigator, 'clipboard', {
      value: undefined,
      writable: true,
      configurable: true,
    });
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    const setIsCopied = jest.fn();

    await handleCopy(createMockEvent(), 'hello', setIsCopied);

    expect(consoleError).toHaveBeenCalledWith(
      'Не удалось скопировать текст в буфер обмена:',
      expect.any(Error)
    );
    expect(setIsCopied).not.toHaveBeenCalled();
  });
});
