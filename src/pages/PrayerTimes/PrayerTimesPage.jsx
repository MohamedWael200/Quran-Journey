import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPrayerTimes } from "../../features/prayer/prayerSlice";
import LoadingScreen from "../../components/common/LoadingScreen";

function PrayerTimesPage() {
    const dispatch = useDispatch();

    const [currentTime, setCurrentTime] =
        useState(new Date());

    const { data, loading, error } = useSelector(
        (state) => state.prayer
    );

    useEffect(() => {
        if (!data) {
            dispatch(fetchPrayerTimes());
        }
    }, [dispatch, data]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <LoadingScreen
                text="جاري تحميل مواقيت الصلاة..."
            />
        );
    }

    if (error) {
        return (
            <div className="prayer-error">
                <h2>حدث خطأ</h2>
                <p>{error}</p>
            </div>
        );
    }

    if (!data) {
        return null;
    }

    const {
        region,
        country,
        prayer_times,
        date,
    } = data;

    const prayers = [
        {
            name: "الفجر",
            time: prayer_times.Fajr,
        },
        {
            name: "الظهر",
            time: prayer_times.Dhuhr,
        },
        {
            name: "العصر",
            time: prayer_times.Asr,
        },
        {
            name: "المغرب",
            time: prayer_times.Maghrib,
        },
        {
            name: "العشاء",
            time: prayer_times.Isha,
        },
    ];

    const allPrayerTimes = [
        {
            name: "الفجر",
            key: "Fajr",
            time: prayer_times.Fajr,
            icon: "🌅",
        },
        {
            name: "الشروق",
            key: "Sunrise",
            time: prayer_times.Sunrise,
            icon: "☀️",
        },
        {
            name: "الظهر",
            key: "Dhuhr",
            time: prayer_times.Dhuhr,
            icon: "🌤️",
        },
        {
            name: "العصر",
            key: "Asr",
            time: prayer_times.Asr,
            icon: "🌇",
        },
        {
            name: "المغرب",
            key: "Maghrib",
            time: prayer_times.Maghrib,
            icon: "🌅",
        },
        {
            name: "العشاء",
            key: "Isha",
            time: prayer_times.Isha,
            icon: "🌙",
        },
    ];

    const getNextPrayer = () => {
        const now = currentTime;

        for (const prayer of prayers) {
            const [hours, minutes] =
                prayer.time.split(":");

            const prayerTime = new Date();

            prayerTime.setHours(
                Number(hours),
                Number(minutes),
                0,
                0
            );

            if (prayerTime > now) {
                return {
                    ...prayer,
                    prayerTime,
                };
            }
        }

        const [hours, minutes] =
            prayer_times.Fajr.split(":");

        const tomorrowFajr = new Date();

        tomorrowFajr.setDate(
            tomorrowFajr.getDate() + 1
        );

        tomorrowFajr.setHours(
            Number(hours),
            Number(minutes),
            0,
            0
        );

        return {
            name: "الفجر",
            time: prayer_times.Fajr,
            prayerTime: tomorrowFajr,
        };
    };

    const nextPrayer = getNextPrayer();

    const remainingTime = Math.max(
        0,
        nextPrayer.prayerTime - currentTime
    );

    const hours = Math.floor(
        remainingTime / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (remainingTime % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (remainingTime % (1000 * 60)) / 1000
    );

    const formatTime = (value) =>
        String(value).padStart(2, "0");

    return (
        <div className="prayer-times-page">

            {/* Header */}

            <section className="prayer-page-header">

                <div className="prayer-header-icon">
                    🕌
                </div>

                <div className="prayer-header-content">
                    <span className="section-label">
                        عبادتك اليومية
                    </span>

                    <h1>
                        مواقيت الصلاة
                    </h1>

                    <p>
                        تابع مواقيت الصلاة اليوم
                        واعرف موعد الصلاة القادمة.
                    </p>
                </div>

            </section>


            {/* Location & Date */}

            <section className="prayer-info-grid">

                <div className="prayer-info-card">
                    <span className="prayer-info-icon">
                        📍
                    </span>

                    <div>
                        <span>الموقع</span>

                        <strong>
                            {region} - {country}
                        </strong>
                    </div>
                </div>


                <div className="prayer-info-card">
                    <span className="prayer-info-icon">
                        📅
                    </span>

                    <div>
                        <span>التاريخ الميلادي</span>

                        <strong>
                            {date.date_en}
                        </strong>
                    </div>
                </div>


                <div className="prayer-info-card">
                    <span className="prayer-info-icon">
                        🌙
                    </span>

                    <div>
                        <span>التاريخ الهجري</span>

                        <strong>
                            {date.date_hijri.day}{" "}
                            {date.date_hijri.month.ar}{" "}
                            {date.date_hijri.year}
                        </strong>
                    </div>
                </div>

            </section>


            {/* Next Prayer */}

            <section className="next-prayer-card">

                <div className="next-prayer-top">

                    <div>
                        <span className="section-label">
                            الصلاة القادمة
                        </span>

                        <h2>
                            {nextPrayer.name}
                        </h2>
                    </div>

                    <div className="next-prayer-icon">
                        🕌
                    </div>

                </div>


                <div className="next-prayer-details">

                    <div className="next-prayer-time">
                        <span>موعد الصلاة</span>

                        <strong>
                            {nextPrayer.time}
                        </strong>
                    </div>


                    <div className="next-prayer-countdown">
                        <span>
                            الوقت المتبقي
                        </span>

                        <div className="countdown-time">

                            <strong>
                                {formatTime(hours)}
                            </strong>

                            <span>:</span>

                            <strong>
                                {formatTime(minutes)}
                            </strong>

                            <span>:</span>

                            <strong>
                                {formatTime(seconds)}
                            </strong>

                        </div>
                    </div>

                </div>

            </section>


            {/* Prayer Times */}

            <section className="prayer-times-section">

                <div className="prayer-times-header">

                    <div>
                        <span className="section-label">
                            جدول اليوم
                        </span>

                        <h2>
                            مواقيت اليوم
                        </h2>
                    </div>

                    <span className="prayer-times-count">
                        {allPrayerTimes.length} مواقيت
                    </span>

                </div>


                <div className="prayer-times-grid">

                    {allPrayerTimes.map((prayer) => {

                        const isNextPrayer =
                            prayer.name ===
                            nextPrayer.name;

                        return (
                            <div
                                key={prayer.key}
                                className={`prayer-time-card ${
                                    isNextPrayer
                                        ? "next-prayer"
                                        : ""
                                }`}
                            >

                                <div className="prayer-time-main">

                                    <span className="prayer-time-icon">
                                        {prayer.icon}
                                    </span>

                                    <div>
                                        <h3>
                                            {prayer.name}
                                        </h3>

                                        {isNextPrayer && (
                                            <span className="next-prayer-label">
                                                الصلاة القادمة
                                            </span>
                                        )}
                                    </div>

                                </div>


                                <strong className="prayer-time-value">
                                    {prayer.time}
                                </strong>

                            </div>
                        );
                    })}

                </div>

            </section>

        </div>
    );
}

export default PrayerTimesPage;