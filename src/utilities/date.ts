export const toSimpleDateString = (d: Date): string => {
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};
