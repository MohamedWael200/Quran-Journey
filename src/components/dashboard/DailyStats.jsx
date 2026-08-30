import { useEffect, useState } from "react";

import {
    getDailyStats,
} from "../../services/dailyStatsService";

import {
    getReadingProgress,
} from "../../services/readingProgressService";

import {
    getLastListening,
} from "../../services/lastListeningService";

function DailyStats() {
    const [stats, setStats] = useState(null);

    const [lastPage, setLastPage] =
        useState(null);

    const [lastListening, setLastListening] =
        useState(null);

    useEffect(() => {
        const dailyStats =
            getDailyStats();

        const readingProgress =
            getReadingProgress();

        const savedListening =
            getLastListening();

        setStats(dailyStats);

        setLastPage(readingProgress);

        setLastListening(savedListening);
    }, []);

    if (!stats) {
        return null;
    }

    const tasbeeh =
        stats.tasbeeh?.total || 0;

    const azkarCompleted =
        stats.azkar?.completed || 0;

    const azkarTotal =
        stats.azkar?.total || 0;

    const readPages =
        stats.readPages?.length || 0;

    const azkarProgress =
        azkarTotal > 0
            ? Math.round(
                (azkarCompleted / azkarTotal) * 100
            )
            : 0;

    return (
        <section className="daily-stats-section">
            <div className="daily-stats-header">
                <div>
                    <span className="section-label">
                        تقدمك اليوم
                    </span>

                    <h2>
                        إنجازاتك اليومية ✨
                    </h2>
                </div>

                <span className="daily-stats-date">
                    اليوم
                </span>
            </div>

            <div className="daily-stats-grid">

                {/* التسبيح */}
                <div className="daily-stat-item">
                    <div className="daily-stat-icon">
                        🧿
                    </div>

                    <div className="daily-stat-content">
                        <span>
                            التسبيح
                        </span>

                        <strong>
                            {tasbeeh}
                        </strong>

                        <small>
                            تسبيحة اليوم
                        </small>
                    </div>
                </div>

                {/* الأذكار */}
                <div className="daily-stat-item">
                    <div className="daily-stat-icon">
                        🌅
                    </div>

                    <div className="daily-stat-content">
                        <span>
                            الأذكار
                        </span>

                        <strong>
                            {azkarCompleted}
                            <small>
                                {" / "}
                                {azkarTotal}
                            </small>
                        </strong>

                        <div className="daily-progress">
                            <div
                                className="daily-progress-bar"
                                style={{
                                    width: `${azkarProgress}%`,
                                }}
                            />
                        </div>

                        <small>
                            {azkarProgress}% مكتمل
                        </small>
                    </div>
                </div>

                {/* القراءة */}
                <div className="daily-stat-item">
                    <div className="daily-stat-icon">
                        📖
                    </div>

                    <div className="daily-stat-content">
                        <span>
                            القراءة
                        </span>

                        <strong>
                            {readPages}
                        </strong>

                        <small>
                            صفحة مقروءة اليوم
                        </small>

                        {lastPage && (
                            <small className="last-page">
                                آخر صفحة: {lastPage}
                            </small>
                        )}
                    </div>
                </div>

                {/* الاستماع */}
                <div className="daily-stat-item">
                    <div className="daily-stat-icon">
                        🔊
                    </div>

                    <div className="daily-stat-content">
                        <span>
                            آخر استماع
                        </span>

                        {lastListening ? (
                            <>
                                <strong className="listening-name">
                                    {
                                        lastListening.surah
                                            ?.surah_name_ar
                                    }
                                </strong>

                                <small>
                                    {lastListening.reciterName}
                                </small>
                            </>
                        ) : (
                            <small>
                                لم تبدأ الاستماع بعد
                            </small>
                        )}
                    </div>
                </div>

            </div>
        </section>
    );
}

export default DailyStats;