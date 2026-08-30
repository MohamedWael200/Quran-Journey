import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getLastListening } from "../../services/lastListeningService";
import { getReadingProgress } from "../../services/readingProgressService";
import { getDailyStats } from "../../services/dailyStatsService";

function HomePage() {
    const [lastPage, setLastPage] =
        useState(null);

    const [lastListening, setLastListening] =
        useState(null);

    const [dailyStats, setDailyStats] =
        useState(null);

    useEffect(() => {
        const savedPage =
            getReadingProgress();

        const savedListening =
            getLastListening();

        const stats =
            getDailyStats();

        setLastPage(savedPage);
        setLastListening(savedListening);
        setDailyStats(stats);
    }, []);

    const tasbeehCount =
        dailyStats?.tasbeeh?.total || 0;

    const azkarCompleted =
        dailyStats?.azkar?.completed || 0;

    const azkarTotal =
        dailyStats?.azkar?.total || 0;

    const readPagesCount =
        dailyStats?.readPages?.length || 0;

    const listeningSeconds =
        dailyStats?.listening?.totalSeconds || 0;

    const formatListeningTime = (seconds) => {
        const totalSeconds =
            Math.floor(seconds);

        const minutes = Math.floor(
            totalSeconds / 60
        );

        const remainingSeconds =
            totalSeconds % 60;

        if (minutes > 0) {
            return `${minutes} دقيقة`;
        }

        return `${remainingSeconds} ثانية`;
    };

    return (
        <div className="home-page">
            {/* Hero */}
            <section className="home-hero">
                <div className="home-hero-content">
                <span className="home-badge">
                    ✨ رفيقك اليومي مع القرآن
                </span>

                    <h1>
                        رحلتك اليومية مع
                        <span> القرآن الكريم</span>
                    </h1>

                    <p>
                        اقرأ، استمع، اذكر الله، وتابع
                        إنجازاتك اليومية في مكان واحد.
                    </p>

                    <div className="home-hero-actions">
                        <Link
                            to="/quran"
                            className="btn btn-primary"
                        >
                            📖 ابدأ القراءة
                        </Link>

                        <Link
                            to="/dashboard"
                            className="btn btn-secondary"
                        >
                            📊 إنجازاتي
                        </Link>
                    </div>
                </div>

                <div className="home-hero-icon">
                    <span>📖</span>
                </div>
            </section>

            {/* Quick Actions */}
            <section className="home-section">
                <div className="section-heading">
                    <div>
                    <span className="section-label">
                        ابدأ الآن
                    </span>

                        <h2>رحلتك مع القرآن</h2>
                    </div>
                </div>

                <div className="quick-actions-grid">
                    <Link
                        to="/quran"
                        className="quick-action-card"
                    >
                    <span className="quick-action-icon">
                        📖
                    </span>

                        <div>
                            <h3>قراءة القرآن</h3>
                            <p>
                                تابع رحلتك مع كتاب الله
                            </p>
                        </div>

                        <span className="quick-action-arrow">
                        ←
                    </span>
                    </Link>

                    <Link
                        to="/reciters"
                        className="quick-action-card"
                    >
                    <span className="quick-action-icon">
                        🔊
                    </span>

                        <div>
                            <h3>استمع للقرآن</h3>
                            <p>
                                اختر قارئك المفضل
                            </p>
                        </div>

                        <span className="quick-action-arrow">
                        ←
                    </span>
                    </Link>

                    <Link
                        to="/azkar"
                        className="quick-action-card"
                    >
                    <span className="quick-action-icon">
                        🌅
                    </span>

                        <div>
                            <h3>الأذكار</h3>
                            <p>
                                حافظ على أذكارك اليومية
                            </p>
                        </div>

                        <span className="quick-action-arrow">
                        ←
                    </span>
                    </Link>

                    <Link
                        to="/tasbeeh"
                        className="quick-action-card"
                    >
                    <span className="quick-action-icon">
                        🧿
                    </span>

                        <div>
                            <h3>التسبيح</h3>
                            <p>
                                سبح واذكر الله
                            </p>
                        </div>

                        <span className="quick-action-arrow">
                        ←
                    </span>
                    </Link>
                </div>
            </section>

            {/* Continue */}
            {(lastPage || lastListening) && (
                <section className="home-section">
                    <div className="section-heading">
                        <div>
                        <span className="section-label">
                            تابع من حيث توقفت
                        </span>

                            <h2>استكمل رحلتك</h2>
                        </div>
                    </div>

                    <div className="continue-grid">
                        {lastPage && (
                            <div className="continue-card card">
                                <div className="continue-card-top">
                                <span className="continue-icon">
                                    📖
                                </span>

                                    <span className="continue-type">
                                    آخر قراءة
                                </span>
                                </div>

                                <h3>
                                    تابع قراءة القرآن
                                </h3>

                                <p>
                                    آخر صفحة وصلت إليها
                                </p>

                                <strong>
                                    الصفحة {lastPage}
                                </strong>

                                <Link
                                    to={`/quran/page/${lastPage}`}
                                    className="btn btn-primary"
                                >
                                    متابعة القراءة
                                </Link>
                            </div>
                        )}

                        {lastListening && (
                            <div className="continue-card card">
                                <div className="continue-card-top">
                                <span className="continue-icon">
                                    🔊
                                </span>

                                    <span className="continue-type">
                                    آخر استماع
                                </span>
                                </div>

                                <h3>
                                    استكمل الاستماع
                                </h3>

                                <p>
                                    {lastListening.reciterName}
                                </p>

                                <strong>
                                    {
                                        lastListening.surah
                                            ?.surah_name_ar
                                    }
                                </strong>

                                <Link
                                    to="/reciters"
                                    className="btn btn-secondary"
                                >
                                    استكمال الاستماع
                                </Link>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Daily Stats */}
            <section className="home-section">
                <div className="section-heading">
                    <div>
                    <span className="section-label">
                        اليوم
                    </span>

                        <h2>إنجازاتك اليوم ✨</h2>
                    </div>

                    <Link
                        to="/dashboard"
                        className="section-link"
                    >
                        عرض التفاصيل ←
                    </Link>
                </div>

                <div className="home-stats-grid">
                    <div className="home-stat-card card">
                    <span className="stat-icon">
                        🧿
                    </span>

                        <div>
                            <strong>
                                {tasbeehCount}
                            </strong>

                            <p>تسبيحة</p>
                        </div>
                    </div>

                    <div className="home-stat-card card">
                    <span className="stat-icon">
                        🌅
                    </span>

                        <div>
                            <strong>
                                {azkarCompleted}
                                <small>
                                    / {azkarTotal}
                                </small>
                            </strong>

                            <p>ذكر مكتمل</p>
                        </div>
                    </div>

                    <div className="home-stat-card card">
                    <span className="stat-icon">
                        📖
                    </span>

                        <div>
                            <strong>
                                {readPagesCount}
                            </strong>

                            <p>صفحة مقروءة</p>
                        </div>
                    </div>

                    <div className="home-stat-card card">
                    <span className="stat-icon">
                        🔊
                    </span>

                        <div>
                            <strong>
                                {formatListeningTime(
                                    listeningSeconds
                                )}
                            </strong>

                            <p>وقت الاستماع</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dashboard CTA */}
            <section className="home-dashboard-cta">
                <div>
                    <span>📊</span>

                    <div>
                        <h2>
                            تابع تقدمك باستمرار
                        </h2>

                        <p>
                            شاهد إحصائياتك اليومية
                            والأسبوعية والشهرية
                        </p>
                    </div>
                </div>

                <Link
                    to="/dashboard"
                    className="btn btn-primary"
                >
                    لوحة التحكم
                </Link>
            </section>
        </div>
    );
}

export default HomePage;