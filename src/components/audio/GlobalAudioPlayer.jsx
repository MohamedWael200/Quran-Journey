import {
    useEffect,
    useRef,
} from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import {
    playSurah,
    setPlaying,
    setCurrentTime,
    setDuration,
    closePlayer,
} from "../../features/audio/audioSlice";

import {
    saveLastListening,
} from "../../services/lastListeningService";

import {
    addListeningTime,
    addCompletedSurah,
} from "../../services/dailyStatsService";


function GlobalAudioPlayer() {

    const dispatch = useDispatch();

    const audioRef = useRef(null);

    const lastTrackedTimeRef =
        useRef(0);


    const {
        selectedSurah,
        audioData,
        isPlaying,
        currentTime,
        duration,
    } = useSelector(
        (state) => state.audio
    );


    // =========================
    // تشغيل سورة جديدة
    // =========================

    useEffect(() => {

        if (
            !selectedSurah ||
            !audioRef.current
        ) {
            return;
        }

        const audioEl =
            audioRef.current;

        const startTime =
            selectedSurah.startTime || 0;


        const handleLoadedMetadata = () => {

            audioEl.currentTime =
                startTime;

            lastTrackedTimeRef.current =
                startTime;

            audioEl.play()
                .catch(() => {});

        };


        audioEl.addEventListener(
            "loadedmetadata",
            handleLoadedMetadata
        );


        audioEl.load();


        return () => {

            audioEl.removeEventListener(
                "loadedmetadata",
                handleLoadedMetadata
            );

        };

    }, [selectedSurah]);


    // =========================
    // Play / Pause
    // =========================

    const handleTogglePlay = () => {

        if (!audioRef.current) return;

        if (audioRef.current.paused) {

            audioRef.current
                .play()
                .catch(() => {});

        } else {

            audioRef.current.pause();

        }

    };


    // =========================
    // Close Player
    // =========================

    const handleClosePlayer = () => {

        if (audioRef.current) {

            audioRef.current.pause();

            audioRef.current.currentTime = 0;
        }

        dispatch(closePlayer());
    };


    // =========================
    // ترتيب السورة
    // =========================

    const currentSurahIndex =
        audioData?.audio_urls.findIndex(
            (surah) =>
                surah.surah_id ===
                selectedSurah?.surah_id
        ) ?? -1;


    // =========================
    // التالي
    // =========================

    const handleNextSurah = () => {

        if (
            !audioData ||
            currentSurahIndex === -1
        ) {
            return;
        }

        const nextSurah =
            audioData.audio_urls[
            currentSurahIndex + 1
                ];

        if (nextSurah) {

            dispatch(
                playSurah({
                    surah: nextSurah,
                    audioData,
                })
            );
        }
    };


    // =========================
    // السابق
    // =========================

    const handlePreviousSurah = () => {

        if (
            !audioData ||
            currentSurahIndex <= 0
        ) {
            return;
        }

        const previousSurah =
            audioData.audio_urls[
            currentSurahIndex - 1
                ];

        dispatch(
            playSurah({
                surah: previousSurah,
                audioData,
            })
        );
    };


    // =========================
    // انتهاء السورة
    // =========================

    const handleAudioEnded = () => {

        if (selectedSurah) {

            addCompletedSurah(
                selectedSurah.surah_id
            );
        }

        const nextSurah =
            audioData?.audio_urls[
            currentSurahIndex + 1
                ];

        if (nextSurah) {

            dispatch(
                playSurah({
                    surah: nextSurah,
                    audioData,
                })
            );

        } else {

            dispatch(
                setPlaying(false)
            );
        }
    };


    // =========================
    // تنسيق الوقت
    // =========================

    const formatTime = (time) => {

        if (
            !time ||
            Number.isNaN(time)
        ) {
            return "00:00";
        }

        const minutes =
            Math.floor(time / 60);

        const seconds =
            Math.floor(time % 60);

        return `${String(minutes).padStart(
            2,
            "0"
        )}:${String(seconds).padStart(
            2,
            "0"
        )}`;
    };


    if (!selectedSurah) {
        return null;
    }


    return (
        <div className="global-audio-player">

            <audio
                ref={audioRef}
                src={selectedSurah.audio_url}
                onEnded={handleAudioEnded}
                onPlay={() =>
                    dispatch(setPlaying(true))
                }
                onPause={() =>
                    dispatch(setPlaying(false))
                }
                onLoadedMetadata={(e) =>
                    dispatch(
                        setDuration(
                            e.target.duration
                        )
                    )
                }
                onTimeUpdate={(e) => {

                    const time =
                        e.target.currentTime;

                    dispatch(
                        setCurrentTime(time)
                    );


                    const listenedSeconds =
                        time -
                        lastTrackedTimeRef.current;

                    if (
                        listenedSeconds > 0
                    ) {

                        addListeningTime(
                            listenedSeconds
                        );

                        lastTrackedTimeRef.current =
                            time;
                    }


                    if (
                        audioData &&
                        selectedSurah
                    ) {

                        saveLastListening({

                            reciterId:
                            audioData.reciter_id,

                            reciterName:
                            audioData.reciter_name,

                            surah:
                            selectedSurah,

                            currentTime:
                            time,

                        });

                    }

                }}
            />


            {/* معلومات السورة */}

            <div className="global-audio-info">

                <div className="global-audio-icon">
                    🎵
                </div>

                <div>
                    <span>
                        الآن يتم تشغيل
                    </span>

                    <h3>
                        {selectedSurah.surah_name_ar}
                    </h3>
                </div>

            </div>


            {/* Controls */}

            <div className="global-audio-controls">

                <button
                    onClick={handlePreviousSurah}
                    disabled={
                        currentSurahIndex <= 0
                    }
                >
                    ⏮
                </button>


                <button
                    className="global-main-play"
                    onClick={handleTogglePlay}
                >
                    {isPlaying ? "⏸" : "▶"}
                </button>


                <button
                    onClick={handleNextSurah}
                    disabled={
                        currentSurahIndex ===
                        audioData.audio_urls.length - 1
                    }
                >
                    ⏭
                </button>

            </div>


            {/* Progress */}

            <div className="global-audio-progress">

                <span>
                    {formatTime(currentTime)}
                </span>

                <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={(e) => {

                        const newTime =
                            Number(e.target.value);

                        if (audioRef.current) {

                            audioRef.current.currentTime =
                                newTime;
                        }

                        dispatch(
                            setCurrentTime(
                                newTime
                            )
                        );

                        lastTrackedTimeRef.current =
                            newTime;

                    }}
                />

                <span>
                    {formatTime(duration)}
                </span>

            </div>


            {/* Close */}

            <button
                className="global-audio-close"
                onClick={handleClosePlayer}
                aria-label="إغلاق المشغل"
            >
                ✕
            </button>

        </div>
    );
}

export default GlobalAudioPlayer;