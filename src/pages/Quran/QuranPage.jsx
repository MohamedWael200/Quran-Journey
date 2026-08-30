import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../components/common/LoadingScreen";

import { fetchSurahs } from "../../features/quran/quranSlice";
import surahStartPages from "../../data/surahStartPages.js";
import { getReadingProgress } from "../../services/readingProgressService";

function QuranPage() {
    const dispatch = useDispatch();

    const lastReadPage = getReadingProgress();

    const {
        surahs,
        surahsLoading,
        surahsError,
    } = useSelector((state) => state.quran);

    useEffect(() => {
        if (surahs.length === 0) {
            dispatch(fetchSurahs());
        }
    }, [dispatch, surahs.length]);

    if (surahsLoading) {
        return (
            <LoadingScreen
                text="جاري تحميل سور القرآن الكريم..."
            />
        );
    }

    if (surahsError) {
        return (
            <div className="quran-error">
                {surahsError}
            </div>
        );
    }

    return (
        <div className="quran-page">
            {/* Continue Reading */}

            <section className="continue-reading-card">
                <div>
                    <span className="section-label">
                        تابع رحلتك
                    </span>

                    <h2>
                        {lastReadPage
                            ? "تابع من حيث توقفت"
                            : "ابدأ رحلتك مع القرآن"}
                    </h2>

                    <p>
                        {lastReadPage
                            ? `آخر صفحة وصلت إليها هي الصفحة ${lastReadPage}`
                            : "ابدأ قراءة القرآن الكريم من الصفحة الأولى"}
                    </p>
                </div>

                <Link
                    to={`/quran/page/${lastReadPage || 1}`}
                    className="continue-reading-btn"
                >
                    {lastReadPage
                        ? "متابعة القراءة ←"
                        : "ابدأ القراءة ←"}
                </Link>
            </section>

            {/* Surahs */}

            <section className="surahs-section">
                <div className="surahs-section-header">
                    <div>
                        <span className="section-label">
                            114 سورة
                        </span>

                        <h2>
                            قائمة السور
                        </h2>
                    </div>

                    <span className="surahs-count">
                        {surahs.length} سورة
                    </span>
                </div>

                <div className="surahs-grid">
                    {surahs.map((surah) => (
                        <Link
                            key={surah.id}
                            to={`/quran/page/${surahStartPages[surah.number]}`}
                            className="surah-card"
                        >
                            <span className="surah-number">
                                {surah.number}
                            </span>

                            <div className="surah-info">
                                <h3>
                                    {surah.name_ar}
                                </h3>
                            </div>

                            <span className="surah-arrow">
                                ←
                            </span>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default QuranPage;