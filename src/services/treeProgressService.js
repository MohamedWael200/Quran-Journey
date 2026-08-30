import {
    getDailyStats,
    getStatsHistory,
} from "./dailyStatsService";

const POINTS_PER_TREE = 100;


const getAllStats = () => {
    const history = getStatsHistory();
    const todayStats = getDailyStats();

    const allStats = [
        ...history,
        todayStats,
    ];

    const uniqueStats = [];

    allStats.forEach((stats) => {
        const exists = uniqueStats.some(
            (item) => item.date === stats.date
        );

        if (!exists) {
            uniqueStats.push(stats);
        }
    });

    return uniqueStats.sort(
        (a, b) =>
            new Date(a.date) -
            new Date(b.date)
    );
};


const calculatePoints = (stats) => {
    const readPages =
        stats.readPages?.length || 0;

    const tasbeeh =
        stats.tasbeeh?.total || 0;

    const azkar =
        stats.azkar?.completed || 0;

    const listeningSeconds =
        stats.listening?.totalSeconds || 0;

    const completedSurahs =
        stats.listening?.completedSurahs?.length || 0;

    const listeningMinutes =
        listeningSeconds / 60;

    const points =
        // كل صفحة = نقطتين
        readPages * 2 +

        // كل 10 تسبيحات = نقطة
        tasbeeh / 10 +

        // كل 10 أذكار = نقطة
        azkar / 10 +

        // كل 5 دقائق استماع = نقطتين
        (listeningMinutes / 5) * 2 +

        // كل سورة مكتملة = 5 نقاط
        completedSurahs * 5;

    return Math.floor(points);
};


export const getTreeProgress = () => {
    const allStats = getAllStats();

    const totalPoints = allStats.reduce(
        (total, stats) => {
            return total + calculatePoints(stats);
        },
        0
    );

    return totalPoints;
};


export const getTreesData = () => {
    const allStats = getAllStats();

    const trees = [];

    let treeNumber = 1;


    allStats.forEach((day) => {
        let dayPoints =
            calculatePoints(day);

        // لو اليوم مفيهوش أي إنجاز
        // مش هنزرع شجرة
        if (dayPoints <= 0) {
            return;
        }


        // كل يوم يبدأ شجرة جديدة
        while (dayPoints > 0) {
            const treePoints = Math.min(
                dayPoints,
                POINTS_PER_TREE
            );

            const isCompleted =
                treePoints >= POINTS_PER_TREE;

            trees.push({
                id: treeNumber,

                points: treePoints,

                progress: Math.round(
                    (treePoints /
                        POINTS_PER_TREE) *
                    100
                ),

                isCompleted,

                // الشجرة تخص اليوم ده
                plantedAt: day.date,

                completedAt: isCompleted
                    ? day.date
                    : null,
            });

            treeNumber++;

            dayPoints -= treePoints;
        }
    });


    // لو مفيش أي إنجازات لحد دلوقتي
    // نعرض مكان للشجرة الأولى
    if (trees.length === 0) {
        trees.push({
            id: 1,

            points: 0,

            progress: 0,

            isCompleted: false,

            plantedAt: null,

            completedAt: null,
        });
    }


    const totalPoints = trees.reduce(
        (total, tree) =>
            total + tree.points,
        0
    );


    const completedTrees = trees.filter(
        (tree) => tree.isCompleted
    ).length;


    // الشجرة الحالية هي شجرة اليوم
    const currentTree =
        trees[trees.length - 1];


    return {
        totalPoints,

        completedTrees,

        currentTreePoints:
            currentTree?.points || 0,

        pointsPerTree:
        POINTS_PER_TREE,

        trees,
    };
};