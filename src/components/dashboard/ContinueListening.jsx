import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getLastListening } from "../../services/lastListeningService";

function ContinueListening() {
    const [lastListening, setLastListening] =
        useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const savedListening =
            getLastListening();

        setLastListening(savedListening);
    }, []);

    if (!lastListening) {
        return null;
    }

    const handleContinue = () => {
        navigate("/reciters");
    };

    const formatTime = (seconds) => {
        const totalSeconds =
            Math.floor(seconds || 0);

        const minutes = Math.floor(
            totalSeconds / 60
        );

        const remainingSeconds =
            totalSeconds % 60;

        return `${String(minutes).padStart(
            2,
            "0"
        )}:${String(remainingSeconds).padStart(
            2,
            "0"
        )}`;
    };

    return (
        <section className="continue-listening">
            <div className="continue-listening-content">
                <div className="continue-listening-icon">
                    🔊
                </div>

                <div className="continue-listening-info">
                    <span className="section-label">
                        استمع من حيث توقفت
                    </span>

                    <h2>
                        تابع الاستماع
                    </h2>

                    <div className="listening-details">
                        <div>
                            <span>القارئ</span>

                            <strong>
                                {lastListening.reciterName}
                            </strong>
                        </div>

                        <div>
                            <span>السورة</span>

                            <strong>
                                {
                                    lastListening.surah
                                        ?.surah_name_ar
                                }
                            </strong>
                        </div>

                        <div>
                            <span>توقفت عند</span>

                            <strong>
                                ⏱️{" "}
                                {formatTime(
                                    lastListening.currentTime
                                )}
                            </strong>
                        </div>
                    </div>
                </div>
            </div>

            <button
                className="continue-listening-button"
                onClick={handleContinue}
            >
                استكمال الاستماع ←
            </button>
        </section>
    );
}

export default ContinueListening;