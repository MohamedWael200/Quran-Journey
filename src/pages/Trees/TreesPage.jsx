import { useEffect, useState } from "react";

import {
    getTreesData,
} from "../../services/treeProgressService";

function TreesPage() {
    const [treesData, setTreesData] = useState(null);

    const [selectedTree, setSelectedTree] =
        useState(null);

    useEffect(() => {
        const data = getTreesData();

        setTreesData(data);
    }, []);

    const getTreeStage = (points) => {
        if (points >= 100) {
            return {
                icon: "🌲",
                name: "شجرة مكتملة",
                className: "tree-completed",
            };
        }

        if (points >= 75) {
            return {
                icon: "🌳",
                name: "شجرة كبيرة",
                className: "tree-large",
            };
        }

        if (points >= 50) {
            return {
                icon: "🌳",
                name: "شجرة نامية",
                className: "tree-medium",
            };
        }

        if (points >= 25) {
            return {
                icon: "🌿",
                name: "نبتة نامية",
                className: "tree-small",
            };
        }

        return {
            icon: "🌱",
            name: "بذرة جديدة",
            className: "tree-seed",
        };
    };

    const formatDate = (date) => {
        if (!date) return "لم تبدأ بعد";

        return new Intl.DateTimeFormat(
            "ar-EG",
            {
                day: "numeric",
                month: "long",
                year: "numeric",
            }
        ).format(new Date(date));
    };

    if (!treesData) {
        return (
            <div className="trees-loading">
                <div className="trees-loading-icon">
                    🌱
                </div>

                <h2>
                    جاري تجهيز حديقتك...
                </h2>

                <p>
                    كل إنجاز يزرع شيئًا جديدًا 🌿
                </p>
            </div>
        );
    }

    const {
        totalPoints,
        completedTrees,
        pointsPerTree,
        trees,
    } = treesData;

    const currentTree = trees.find(
        (tree) => !tree.isCompleted
    );

    return (
        <div className="trees-page">

            {/* Header */}

            <section className="garden-header">
                <div className="garden-header-content">
                    <span className="garden-badge">
                        🌿 حديقتك الخاصة
                    </span>

                    <h1>
                        حديقة إنجازاتك
                    </h1>

                    <p>
                        كل قراءة، ذكر، تسبيحة واستماع
                        يساعد في نمو حديقتك 🌳
                    </p>
                </div>

                <div className="garden-summary">
                    <div>
                        <span>⭐</span>
                        <strong>{totalPoints}</strong>
                        <small>نقطة</small>
                    </div>

                    <div>
                        <span>🌳</span>
                        <strong>{completedTrees}</strong>
                        <small>شجرة مكتملة</small>
                    </div>
                </div>
            </section>


            {/* Garden Scene */}

            <section className="garden-scene">

                {/* Sky */}

                <div className="garden-sky">
                    <div className="sun">☀️</div>

                    <div className="cloud cloud-one">
                        ☁️
                    </div>

                    <div className="cloud cloud-two">
                        ☁️
                    </div>
                </div>


                {/* Mountains */}

                <div className="mountains">
                    <div className="mountain mountain-one" />
                    <div className="mountain mountain-two" />
                    <div className="mountain mountain-three" />
                </div>


                {/* Garden */}

                <div className="garden-ground">

                    {/* Flowers */}

                    <span className="flower flower-one">
                        🌼
                    </span>

                    <span className="flower flower-two">
                        🌸
                    </span>

                    <span className="flower flower-three">
                        🌻
                    </span>

                    <span className="flower flower-four">
                        🌼
                    </span>


                    {/* Path */}

                    <div className="garden-path">
                        <span>🪨</span>
                        <span>🪨</span>
                        <span>🪨</span>
                        <span>🪨</span>
                    </div>


                    {/* Trees */}

                    <div className="garden-trees">
                        {trees.map((tree, index) => {
                            const stage =
                                getTreeStage(tree.points);

                            const positions = [
                                "tree-position-1",
                                "tree-position-2",
                                "tree-position-3",
                                "tree-position-4",
                                "tree-position-5",
                                "tree-position-6",
                                "tree-position-7",
                                "tree-position-8",
                            ];

                            return (
                                <button
                                    key={tree.id}
                                    className={`
                                        garden-tree
                                        ${stage.className}
                                        ${
                                        positions[
                                        index %
                                        positions.length
                                            ]
                                    }
                                    `}
                                    onClick={() =>
                                        setSelectedTree(tree)
                                    }
                                >
                                    <span className="tree-icon">
                                        {stage.icon}
                                    </span>

                                    <span className="tree-number">
                                        {tree.id}
                                    </span>

                                    {!tree.isCompleted && (
                                        <span className="tree-progress">
                                            {tree.progress}%
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                </div>

            </section>


            {/* Current Tree */}

            {currentTree && (
                <section className="current-tree-card">
                    <div className="current-tree-icon">
                        {
                            getTreeStage(
                                currentTree.points
                            ).icon
                        }
                    </div>

                    <div className="current-tree-content">
                        <span>
                            الشجرة التي تنمو الآن
                        </span>

                        <h2>
                            الشجرة رقم {currentTree.id}
                        </h2>

                        <p>
                            تحتاج{" "}
                            {Math.max(
                                0,
                                pointsPerTree -
                                currentTree.points
                            )}{" "}
                            نقطة لتصبح شجرة مكتملة 🌲
                        </p>

                        <div className="tree-progress-bar">
                            <span
                                style={{
                                    width:
                                        `${currentTree.progress}%`,
                                }}
                            />
                        </div>
                    </div>

                    <strong className="current-tree-percent">
                        {currentTree.progress}%
                    </strong>
                </section>
            )}


            {/* Tree Details */}

            {selectedTree && (
                <section className="tree-details-card">

                    <button
                        className="tree-details-close"
                        onClick={() =>
                            setSelectedTree(null)
                        }
                    >
                        ✕
                    </button>

                    <div className="tree-details-icon">
                        {
                            getTreeStage(
                                selectedTree.points
                            ).icon
                        }
                    </div>

                    <div>
                        <span className="tree-details-label">
                            {
                                getTreeStage(
                                    selectedTree.points
                                ).name
                            }
                        </span>

                        <h2>
                            الشجرة رقم {selectedTree.id}
                        </h2>

                        <p>
                            {selectedTree.points} من{" "}
                            {pointsPerTree} نقطة
                        </p>

                        <div className="tree-progress-bar">
                            <span
                                style={{
                                    width:
                                        `${selectedTree.progress}%`,
                                }}
                            />
                        </div>

                        <div className="tree-details-dates">

                            <div>
                                <small>
                                    تاريخ البداية
                                </small>

                                <strong>
                                    {
                                        formatDate(
                                            selectedTree.plantedAt
                                        )
                                    }
                                </strong>
                            </div>

                            {selectedTree.completedAt && (
                                <div>
                                    <small>
                                        تاريخ الاكتمال
                                    </small>

                                    <strong>
                                        {
                                            formatDate(
                                                selectedTree.completedAt
                                            )
                                        }
                                    </strong>
                                </div>
                            )}

                        </div>
                    </div>

                </section>
            )}

        </div>
    );
}

export default TreesPage;