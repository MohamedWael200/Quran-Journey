import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAzkar } from "../../features/azkar/azkarSlice";
import azkarCategories from "../../data/azkarCategories";
import {
    getAzkarProgress,
    saveAzkarProgress,
} from "../../services/azkarProgressService";
import {setDailyAzkar} from "../../services/dailyStatsService.js";
import LoadingScreen from "../../components/common/LoadingScreen.jsx";


function AzkarDetailsPage() {
    const { categoryId } = useParams();

    const dispatch = useDispatch();

    const [remainingCounts, setRemainingCounts] = useState({});

    const { data, loading, error } = useSelector(
        (state) => state.azkar
    );

    const categoryAzkar = data[categoryId];

    const updateDailyAzkarStats = (counts) => {
        const total = categoryAzkar.reduce(
            (sum, zekr) =>
                sum + Number(zekr.count),
            0
        );

        const remaining = Object.values(counts).reduce(
            (sum, count) =>
                sum + Number(count),
            0
        );

        const completed = total - remaining;

        setDailyAzkar(
            categoryId,
            completed,
            total
        );
    };


    useEffect(() => {
        if (Object.keys(data).length === 0) {
            dispatch(fetchAzkar());
        }
    }, [dispatch, data , loading]);

    useEffect(() => {
        if (!categoryAzkar) return;

        const savedCounts =
            getAzkarProgress(categoryId);

        if (savedCounts) {
            setRemainingCounts(savedCounts);

            updateDailyAzkarStats(savedCounts);

            return;
        }

        const counts = {};

        categoryAzkar.forEach((zekr) => {
            counts[zekr.id] =
                Number(zekr.count);
        });

        setRemainingCounts(counts);

        updateDailyAzkarStats(counts);
    }, [categoryAzkar, categoryId]);


    const handleCount = (zekrId) => {
        setRemainingCounts((prevCounts) => {
            const currentCount = prevCounts[zekrId];

            if (currentCount <= 0) {
                return prevCounts;
            }

            const updatedCounts = {
                ...prevCounts,
                [zekrId]: currentCount - 1,
            };

            saveAzkarProgress(
                categoryId,
                updatedCounts
            );

            updateDailyAzkarStats(
                updatedCounts
            );

            return updatedCounts;
        });
    };

    const handleReset = (zekr) => {
        setRemainingCounts((prevCounts) => {
            const updatedCounts = {
                ...prevCounts,
                [zekr.id]: Number(zekr.count),
            };

            saveAzkarProgress(
                categoryId,
                updatedCounts
            );

            updateDailyAzkarStats(
                updatedCounts
            );

            return updatedCounts;
        });
    };

    const handleResetAll = () => {
        const counts = {};

        categoryAzkar.forEach((zekr) => {
            counts[zekr.id] = Number(zekr.count);
        });

        setRemainingCounts(counts);

        saveAzkarProgress(
            categoryId,
            counts
        );

        updateDailyAzkarStats(counts);
    };


    if (loading) {
        return (
            <LoadingScreen
                text="جاري تحميل الأذكار..."
            />
        );
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    if (!categoryAzkar) {
        return <h2>هذا القسم غير موجود</h2>;
    }

    return (
        <div className="azkar-details-page">
            {/* Header */}

            <section className="azkar-details-header">
                <div>
                <span className="section-label">
                    رحلتك اليومية
                </span>

                    <h1>
                        {azkarCategories[categoryId] || categoryId}
                    </h1>

                    <p>
                        استمر في الذكر واضغط على الزر بعد كل مرة
                        ✨
                    </p>
                </div>

                <button
                    className="reset-all-btn"
                    onClick={handleResetAll}
                >
                    ↻ إعادة الكل
                </button>
            </section>


            {/* Azkar */}

            <div className="azkar-list">
                {categoryAzkar.map((zekr, index) => {
                    const remaining =
                        remainingCounts[zekr.id];

                    const total =
                        Number(zekr.count);

                    const completed =
                        total - (remaining ?? total);

                    const isCompleted =
                        remaining === 0;

                    const progress =
                        total > 0
                            ? Math.round(
                                (completed / total) * 100
                            )
                            : 0;

                    return (
                        <article
                            key={zekr.id}
                            className={`zekr-card ${
                                isCompleted
                                    ? "completed"
                                    : ""
                            }`}
                        >
                            {/* Number */}

                            <div className="zekr-number">
                                {index + 1}
                            </div>


                            {/* Content */}

                            <div className="zekr-content">
                                <p className="zekr-text">
                                    {zekr.text}
                                </p>

                                <div className="zekr-meta">
                                <span>
                                    المطلوب: {total}
                                </span>

                                    <span>
                                    المتبقي: {remaining ?? total}
                                </span>
                                </div>

                                <div className="zekr-progress-wrapper">
                                    <div
                                        className="zekr-progress"
                                        style={{
                                            width: `${progress}%`,
                                        }}
                                    />
                                </div>
                            </div>


                            {/* Actions */}

                            <div className="zekr-actions">
                                <button
                                    className={`zekr-count-btn ${
                                        isCompleted
                                            ? "done"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        handleCount(zekr.id)
                                    }
                                    disabled={isCompleted}
                                >
                                    {isCompleted
                                        ? "✓ تم"
                                        : `سبّح (${remaining ?? total})`}
                                </button>

                                <button
                                    className="zekr-reset-btn"
                                    onClick={() =>
                                        handleReset(zekr)
                                    }
                                    title="إعادة الذكر"
                                >
                                    ↻
                                </button>
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}

export default AzkarDetailsPage;