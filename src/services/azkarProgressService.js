const STORAGE_KEY = "azkar-progress";

const getTodayDate = () => {
    return new Date().toISOString().split("T")[0];
};

export const getAzkarProgress = (categoryId) => {
    const savedProgress = localStorage.getItem(STORAGE_KEY);

    if (!savedProgress) {
        return null;
    }

    const progress = JSON.parse(savedProgress);

    const today = getTodayDate();

    // لو البيانات من يوم مختلف
    // نرجع null عشان العدادات تبدأ من جديد
    if (progress.date !== today) {
        return null;
    }

    return progress.categories?.[categoryId] || null;
};

export const saveAzkarProgress = (categoryId, counts) => {
    const savedProgress = localStorage.getItem(STORAGE_KEY);

    const progress = savedProgress
        ? JSON.parse(savedProgress)
        : {
            date: getTodayDate(),
            categories: {},
        };

    const today = getTodayDate();

    // لو يوم جديد نبدأ بيانات جديدة
    if (progress.date !== today) {
        progress.date = today;
        progress.categories = {};
    }

    progress.categories[categoryId] = counts;

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(progress)
    );
};