const DAILY_STATS_KEY = "daily-stats";
const DAILY_STATS_HISTORY_KEY = "daily-stats-history";

const getTodayDate = () => {
    return new Date().toISOString().split("T")[0];
};

const createEmptyStats = (date) => {
    return {
        date,

        tasbeeh: {
            total: 0,
        },

        azkar: {
            categories: {},
            completed: 0,
            total: 0,
        },

        readPages: [],

        listening: {
            totalSeconds: 0,
            completedSurahs: [],
        },
    };
};

export const getDailyStats = () => {
    const today = getTodayDate();

    const savedStats = localStorage.getItem(
        DAILY_STATS_KEY
    );

    if (!savedStats) {
        const newStats = createEmptyStats(today);

        localStorage.setItem(
            DAILY_STATS_KEY,
            JSON.stringify(newStats)
        );

        return newStats;
    }

    const stats = JSON.parse(savedStats);

    if (!stats.tasbeeh) {
        stats.tasbeeh = {
            total: 0,
        };
    }

    if (!stats.azkar) {
        stats.azkar = {
            categories: {},
            completed: 0,
            total: 0,
        };
    }

    if (!stats.azkar.categories) {
        stats.azkar.categories = {};
    }

    // لو دخلنا يوم جديد
    if (stats.date !== today) {
        // نحفظ اليوم القديم في الـ History
        addToHistory(stats);

        const newStats = createEmptyStats(today);

        localStorage.setItem(
            DAILY_STATS_KEY,
            JSON.stringify(newStats)
        );

        return newStats;
    }

    return stats;
};

export const saveDailyStats = (stats) => {
    localStorage.setItem(
        DAILY_STATS_KEY,
        JSON.stringify(stats)
    );
};

const addToHistory = (stats) => {
    const history = getStatsHistory();

    // نتأكد إن اليوم مش موجود قبل كده
    const existingIndex = history.findIndex(
        (item) => item.date === stats.date
    );

    if (existingIndex !== -1) {
        history[existingIndex] = stats;
    } else {
        history.push(stats);
    }

    localStorage.setItem(
        DAILY_STATS_HISTORY_KEY,
        JSON.stringify(history)
    );
};

export const getStatsHistory = () => {
    const savedHistory = localStorage.getItem(
        DAILY_STATS_HISTORY_KEY
    );

    if (!savedHistory) {
        return [];
    }

    return JSON.parse(savedHistory);
};

export const addReadPage = (pageNumber) => {
    const stats = getDailyStats();

    if (!stats.readPages.includes(pageNumber)) {
        stats.readPages.push(pageNumber);
    }

    saveDailyStats(stats);
};

export const addListeningTime = (seconds) => {
    const stats = getDailyStats();

    stats.listening.totalSeconds += seconds;

    saveDailyStats(stats);
};

export const addCompletedSurah = (surahId) => {
    const stats = getDailyStats();

    if (
        !stats.listening.completedSurahs.includes(
            surahId
        )
    ) {
        stats.listening.completedSurahs.push(surahId);
    }

    saveDailyStats(stats);
};

const getWeekRange = () => {
    const today = new Date();

    const day = today.getDay();

    // السبت = بداية الأسبوع
    const daysSinceSaturday =
        day === 6 ? 0 : day + 1;

    const start = new Date(today);

    start.setDate(
        today.getDate() - daysSinceSaturday
    );

    const end = new Date(start);

    end.setDate(start.getDate() + 6);

    return {
        start,
        end,
    };
};

const formatDate = (date) => {
    return date.toISOString().split("T")[0];
};

export const getWeeklyStats = () => {
    const { start, end } = getWeekRange();

    const startDate = formatDate(start);
    const endDate = formatDate(end);

    const history = getStatsHistory();
    const todayStats = getDailyStats();

    const allStats = [
        ...history,
        todayStats,
    ];

    const weeklyDays = allStats.filter(
        (stats) =>
            stats.date >= startDate &&
            stats.date <= endDate
    );

    const weeklyStats = {
        tasbeeh: 0,

        azkarCompleted: 0,
        azkarTotal: 0,

        readPages: 0,

        listeningSeconds: 0,

        completedSurahs: 0,
    };

    weeklyDays.forEach((day) => {
        // 🧿 التسبيح
        weeklyStats.tasbeeh +=
            day.tasbeeh?.total || 0;

        // 🌅 الأذكار
        weeklyStats.azkarCompleted +=
            day.azkar?.completed || 0;

        weeklyStats.azkarTotal +=
            day.azkar?.total || 0;

        // 📖 القراءة
        weeklyStats.readPages +=
            day.readPages?.length || 0;

        // 🔊 الاستماع
        weeklyStats.listeningSeconds +=
            day.listening?.totalSeconds || 0;

        // 🎧 السور المكتملة
        weeklyStats.completedSurahs +=
            day.listening?.completedSurahs?.length || 0;
    });

    return weeklyStats;
};

export const getMonthlyStats = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth();

    const startDate = new Date(
        year,
        month,
        1
    );

    const endDate = new Date(
        year,
        month + 1,
        0
    );

    const start = formatDate(startDate);
    const end = formatDate(endDate);

    const history = getStatsHistory();
    const todayStats = getDailyStats();

    const allStats = [
        ...history,
        todayStats,
    ];

    const monthlyDays = allStats.filter(
        (stats) =>
            stats.date >= start &&
            stats.date <= end
    );

    const monthlyStats = {
        tasbeeh: 0,

        azkarCompleted: 0,
        azkarTotal: 0,

        readPages: 0,

        listeningSeconds: 0,

        completedSurahs: 0,
    };

    monthlyDays.forEach((day) => {
        // 🧿 التسبيح
        monthlyStats.tasbeeh +=
            day.tasbeeh?.total || 0;

        // 🌅 الأذكار
        monthlyStats.azkarCompleted +=
            day.azkar?.completed || 0;

        monthlyStats.azkarTotal +=
            day.azkar?.total || 0;

        // 📖 القراءة
        monthlyStats.readPages +=
            day.readPages?.length || 0;

        // 🔊 الاستماع
        monthlyStats.listeningSeconds +=
            day.listening?.totalSeconds || 0;

        // 🎧 السور المكتملة
        monthlyStats.completedSurahs +=
            day.listening?.completedSurahs?.length || 0;
    });

    return monthlyStats;
};

export const setDailyTasbeeh = (count) => {
    const stats = getDailyStats();

    stats.tasbeeh = {
        total: count,
    };

    saveDailyStats(stats);
};

export const setDailyAzkar = (
    categoryId,
    completed,
    total
) => {
    const stats = getDailyStats();

    if (!stats.azkar) {
        stats.azkar = {
            categories: {},
            completed: 0,
            total: 0,
        };
    }

    if (!stats.azkar.categories) {
        stats.azkar.categories = {};
    }

    // حفظ إحصائيات القسم
    stats.azkar.categories[categoryId] = {
        completed,
        total,
    };

    // إعادة حساب إجمالي كل الأقسام
    const categories = Object.values(
        stats.azkar.categories
    );

    stats.azkar.completed = categories.reduce(
        (sum, category) =>
            sum + category.completed,
        0
    );

    stats.azkar.total = categories.reduce(
        (sum, category) =>
            sum + category.total,
        0
    );

    saveDailyStats(stats);
};