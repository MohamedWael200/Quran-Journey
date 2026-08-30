const STORAGE_KEY = "quran-theme";

export const getTheme = () => {
    return localStorage.getItem(STORAGE_KEY) || "light";
};

export const saveTheme = (theme) => {
    localStorage.setItem(STORAGE_KEY, theme);
};