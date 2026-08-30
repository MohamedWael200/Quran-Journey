import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPrayerTimes } from "../../features/prayer/prayerSlice";

function PrayerWidget() {
    const [currentTime, setCurrentTime] = useState(
        new Date()
    );

    const dispatch = useDispatch();

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

    if (loading && !data) {
        return (
            <section>
                <h2>🕌 مواقيت الصلاة</h2>
                <p>جاري تحميل المواقيت...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section>
                <h2>🕌 مواقيت الصلاة</h2>
                <p>{error}</p>
            </section>
        );
    }

    if (!data) {
        return null;
    }

    const { prayer_times, region } = data;

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

    const getNextPrayer = () => {
        const now = new Date();

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

        // لو كل الصلوات خلصت
        // الصلاة القادمة = فجر بكرة
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

    const remainingTime =
        nextPrayer.prayerTime - currentTime;

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

    return (
        <section className="prayer-widget">
            <div className="prayer-widget-header">
                <div>
                <span className="section-label">
                    🕌 مواقيت الصلاة
                </span>

                    <h2>
                        الصلاة القادمة
                    </h2>
                </div>

                <div className="prayer-widget-icon">
                    🕌
                </div>
            </div>

            <div className="next-prayer-card">
                <div className="next-prayer-info">
                    <span>الصلاة القادمة</span>

                    <h3>
                        {nextPrayer.name}
                    </h3>

                    <p>
                        موعد الصلاة:{" "}
                        <strong>
                            {nextPrayer.time}
                        </strong>
                    </p>
                </div>

                <div className="prayer-countdown">
                <span>
                    متبقي على الصلاة
                </span>

                    <strong>
                        {String(Math.max(0, hours)).padStart(2, "0")}
                        :
                        {String(Math.max(0, minutes)).padStart(2, "0")}
                        :
                        {String(Math.max(0, seconds)).padStart(2, "0")}
                    </strong>
                </div>
            </div>

            <div className="prayer-widget-footer">
            <span>
                📍 {region}
            </span>

                <span>
                نسأل الله أن يتقبل منا ومنكم 🤍
            </span>
            </div>
        </section>
    );
}

export default PrayerWidget;