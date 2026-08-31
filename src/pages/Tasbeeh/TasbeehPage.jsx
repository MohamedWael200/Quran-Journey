import { useState } from "react";

import tasbeehOptions from "../../data/tasbeehOptions";

import {
    getTasbeehCounts,
    saveTasbeehCounts,
    getTasbeehTargets,
    saveTasbeehTargets,
} from "../../services/tasbeehService";

import {
    setDailyTasbeeh,
} from "../../services/dailyStatsService";


function TasbeehPage() {

    // =========================
    // الذكر الحالي
    // =========================

    const [
        selectedTasbeeh,
        setSelectedTasbeeh,
    ] = useState(
        tasbeehOptions[0]
    );


    // =========================
    // عدد التسبيحات
    // =========================

    const [
        counts,
        setCounts,
    ] = useState(
        getTasbeehCounts()
    );


    // =========================
    // أهداف المستخدم
    // =========================

    const [
        targets,
        setTargets,
    ] = useState(
        getTasbeehTargets()
    );


    // =========================
    // Modal
    // =========================

    const [
        isTargetModalOpen,
        setIsTargetModalOpen,
    ] = useState(false);


    // =========================
    // قيمة الهدف
    // =========================

    const [
        targetInput,
        setTargetInput,
    ] = useState("");


    // =========================
    // رسالة الخطأ
    // =========================

    const [
        targetError,
        setTargetError,
    ] = useState("");


    // =========================
    // الهدف الحالي
    // =========================

    const target =
        targets[selectedTasbeeh.id] ?? null;


    // =========================
    // العدد الحالي
    // =========================

    const currentCount =
        counts[selectedTasbeeh.id] || 0;


    // =========================
    // هل اكتمل الهدف؟
    // =========================

    const isCompleted =
        target !== null &&
        currentCount >= target;


    // =========================
    // إجمالي التسبيح
    // =========================

    const totalTasbeeh =
        Object.values(counts).reduce(
            (total, count) =>
                total + count,
            0
        );


    // =========================
    // التسبيح
    // =========================

    const handleTasbeeh = () => {

        if (isCompleted) {
            return;
        }


        setCounts((prevCounts) => {

            const current =
                prevCounts[
                    selectedTasbeeh.id
                    ] || 0;


            const updatedCount =
                current + 1;


            const finalCount =
                target !== null
                    ? Math.min(
                        updatedCount,
                        target
                    )
                    : updatedCount;


            const updatedCounts = {
                ...prevCounts,

                [selectedTasbeeh.id]:
                finalCount,
            };


            saveTasbeehCounts(
                updatedCounts
            );


            // =========================
            // تحديث إجمالي اليوم
            // =========================

            const updatedTotal =
                Object.values(
                    updatedCounts
                ).reduce(
                    (total, count) =>
                        total + count,
                    0
                );


            setDailyTasbeeh(
                updatedTotal
            );


            return updatedCounts;

        });

    };


    // =========================
    // فتح Modal تحديد الهدف
    // =========================

    const handleOpenTargetModal = () => {

        const currentTarget =
            targets[selectedTasbeeh.id] ?? "";


        setTargetInput(
            currentTarget.toString()
        );


        setTargetError("");

        setIsTargetModalOpen(true);

    };


    // =========================
    // إغلاق Modal
    // =========================

    const handleCloseTargetModal = () => {

        setIsTargetModalOpen(false);

        setTargetInput("");

        setTargetError("");

    };


    // =========================
    // حفظ الهدف
    // =========================

    const handleSaveTarget = () => {

        const trimmedValue =
            targetInput.trim();


        // =========================
        // إلغاء الهدف
        // =========================

        if (trimmedValue === "") {

            setTargets((prevTargets) => {

                const updatedTargets = {
                    ...prevTargets,
                };


                delete updatedTargets[
                    selectedTasbeeh.id
                    ];


                saveTasbeehTargets(
                    updatedTargets
                );


                return updatedTargets;

            });


            handleCloseTargetModal();

            return;

        }


        // =========================
        // تحويل الرقم
        // =========================

        const newTarget =
            Number(trimmedValue);


        // =========================
        // Validation
        // =========================

        if (
            !Number.isInteger(newTarget) ||
            newTarget <= 0
        ) {

            setTargetError(
                "من فضلك أدخل رقمًا صحيحًا أكبر من صفر."
            );

            return;

        }


        // =========================
        // حفظ الهدف
        // =========================

        setTargets((prevTargets) => {

            const updatedTargets = {
                ...prevTargets,

                [selectedTasbeeh.id]:
                newTarget,
            };


            saveTasbeehTargets(
                updatedTargets
            );


            return updatedTargets;

        });


        handleCloseTargetModal();

    };


    // =========================
    // الضغط على Enter
    // =========================

    const handleTargetKeyDown = (e) => {

        if (e.key === "Enter") {

            handleSaveTarget();

        }

    };


    // =========================
    // إعادة الكل
    // =========================

    const handleResetAll = () => {

        const resetCounts = {};


        tasbeehOptions.forEach(
            (tasbeeh) => {

                resetCounts[
                    tasbeeh.id
                    ] = 0;

            }
        );


        setCounts(
            resetCounts
        );


        saveTasbeehCounts(
            resetCounts
        );


        setDailyTasbeeh(0);

    };


    // =========================
    // إعادة الذكر الحالي
    // =========================

    const handleReset = () => {

        setCounts((prevCounts) => {

            const updatedCounts = {
                ...prevCounts,

                [selectedTasbeeh.id]: 0,
            };


            saveTasbeehCounts(
                updatedCounts
            );


            const updatedTotal =
                Object.values(
                    updatedCounts
                ).reduce(
                    (total, count) =>
                        total + count,
                    0
                );


            setDailyTasbeeh(
                updatedTotal
            );


            return updatedCounts;

        });

    };


    return (

        <div className="tasbeeh-page">


            {/* =========================
                Header
            ========================= */}

            <section className="tasbeeh-header">

                <div>

                    <span className="section-label">
                        ذكر الله
                    </span>

                    <h1>
                        التسبيح 🧿
                    </h1>

                    <p>
                        اجعل لسانك عامرًا بذكر الله
                    </p>

                </div>


                <div className="tasbeeh-total">

                    <span>
                        إجمالي اليوم
                    </span>

                    <strong>
                        {totalTasbeeh}
                    </strong>

                    <small>
                        تسبيحة
                    </small>

                </div>

            </section>


            {/* =========================
                Main Counter
            ========================= */}

            <section
                className={`
                    tasbeeh-counter-card
                    ${
                    isCompleted
                        ? "completed"
                        : ""
                }
                `}
                onClick={handleTasbeeh}
            >


                {/* الذكر الحالي */}

                <p className="tasbeeh-selected-label">

                    الذكر الحالي

                </p>


                <h2 className="tasbeeh-selected">

                    {selectedTasbeeh.text}

                </h2>


                {/* =========================
                    Counter
                ========================= */}

                <div className="tasbeeh-count">

                    {currentCount}

                    {target !== null && (

                        <span>
                            {" / "}
                            {target}
                        </span>

                    )}

                </div>


                {/* =========================
                    Status
                ========================= */}

                {target !== null ? (

                    <p className="tasbeeh-count-label">

                        {isCompleted
                            ? "تم إكمال الهدف 🎉"
                            : `الهدف: ${target} تسبيحة`
                        }

                    </p>

                ) : (

                    <p className="tasbeeh-count-label">

                        بدون حد ♾️

                    </p>

                )}


                {/* =========================
                    Progress
                ========================= */}

                {target !== null && (

                    <div className="tasbeeh-progress">

                        <div
                            className="tasbeeh-progress-bar"
                            style={{
                                width: `${Math.min(
                                    (currentCount /
                                        target) *
                                    100,
                                    100
                                )}%`,
                            }}
                        />

                    </div>

                )}


                {/* =========================
                    Target Button
                ========================= */}

                <button
                    type="button"
                    className={`
                        tasbeeh-target-btn
                        ${
                        target !== null
                            ? "has-target"
                            : ""
                    }
                    `}
                    onClick={(e) => {

                        e.stopPropagation();

                        handleOpenTargetModal();

                    }}
                >

                    <span className="tasbeeh-target-icon">
                        🎯
                    </span>

                    <span>

                        {target !== null
                            ? `الهدف: ${target}`
                            : "تحديد هدف"
                        }

                    </span>

                    <span className="tasbeeh-target-arrow">
                        ✎
                    </span>

                </button>


                {/* =========================
                    Main Button
                ========================= */}

                <button
                    type="button"
                    className="tasbeeh-main-btn"
                    disabled={isCompleted}
                    onClick={(e) => {

                        e.stopPropagation();

                        handleTasbeeh();

                    }}
                >

                    {isCompleted
                        ? "تم الاكتمال ✓"
                        : "سبح"
                    }

                </button>


                {/* =========================
                    Actions
                ========================= */}

                <div className="tasbeeh-actions">

                    <button
                        type="button"
                        className="tasbeeh-reset-btn"
                        onClick={(e) => {

                            e.stopPropagation();

                            handleReset();

                        }}
                    >
                        ↻ إعادة الحالي
                    </button>


                    <button
                        type="button"
                        className="tasbeeh-reset-all-btn"
                        onClick={(e) => {

                            e.stopPropagation();

                            handleResetAll();

                        }}
                    >
                        ↺ إعادة الكل
                    </button>

                </div>

            </section>


            {/* =========================
                Options
            ========================= */}

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

                    {tasbeehOptions.map(
                        (tasbeeh) => {

                            const isActive =
                                selectedTasbeeh.id ===
                                tasbeeh.id;


                            const count =
                                counts[
                                    tasbeeh.id
                                    ] || 0;


                            const tasbeehTarget =
                                targets[
                                    tasbeeh.id
                                    ] ?? null;


                            const completed =
                                tasbeehTarget !== null &&
                                count >=
                                tasbeehTarget;


                            return (

                                <button
                                    type="button"
                                    key={tasbeeh.id}
                                    className={`
                                        tasbeeh-option
                                        ${
                                        isActive
                                            ? "active"
                                            : ""
                                    }
                                    `}
                                    onClick={() =>
                                        setSelectedTasbeeh(
                                            tasbeeh
                                        )
                                    }
                                >

                                    <span>
                                        {tasbeeh.text}
                                    </span>


                                    <strong>

                                        {count}

                                        {tasbeehTarget !==
                                            null && (

                                                <>
                                                    {" / "}
                                                    {
                                                        tasbeehTarget
                                                    }
                                                </>

                                            )}


                                        {completed && (

                                            <small>
                                                ✓
                                            </small>

                                        )}

                                    </strong>

                                </button>

                            );

                        }
                    )}

                </div>

            </section>


            {/* =================================================
                Target Modal
            ================================================= */}

            {isTargetModalOpen && (

                <div
                    className="tasbeeh-modal-overlay"
                    onClick={
                        handleCloseTargetModal
                    }
                >

                    <div
                        className="tasbeeh-target-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >


                        {/* Header */}

                        <div className="tasbeeh-modal-header">

                            <div>

                                <span className="section-label">
                                    تخصيص الهدف
                                </span>

                                <h2>
                                    تحديد عدد التسبيحات
                                </h2>

                            </div>


                            <button
                                type="button"
                                className="tasbeeh-modal-close"
                                onClick={
                                    handleCloseTargetModal
                                }
                                aria-label="إغلاق"
                            >
                                ✕
                            </button>

                        </div>


                        {/* الذكر */}

                        <div className="tasbeeh-modal-dhikr">

                            <span>
                                🧿
                            </span>

                            <div>

                                <small>
                                    الذكر الحالي
                                </small>

                                <strong>
                                    {
                                        selectedTasbeeh.text
                                    }
                                </strong>

                            </div>

                        </div>


                        {/* Input */}

                        <div className="tasbeeh-target-field">

                            <label htmlFor="tasbeeh-target">

                                الهدف

                            </label>


                            <input
                                id="tasbeeh-target"
                                type="number"
                                min="1"
                                step="1"
                                value={
                                    targetInput
                                }
                                onChange={(e) => {

                                    setTargetInput(
                                        e.target.value
                                    );

                                    setTargetError("");

                                }}
                                onKeyDown={
                                    handleTargetKeyDown
                                }
                                placeholder="مثال: 100"
                                autoFocus
                            />


                            <span>
                                تسبيحة
                            </span>

                        </div>


                        {/* Error */}

                        {targetError && (

                            <p className="tasbeeh-target-error">
                                {targetError}
                            </p>

                        )}


                        {/* Hint */}

                        <p className="tasbeeh-target-hint">

                            اترك الحقل فارغًا لإلغاء الهدف
                            وجعل التسبيح بدون حد ♾️

                        </p>


                        {/* Actions */}

                        <div className="tasbeeh-modal-actions">

                            <button
                                type="button"
                                className="tasbeeh-modal-cancel"
                                onClick={
                                    handleCloseTargetModal
                                }
                            >
                                إلغاء
                            </button>


                            <button
                                type="button"
                                className="tasbeeh-modal-save"
                                onClick={
                                    handleSaveTarget
                                }
                            >
                                ✓ حفظ الهدف
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}

export default TasbeehPage;