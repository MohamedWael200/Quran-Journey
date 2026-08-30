import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    fetchReciterAudio,
} from "../../features/reciters/recitersSlice";

import {
    saveLastListening,
} from "../../services/lastListeningService";

import {
    addListeningTime,
    addCompletedSurah,
} from "../../services/dailyStatsService";


function ReciterSurahsPage() {

    const { reciterId } = useParams();

    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useDispatch();

    const audioRef = useRef(null);

    const lastTrackedTimeRef =
        useRef(0);


    const [
        selectedSurah,
        setSelectedSurah,
    ] = useState(null);

    const [
        surahSearch,
        setSurahSearch,
    ] = useState("");

    const [
        isPlaying,
        setIsPlaying,
    ] = useState(false);

    const [
        currentTime,
        setCurrentTime,
    ] = useState(0);

    const [
        duration,
        setDuration,
    ] = useState(0);


    const {
        audioData,
        loading,
        error,
    } = useSelector(
        (state) => state.reciters
    );


    // =========================
    // تحميل سور القارئ
    // =========================

    useEffect(() => {
        dispatch(
            fetchReciterAudio(reciterId)
        );
    }, [
        dispatch,
        reciterId,
    ]);


    // =========================
    // استكمال آخر استماع
    // =========================

    useEffect(() => {

        const shouldContinue =
            location.state?.continueListening;

        const lastListening =
            location.state?.lastListening;

        if (
            !shouldContinue ||
            !lastListening ||
            !audioData
        ) {
            return;
        }

        const savedSurah =
            audioData.audio_urls.find(
                (surah) =>
                    surah.surah_id ===
                    lastListening.surah.surah_id
            );

        if (savedSurah) {

            handlePlaySurah(
                savedSurah,
                lastListening.currentTime || 0
            );

        }

    }, [
        audioData,
    ]);


    // =========================
    // تشغيل سورة
    // =========================

    const handlePlaySurah = (
        surah,
        startTime = 0
    ) => {

        setCurrentTime(startTime);

        setDuration(0);

        lastTrackedTimeRef.current =
            startTime;

        setSelectedSurah({
            ...surah,
            startTime,
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    };


    // =========================
    // تحميل وتشغيل الصوت
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

    }, [
        selectedSurah,
    ]);


    // =========================
    // Play / Pause
    // =========================

    const handleTogglePlay = () => {

        if (!audioRef.current) return;

        if (
            audioRef.current.paused
        ) {

            audioRef.current
                .play()
                .catch(() => {});

        } else {

            audioRef.current.pause();

        }

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
            handlePlaySurah(nextSurah);
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

        if (previousSurah) {
            handlePlaySurah(previousSurah);
        }

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

            handlePlaySurah(nextSurah);

        } else {

            setIsPlaying(false);

        }

    };


    // =========================
    // بحث السور
    // =========================

    const filteredSurahs =
        audioData?.audio_urls.filter(
            (surah) =>
                surah.surah_name_ar.includes(
                    surahSearch
                )
        ) || [];


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

        return `${String(
            minutes
        ).padStart(
            2,
            "0"
        )}:${String(
            seconds
        ).padStart(
            2,
            "0"
        )}`;

    };


    if (loading && !audioData) {

        return (
            <div className="audio-loading">

                <div className="audio-loading-icon">
                    🎧
                </div>

                <h2>
                    جاري تحميل تلاوات القارئ...
                </h2>

            </div>
        );

    }


    if (error) {
        return <h2>{error}</h2>;
    }


    return (
        <div className="reciter-surahs-page">


            {/* Header */}

            <section className="reciter-surahs-header">

                <button
                    className="back-to-reciters"
                    onClick={() =>
                        navigate("/reciters")
                    }
                >
                    → العودة للقراء
                </button>

                <div className="reciter-page-title">

                    <div className="reciter-page-avatar">
                        🎙️
                    </div>

                    <div>

                        <span className="section-label">
                            تلاوات القارئ
                        </span>

                        <h1>
                            {
                                audioData?.reciter_name
                            }
                        </h1>

                        <p>
                            اختر السورة التي تريد
                            الاستماع إليها
                        </p>

                    </div>

                </div>

            </section>


            {/* Search */}

            <div className="reciter-search">

                <span>🔍</span>

                <input
                    type="text"
                    placeholder="ابحث عن سورة..."
                    value={surahSearch}
                    onChange={(e) =>
                        setSurahSearch(
                            e.target.value
                        )
                    }
                />

            </div>


            {/* Surahs */}

            {filteredSurahs.length === 0 ? (

                <div className="empty-state">

                    <div>📖</div>

                    <h3>
                        لا توجد سورة
                    </h3>

                </div>

            ) : (

                <div className="surah-audio-grid">

                    {filteredSurahs.map(
                        (surah, index) => {

                            const isCurrent =
                                selectedSurah?.surah_id ===
                                surah.surah_id;

                            return (
                                <div
                                    key={
                                        surah.surah_id
                                    }
                                    className={`
                                        surah-audio-card
                                        ${
                                        isCurrent
                                            ? "playing"
                                            : ""
                                    }
                                    `}
                                >

                                    <span className="surah-audio-number">

                                        {
                                            surah.surah_id ||
                                            index + 1
                                        }

                                    </span>


                                    <div className="surah-audio-info">

                                        <h3>
                                            {
                                                surah.surah_name_ar
                                            }
                                        </h3>

                                        <span>

                                            {
                                                isCurrent &&
                                                isPlaying
                                                    ? "يتم التشغيل الآن"
                                                    : "اضغط للاستماع"
                                            }

                                        </span>

                                    </div>


                                    <button
                                        className="play-surah-btn"
                                        onClick={() => {

                                            if (
                                                isCurrent
                                            ) {

                                                handleTogglePlay();

                                            } else {

                                                handlePlaySurah(
                                                    surah
                                                );

                                            }

                                        }}
                                    >

                                        {
                                            isCurrent &&
                                            isPlaying
                                                ? "⏸"
                                                : "▶"
                                        }

                                    </button>

                                </div>
                            );

                        }
                    )}

                </div>

            )}


            {/* Player ثابت */}

            {selectedSurah && (

                <div className="audio-player">

                    <div className="audio-player-top">

                        <div className="now-playing-icon">
                            🎵
                        </div>

                        <div>

                            <span>
                                الآن يتم تشغيل
                            </span>

                            <h3>
                                {
                                    selectedSurah
                                        .surah_name_ar
                                }
                            </h3>

                        </div>

                    </div>


                    <audio
                        ref={audioRef}
                        src={
                            selectedSurah.audio_url
                        }
                        onEnded={
                            handleAudioEnded
                        }
                        onPlay={() =>
                            setIsPlaying(true)
                        }
                        onPause={() =>
                            setIsPlaying(false)
                        }
                        onLoadedMetadata={(e) =>
                            setDuration(
                                e.target.duration
                            )
                        }
                        onTimeUpdate={(e) => {

                            const time =
                                e.target.currentTime;

                            setCurrentTime(time);

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


                    {/* Progress */}

                    <div className="audio-progress">

                        <span>
                            {
                                formatTime(
                                    currentTime
                                )
                            }
                        </span>

                        <input
                            type="range"
                            min="0"
                            max={duration || 0}
                            value={currentTime}
                            step="1"
                            onChange={(e) => {

                                const newTime =
                                    Number(
                                        e.target.value
                                    );

                                if (
                                    audioRef.current
                                ) {

                                    audioRef.current.currentTime =
                                        newTime;

                                }

                                setCurrentTime(
                                    newTime
                                );

                            }}
                        />

                        <span>
                            {
                                formatTime(
                                    duration
                                )
                            }
                        </span>

                    </div>


                    {/* Controls */}

                    <div className="audio-controls">

                        <button
                            onClick={
                                handlePreviousSurah
                            }
                            disabled={
                                currentSurahIndex <= 0
                            }
                        >
                            السابق ⏮
                        </button>


                        <button
                            className="main-play-btn"
                            onClick={
                                handleTogglePlay
                            }
                        >
                            {
                                isPlaying
                                    ? "⏸"
                                    : "▶"
                            }
                        </button>


                        <button
                            onClick={
                                handleNextSurah
                            }
                            disabled={
                                currentSurahIndex ===
                                audioData
                                    .audio_urls
                                    .length - 1
                            }
                        >
                            التالي ⏭
                        </button>

                    </div>

                </div>

            )}

        </div>
    );
}

export default ReciterSurahsPage;