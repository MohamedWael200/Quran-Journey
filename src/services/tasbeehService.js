const STORAGE_KEY = "tasbeeh-counts";

export const getTasbeehCounts = () => {
    const savedCounts = localStorage.getItem(STORAGE_KEY);

    return savedCounts
        ? JSON.parse(savedCounts)
        : {};
};

export const saveTasbeehCounts = (counts) => {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(counts)
    );
};