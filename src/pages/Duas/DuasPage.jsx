import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchDuas } from "../../features/duas/duasSlice";
import duasCategories from "../../data/duasCategories";

function DuasPage() {
    const dispatch = useDispatch();

    const { data, loading, error } = useSelector(
        (state) => state.duas
    );

    useEffect(() => {
        if (Object.keys(data).length === 0) {
            dispatch(fetchDuas());
        }
    }, [dispatch, data]);

    if (loading) {
        return (
            <div className="duas-loading">
                <div className="duas-loading-icon">
                    🤲
                </div>

                <h2>جاري تحميل الأدعية...</h2>

                <p>
                    لحظات ونبدأ رحلة الدعاء 🤍
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="duas-error">
                <h2>حدث خطأ</h2>
                <p>{error}</p>
            </div>
        );
    }

    const categoriesCount =
        Object.keys(data).length;

    const totalDuas =
        Object.values(data).reduce(
            (total, duas) =>
                total + duas.length,
            0
        );

    return (
        <div className="duas-page">

            {/* Header */}

            <section className="duas-hero">
                <div className="duas-hero-content">
                    <span className="section-label">
                        تواصل مع الله
                    </span>

                    <h1>
                        الأدعية 🤲
                    </h1>

                    <p>
                        اختر الدعاء المناسب لك واجعل الدعاء
                        جزءًا من يومك
                    </p>
                </div>

                <div className="duas-hero-icon">
                    🤲
                </div>
            </section>


            {/* Stats */}

            <section className="duas-stats">
                <div className="duas-stat-card">
                    <span className="duas-stat-icon">
                        📚
                    </span>

                    <div>
                        <strong>
                            {categoriesCount}
                        </strong>

                        <span>
                            قسم
                        </span>
                    </div>
                </div>

                <div className="duas-stat-card">
                    <span className="duas-stat-icon">
                        🤲
                    </span>

                    <div>
                        <strong>
                            {totalDuas}
                        </strong>

                        <span>
                            دعاء
                        </span>
                    </div>
                </div>
            </section>


            {/* Categories */}

            <section className="duas-section">

                <div className="duas-section-header">
                    <div>
                        <span className="section-label">
                            اختر القسم
                        </span>

                        <h2>
                            جميع الأدعية
                        </h2>
                    </div>

                    <span className="duas-categories-count">
                        {categoriesCount} قسم
                    </span>
                </div>


                <div className="duas-grid">
                    {Object.entries(data).map(
                        ([categoryId, duas], index) => (
                            <Link
                                key={categoryId}
                                to={`/duas/${categoryId}`}
                                className="dua-category-card"
                            >
                                <div className="dua-category-number">
                                    {index + 1}
                                </div>

                                <div className="dua-category-content">
                                    <h3>
                                        {
                                            duasCategories[
                                                categoryId
                                                ] || categoryId
                                        }
                                    </h3>

                                    <p>
                                        {duas.length} دعاء
                                    </p>
                                </div>

                                <span className="dua-category-arrow">
                                    ←
                                </span>
                            </Link>
                        )
                    )}
                </div>

            </section>

        </div>
    );
}

export default DuasPage;