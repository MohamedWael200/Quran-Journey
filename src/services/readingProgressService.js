const STORAGE_KEY = "quran-reading-progress";

export const saveReadingProgress = (pageNumber) => {
    localStorage.setItem(STORAGE_KEY, pageNumber);
};

export const getReadingProgress = () => {
    return localStorage.getItem(STORAGE_KEY);
};