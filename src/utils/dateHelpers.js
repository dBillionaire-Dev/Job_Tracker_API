export const daysBetween = (start, end) => {
    const diff = Math.abs(end - start);
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
};
