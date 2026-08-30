import { useEffect, useState } from "react";

import {
    getDailyStats,
    getWeeklyStats,
    getMonthlyStats,
} from "../../services/dailyStatsService";

import WelcomeSection from "../../components/dashboard/WelcomeSection";
import DailyStats from "../../components/dashboard/DailyStats.jsx";
import PrayerWidget from "../../components/dashboard/PrayerWidget.jsx";
import ContinueListening from "../../components/dashboard/ContinueListening.jsx";
import QuickLinks from "../../components/dashboard/QuickLinks.jsx";

function DashboardPage() {
    const [dailyStats, setDailyStats] = useState(null);
    const [weeklyStats, setWeeklyStats] = useState(null);
    const [monthlyStats, setMonthlyStats] = useState(null);

    useEffect(() => {
        setDailyStats(getDailyStats());
        setWeeklyStats(getWeeklyStats());
        setMonthlyStats(getMonthlyStats());
    }, []);

    const formatListeningTime = (seconds) => {
        const totalSeconds = Math.floor(seconds || 0);

        const hours = Math.floor(
            totalSeconds / 3600
        );

        const minutes = Math.floor(
            (totalSeconds % 3600) / 60
        );

        const remainingSeconds =
            totalSeconds % 60;

        if (hours > 0) {
            return `${hours} ساعة ${minutes} دقيقة`;
        }

        if (minutes > 0) {
            return `${minutes} دقيقة ${remainingSeconds} ثانية`;
        }

        return `${remainingSeconds} ثانية`;
    };

    const getProgress = (completed, total) => {
        if (!total || total <= 0) {
            return 0;
        }

        return Math.min(
            Math.round((completed / total) * 100),
            100
        );
    };

    if (!dailyStats || !weeklyStats || !monthlyStats) {
        return <h2>جاري تحميل لوحة التحكم...</h2>;
    }

    const dailyReadPages =
        dailyStats.readPages?.length || 0;

    const dailyListeningSeconds =
        dailyStats.listening?.totalSeconds || 0;

    const dailyCompletedSurahs =
        dailyStats.listening?.completedSurahs?.length || 0;

    const dailyTasbeeh =
        dailyStats.tasbeeh?.total || 0;

    const dailyAzkarCompleted =
        dailyStats.azkar?.completed || 0;

    const dailyAzkarTotal =
        dailyStats.azkar?.total || 0;

    const dailyAzkarProgress = getProgress(
        dailyAzkarCompleted,
        dailyAzkarTotal
    );

    const weeklyAzkarProgress = getProgress(
        weeklyStats.azkarCompleted,
        weeklyStats.azkarTotal
    );

    const monthlyAzkarProgress = getProgress(
        monthlyStats.azkarCompleted,
        monthlyStats.azkarTotal
    );

    return (
        <div className="dashboard-page">
            {/* Header */}
            <section className="dashboard-header">
                <div>
                <span className="dashboard-label">
                    📊 تابع رحلتك
                </span>

                    <h1>لوحة التحكم</h1>

                    <p>
                        هنا تقدر تتابع إنجازاتك اليومية
                        والأسبوعية والشهرية.
                    </p>
                </div>

                <div className="dashboard-header-icon">
                    📈
                </div>
            </section>

            {/* Existing Components */}
            <div className="dashboard-widgets">
                <WelcomeSection />

                <DailyStats />

                <PrayerWidget />

                <ContinueListening />

                <QuickLinks />
            </div>

            {/* Daily Stats */}
            <section className="stats-section">
                <div className="stats-section-header">
                    <div>
                    <span className="section-label">
                        اليوم
                    </span>

                        <h2>
                            إحصائيات اليوم 📊
                        </h2>
                    </div>

                    <span className="stats-period">
                    اليوم
                </span>
                </div>

                <div className="stats-grid">
                    {/* Tasbeeh */}
                    <div className="dashboard-stat-card">
                        <div className="dashboard-stat-top">
                        <span className="dashboard-stat-icon">
                            🧿
                        </span>

                            <span className="dashboard-stat-name">
                            التسبيح
                        </span>
                        </div>

                        <strong>
                            {dailyTasbeeh}
                        </strong>

                        <p>تسبيحة اليوم</p>
                    </div>

                    {/* Azkar */}
                    <div className="dashboard-stat-card">
                        <div className="dashboard-stat-top">
                        <span className="dashboard-stat-icon">
                            🌅
                        </span>

                            <span className="dashboard-stat-name">
                            الأذكار
                        </span>
                        </div>

                        <strong>
                            {dailyAzkarCompleted}
                            <small>
                                {" / "}
                                {dailyAzkarTotal}
                            </small>
                        </strong>

                        <div className="custom-progress">
                            <div
                                className="custom-progress-bar"
                                style={{
                                    width: `${dailyAzkarProgress}%`,
                                }}
                            />
                        </div>

                        <p>
                            {dailyAzkarProgress}% مكتمل
                        </p>
                    </div>

                    {/* Reading */}
                    <div className="dashboard-stat-card">
                        <div className="dashboard-stat-top">
                        <span className="dashboard-stat-icon">
                            📖
                        </span>

                            <span className="dashboard-stat-name">
                            القراءة
                        </span>
                        </div>

                        <strong>
                            {dailyReadPages}
                        </strong>

                        <p>صفحة مقروءة</p>
                    </div>

                    {/* Listening */}
                    <div className="dashboard-stat-card">
                        <div className="dashboard-stat-top">
                        <span className="dashboard-stat-icon">
                            🔊
                        </span>

                            <span className="dashboard-stat-name">
                            الاستماع
                        </span>
                        </div>

                        <strong className="listening-time">
                            {formatListeningTime(
                                dailyListeningSeconds
                            )}
                        </strong>

                        <p>
                            أكملت {dailyCompletedSurahs} سورة
                        </p>
                    </div>
                </div>
            </section>

            {/* Weekly Stats */}
            <section className="stats-section">
                <div className="stats-section-header">
                    <div>
                    <span className="section-label">
                        من السبت إلى الجمعة
                    </span>

                        <h2>
                            إحصائيات الأسبوع 📅
                        </h2>
                    </div>

                    <span className="stats-period">
                    أسبوع
                </span>
                </div>

                <div className="stats-grid">
                    <div className="dashboard-stat-card">
                        <div className="dashboard-stat-top">
                        <span className="dashboard-stat-icon">
                            🧿
                        </span>

                            <span className="dashboard-stat-name">
                            التسبيح
                        </span>
                        </div>

                        <strong>
                            {weeklyStats.tasbeeh || 0}
                        </strong>

                        <p>إجمالي التسبيح</p>
                    </div>

                    <div className="dashboard-stat-card">
                        <div className="dashboard-stat-top">
                        <span className="dashboard-stat-icon">
                            🌅
                        </span>

                            <span className="dashboard-stat-name">
                            الأذكار
                        </span>
                        </div>

                        <strong>
                            {weeklyStats.azkarCompleted || 0}
                            <small>
                                {" / "}
                                {weeklyStats.azkarTotal || 0}
                            </small>
                        </strong>

                        <div className="custom-progress">
                            <div
                                className="custom-progress-bar"
                                style={{
                                    width: `${weeklyAzkarProgress}%`,
                                }}
                            />
                        </div>

                        <p>
                            {weeklyAzkarProgress}% مكتمل
                        </p>
                    </div>

                    <div className="dashboard-stat-card">
                        <div className="dashboard-stat-top">
                        <span className="dashboard-stat-icon">
                            📖
                        </span>

                            <span className="dashboard-stat-name">
                            القراءة
                        </span>
                        </div>

                        <strong>
                            {weeklyStats.readPages || 0}
                        </strong>

                        <p>صفحة مقروءة</p>
                    </div>

                    <div className="dashboard-stat-card">
                        <div className="dashboard-stat-top">
                        <span className="dashboard-stat-icon">
                            🔊
                        </span>

                            <span className="dashboard-stat-name">
                            الاستماع
                        </span>
                        </div>

                        <strong className="listening-time">
                            {formatListeningTime(
                                weeklyStats.listeningSeconds
                            )}
                        </strong>

                        <p>
                            أكملت{" "}
                            {weeklyStats.completedSurahs || 0}
                            {" "}سورة
                        </p>
                    </div>
                </div>
            </section>

            {/* Monthly Stats */}
            <section className="stats-section">
                <div className="stats-section-header">
                    <div>
                    <span className="section-label">
                        الشهر الميلادي الحالي
                    </span>

                        <h2>
                            إحصائيات الشهر 📆
                        </h2>
                    </div>

                    <span className="stats-period">
                    شهر
                </span>
                </div>

                <div className="stats-grid">
                    <div className="dashboard-stat-card">
                        <div className="dashboard-stat-top">
                        <span className="dashboard-stat-icon">
                            🧿
                        </span>

                            <span className="dashboard-stat-name">
                            التسبيح
                        </span>
                        </div>

                        <strong>
                            {monthlyStats.tasbeeh || 0}
                        </strong>

                        <p>إجمالي التسبيح</p>
                    </div>

                    <div className="dashboard-stat-card">
                        <div className="dashboard-stat-top">
                        <span className="dashboard-stat-icon">
                            🌅
                        </span>

                            <span className="dashboard-stat-name">
                            الأذكار
                        </span>
                        </div>

                        <strong>
                            {monthlyStats.azkarCompleted || 0}
                            <small>
                                {" / "}
                                {monthlyStats.azkarTotal || 0}
                            </small>
                        </strong>

                        <div className="custom-progress">
                            <div
                                className="custom-progress-bar"
                                style={{
                                    width: `${monthlyAzkarProgress}%`,
                                }}
                            />
                        </div>

                        <p>
                            {monthlyAzkarProgress}% مكتمل
                        </p>
                    </div>

                    <div className="dashboard-stat-card">
                        <div className="dashboard-stat-top">
                        <span className="dashboard-stat-icon">
                            📖
                        </span>

                            <span className="dashboard-stat-name">
                            القراءة
                        </span>
                        </div>

                        <strong>
                            {monthlyStats.readPages || 0}
                        </strong>

                        <p>صفحة مقروءة</p>
                    </div>

                    <div className="dashboard-stat-card">
                        <div className="dashboard-stat-top">
                        <span className="dashboard-stat-icon">
                            🔊
                        </span>

                            <span className="dashboard-stat-name">
                            الاستماع
                        </span>
                        </div>

                        <strong className="listening-time">
                            {formatListeningTime(
                                monthlyStats.listeningSeconds
                            )}
                        </strong>

                        <p>
                            أكملت{" "}
                            {monthlyStats.completedSurahs || 0}
                            {" "}سورة
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default DashboardPage;