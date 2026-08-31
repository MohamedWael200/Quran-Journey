const COUNTS_STORAGE_KEY = "tasbeeh-counts";
const TARGETS_STORAGE_KEY = "tasbeeh-targets";


// =========================
// Counts
// =========================

export const getTasbeehCounts = () => {

    const savedCounts =
        localStorage.getItem(
            COUNTS_STORAGE_KEY
        );

    return savedCounts
        ? JSON.parse(savedCounts)
        : {};
};


export const saveTasbeehCounts = (counts) => {

    localStorage.setItem(
        COUNTS_STORAGE_KEY,
        JSON.stringify(counts)
    );

};


// =========================
// Targets
// =========================

export const getTasbeehTargets = () => {

    const savedTargets =
        localStorage.getItem(
            TARGETS_STORAGE_KEY
        );

    return savedTargets
        ? JSON.parse(savedTargets)
        : {};
};


export const saveTasbeehTargets = (targets) => {

    localStorage.setItem(
        TARGETS_STORAGE_KEY,
        JSON.stringify(targets)
    );

};