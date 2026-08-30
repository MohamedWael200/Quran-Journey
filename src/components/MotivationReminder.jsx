import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import motivationMessages from "../data/motivationMessages";

function MotivationReminder() {
    const [isVisible, setIsVisible] =
        useState(false);

    const [message, setMessage] =
        useState(null);

    const location = useLocation();

    const isMushafPage =
        location.pathname.startsWith(
            "/quran/page/"
        );

    useEffect(() => {
        if (isMushafPage) {
            setIsVisible(false);
            return;
        }

        let showTimeout;
        let hideTimeout;

        const scheduleReminder = () => {

            // ننتظر 15 دقيقة
            showTimeout = setTimeout(() => {

                const randomIndex = Math.floor(
                    Math.random() *
                    motivationMessages.length
                );

                setMessage(
                    motivationMessages[randomIndex]
                );

                setIsVisible(true);

                // تفضل ظاهرة 30 ثانية
                hideTimeout = setTimeout(() => {

                    setIsVisible(false);

                    // بعد ما تختفي نبدأ انتظار
                    // 15 دقيقة للرسالة التالية
                    scheduleReminder();

                }, 30000);

            }, 7 * 60 * 1000);
        };

        scheduleReminder();

        return () => {
            clearTimeout(showTimeout);
            clearTimeout(hideTimeout);
        };

    }, [isMushafPage]);


    if (!isVisible || !message) {
        return null;
    }

    return (
        <div className="motivation-reminder">

            <div className="motivation-icon">
                {message.icon}
            </div>

            <div className="motivation-content">
                <span>
                    تذكير بسيط
                </span>

                <p>
                    {message.message}
                </p>
            </div>

            <button
                className="motivation-close"
                onClick={() =>
                    setIsVisible(false)
                }
                aria-label="إغلاق"
            >
                ✕
            </button>

        </div>
    );
}

export default MotivationReminder;