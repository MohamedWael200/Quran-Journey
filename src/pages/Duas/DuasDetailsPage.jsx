import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { fetchDuas } from "../../features/duas/duasSlice";
import duasCategories from "../../data/duasCategories";

function DuasDetailsPage() {
    const { categoryId } = useParams();

    const dispatch = useDispatch();

    const { data, loading, error } = useSelector(
        (state) => state.duas
    );

    const categoryDuas = data[categoryId];

    useEffect(() => {
        if (Object.keys(data).length === 0) {
            dispatch(fetchDuas());
        }
    }, [dispatch, data]);

    if (loading) {
        return (
            <div className="duas-details-loading">
                <div className="duas-details-loading-icon">
                    🤲
                </div>

                <h2>جاري تحميل الأدعية...</h2>

                <p>
                    لحظات ونكون جاهزين 🤍
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="duas-details-error">
                <h2>حدث خطأ</h2>

                <p>{error}</p>
            </div>
        );
    }

    if (!categoryDuas) {
        return (
            <div className="duas-not-found">
                <span>🤲</span>

                <h2>هذا القسم غير موجود</h2>

                <p>
                    ربما تم تغيير الرابط أو أن القسم غير متاح.
                </p>
            </div>
        );
    }

    const categoryName =
        duasCategories[categoryId] || categoryId;

    return (
        <div className="duas-details-page">

            {/* Header */}

            <section className="duas-details-header">
                <div>
                    <span className="section-label">
                        الأدعية
                    </span>

                    <h1>
                        {categoryName}
                    </h1>

                    <p>
                        اقرأ الدعاء بخشوع وطمأنينة
                    </p>
                </div>

                <div className="duas-details-count">
                    <strong>
                        {categoryDuas.length}
                    </strong>

                    <span>
                        دعاء
                    </span>
                </div>
            </section>


            {/* Duas */}

            <section className="duas-details-section">
                <div className="duas-details-section-header">
                    <div>
                        <span className="section-label">
                            جميع الأدعية
                        </span>

                        <h2>
                            أدعية {categoryName}
                        </h2>
                    </div>
                </div>


                <div className="duas-list">
                    {categoryDuas.map((dua, index) => (
                        <article
                            key={dua.id}
                            className="dua-card"
                        >
                            <div className="dua-card-top">
                                <span className="dua-number">
                                    {index + 1}
                                </span>

                                {dua.count && (
                                    <span className="dua-count">
                                        يكرر {dua.count} مرات
                                    </span>
                                )}
                            </div>

                            <p className="dua-text">
                                {dua.text}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

        </div>
    );
}

export default DuasDetailsPage;