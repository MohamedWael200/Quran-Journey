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
        // لو المستخدم في صفحة المصحف
        if (isMushafPage) {
            setIsVisible(false);
            return;
        }

        const showReminder = () => {
            const randomIndex = Math.floor(
                Math.random() *
                motivationMessages.length
            );

            setMessage(
                motivationMessages[randomIndex]
            );

            setIsVisible(true);

            // تختفي بعد 30 ثانية
            setTimeout(() => {
                setIsVisible(false);
            }, 30000);
        };

        // تظهر كل 15 دقيقة
        const interval = setInterval(
            showReminder,
            15 * 60 * 1000

        );

        return () => {
            clearInterval(interval);
        };
    }, [isMushafPage]);

    // لو الرسالة ظاهرة، تختفي تلقائيًا بعد 30 ثانية
    useEffect(() => {
        if (!isVisible) return;

        const timeout = setTimeout(() => {
            setIsVisible(false);
        }, 30000);

        return () => {
            clearTimeout(timeout);
        };
    }, [isVisible]);

    if (!isVisible || !message) {
        return null;
    }

    return (
        <div>
            <span>
                {message.icon}
            </span>

            <p>
                {message.message}
            </p>

            <button
                onClick={() =>
                    setIsVisible(false)
                }
            >
                ✕
            </button>
        </div>
    );
}

export default MotivationReminder;