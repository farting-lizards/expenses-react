export const normalizeString = (str: string | null): string => (str ? str?.trim().toLowerCase() : '');
