export const handleCopy = async <T>(
    e: React.MouseEvent<T>,
    text: string,
    setIsCopied: (flag: boolean) => void
): Promise<void> => {
    e.preventDefault();

    try {
        if (!navigator.clipboard?.writeText) {
            throw new Error('Clipboard API is not available');
        }

        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
        console.error('Не удалось скопировать текст в буфер обмена:', error);
    }
};
