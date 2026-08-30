import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchAzkar } from "../../features/azkar/azkarSlice";
import azkarCategories from "../../data/azkarCategories.js";
import LoadingScreen from "../../components/common/LoadingScreen";

function AzkarPage() {
    const dispatch = useDispatch();

    const { data, loading, error } = useSelector(
        (state) => state.azkar
    );

    useEffect(() => {
        if (!data || Object.keys(data).length === 0) {
            dispatch(fetchAzkar());
        }
    }, [dispatch, data]);

    if (loading) {
        return (
            <LoadingScreen
                text="جاري تحميل الأذكار..."
            />
        );
    }

    if (error) {
        return (
            <div className="azkar-error">
                <div className="azkar-error-icon">
                    ⚠️
                </div>

                <h2>حدث خطأ</h2>

                <p>{error}</p>

                <button
                    onClick={() => dispatch(fetchAzkar())}
                >
                    إعادة المحاولة
                </button>
            </div>
        );
    }

    const categories = Object.keys(data || {});

    return (
        <div className="azkar-page">

            {/* Hero */}

            <section className="azkar-hero">
                <div className="azkar-hero-icon">
                    🤲
                </div>

                <div>
                    <span className="section-label">
                        وردك اليومي
                    </span>

                    <h1>
                        الأذكار
                    </h1>

                    <p>
                        ابدأ يومك بذكر الله، وحافظ على
                        وردك اليومي من الأذكار.
                    </p>
                </div>
            </section>


            {/* Summary */}

            <section className="azkar-summary">
                <div className="azkar-summary-icon">
                    ✨
                </div>

                <div>
                    <span>
                        الأقسام المتاحة
                    </span>

                    <strong>
                        {categories.length}
                    </strong>
                </div>
            </section>


            {/* Categories */}

            <section className="azkar-section">

                <div className="azkar-section-header">
                    <div>
                        <span className="section-label">
                            اختر القسم
                        </span>

                        <h2>
                            أذكار المسلم
                        </h2>
                    </div>

                    <span className="azkar-count">
                        {categories.length} قسم
                    </span>
                </div>


                {categories.length === 0 ? (

                    <div className="azkar-empty">
                        <div className="azkar-empty-icon">
                            🤲
                        </div>

                        <h2>
                            لا توجد أذكار حاليًا
                        </h2>

                        <p>
                            سيتم إضافة الأذكار قريبًا.
                        </p>
                    </div>

                ) : (

                    <div className="azkar-grid">

                        {categories.map((category) => {

                            const categoryName =
                                azkarCategories[category] ||
                                category;

                            const azkarCount =
                                data[category]?.length || 0;

                            return (
                                <Link
                                    key={category}
                                    to={`/azkar/${category}`}
                                    className="azkar-card"
                                >

                                    <div className="azkar-card-icon">
                                        🤲
                                    </div>

                                    <div className="azkar-card-content">

                                        <span>
                                            أذكار
                                        </span>

                                        <h3>
                                            {categoryName}
                                        </h3>

                                        <p>
                                            {azkarCount} ذكر
                                        </p>

                                    </div>

                                    <span className="azkar-card-arrow">
                                        ←
                                    </span>

                                </Link>
                            );
                        })}

                    </div>

                )}

            </section>

        </div>
    );
}

export default AzkarPage;