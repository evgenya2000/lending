export const handleCopy = async <T>(e: React.MouseEvent<T>, text: string, setIsCopied: (flag: boolean) => void) => {
    e.preventDefault();
    const result = await navigator.clipboard.writeText(text)
        .finally(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });

    return result;
};