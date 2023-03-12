// Returns string of format 'YYYY-MM-DD'
export const toSimpleDateString = (d: Date): string => {
    return d.toISOString().split('T')[0];
};
