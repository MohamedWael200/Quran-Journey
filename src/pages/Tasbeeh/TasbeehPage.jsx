import { useState } from "react";

import tasbeehOptions from "../../data/tasbeehOptions";
import {
    getTasbeehCounts,
    saveTasbeehCounts,
} from "../../services/tasbeehService";
import {
    setDailyTasbeeh,
} from "../../services/dailyStatsService";

function TasbeehPage() {
    const [selectedTasbeeh, setSelectedTasbeeh] = useState(
        tasbeehOptions[0]
    );

    const [counts, setCounts] = useState(getTasbeehCounts());

    const currentCount = counts[selectedTasbeeh] || 0;

    const totalTasbeeh = Object.values(counts).reduce(
        (total, count) => total + count,
        0
    );

    const handleTasbeeh = () => {
        setCounts((prevCounts) => {
            const updatedCounts = {
                ...prevCounts,
                [selectedTasbeeh]:
                    (prevCounts[selectedTasbeeh] || 0) + 1,
            };

            saveTasbeehCounts(updatedCounts);

            const updatedTotal = Object.values(
                updatedCounts
            ).reduce(
                (total, count) => total + count,
                0
            );

            setDailyTasbeeh(updatedTotal);

            return updatedCounts;
        });
    };

    const handleResetAll = () => {
        const resetCounts = {};

        tasbeehOptions.forEach((tasbeeh) => {
            resetCounts[tasbeeh] = 0;
        });

        setCounts(resetCounts);
        saveTasbeehCounts(resetCounts);

        // مهم: نحدث إحصائيات اليوم أيضًا
        setDailyTasbeeh(0);
    };

    const handleReset = () => {
        setCounts((prevCounts) => {
            const updatedCounts = {
                ...prevCounts,
                [selectedTasbeeh]: 0,
            };

            saveTasbeehCounts(updatedCounts);

            const updatedTotal = Object.values(
                updatedCounts
            ).reduce(
                (total, count) => total + count,
                0
            );

            setDailyTasbeeh(updatedTotal);

            return updatedCounts;
        });
    };

    return (
        <div className="tasbeeh-page">

            {/* Header */}

            <section className="tasbeeh-header">
                <div>
                    <span className="section-label">
                        ذكر الله
                    </span>

                    <h1>التسبيح 🧿</h1>

                    <p>
                        اجعل لسانك عامرًا بذكر الله
                    </p>
                </div>

                <div className="tasbeeh-total">
                    <span>إجمالي اليوم</span>

                    <strong>
                        {totalTasbeeh}
                    </strong>

                    <small>تسبيحة</small>
                </div>
            </section>


            {/* Main Counter */}

            <section className="tasbeeh-counter-card">

                <p className="tasbeeh-selected-label">
                    الذكر الحالي
                </p>

                <h2 className="tasbeeh-selected">
                    {selectedTasbeeh}
                </h2>


                <div className="tasbeeh-count">
                    {currentCount}
                </div>

                <p className="tasbeeh-count-label">
                    عدد التسبيحات
                </p>


                <button
                    className="tasbeeh-main-btn"
                    onClick={handleTasbeeh}
                >
                    سبح
                </button>


                <div className="tasbeeh-actions">
                    <button
                        className="tasbeeh-reset-btn"
                        onClick={handleReset}
                    >
                        ↻ إعادة الحالي
                    </button>

                    <button
                        className="tasbeeh-reset-all-btn"
                        onClick={handleResetAll}
                    >
                        ↺ إعادة الكل
                    </button>
                </div>

            </section>


            {/* Options */}

            <section className="tasbeeh-options-section">

                <div className="tasbeeh-options-header">
                    <div>
                        <span className="section-label">
                            اختر الذكر
                        </span>

                        <h2>
                            الأذكار المتاحة
                        </h2>
                    </div>
                </div>


                <div className="tasbeeh-options">
                    {tasbeehOptions.map((tasbeeh) => {
                        const isActive =
                            selectedTasbeeh === tasbeeh;

                        return (
                            <button
                                key={tasbeeh}
                                className={`tasbeeh-option ${
                                    isActive
                                        ? "active"
                                        : ""
                                }`}
                                onClick={() =>
                                    setSelectedTasbeeh(tasbeeh)
                                }
                            >
                                <span>
                                    {tasbeeh}
                                </span>

                                <strong>
                                    {counts[tasbeeh] || 0}
                                </strong>
                            </button>
                        );
                    })}
                </div>

            </section>

        </div>
    );
}

export default TasbeehPage;