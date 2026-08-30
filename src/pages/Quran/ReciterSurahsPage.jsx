import {
    useEffect,
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
    playSurah,
} from "../../features/audio/audioSlice";


function ReciterSurahsPage() {

    const { reciterId } = useParams();

    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useDispatch();


    const [
        surahSearch,
        setSurahSearch,
    ] = useState("");


    // =========================
    // بيانات القارئ
    // =========================

    const {
        audioData,
        loading,
        error,
    } = useSelector(
        (state) => state.reciters
    );


    // =========================
    // بيانات المشغل العالمي
    // =========================

    const {
        selectedSurah,
        isPlaying,
    } = useSelector(
        (state) => state.audio
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
    // تشغيل سورة
    // =========================

    const handlePlaySurah = (
        surah,
        startTime = 0
    ) => {

        if (!audioData) {
            return;
        }

        dispatch(
            playSurah({
                surah,
                audioData,
                startTime,
            })
        );

    };


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
    // Loading
    // =========================

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


    // =========================
    // Error
    // =========================

    if (error) {

        return (
            <h2>
                {error}
            </h2>
        );

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
                            {audioData?.reciter_name}
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

                <span>
                    🔍
                </span>

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

                    <div>
                        📖
                    </div>

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
                                                    : isCurrent
                                                        ? "متوقفة مؤقتًا"
                                                        : "اضغط للاستماع"
                                            }

                                        </span>

                                    </div>


                                    <button
                                        className="play-surah-btn"
                                        onClick={() =>
                                            handlePlaySurah(
                                                surah
                                            )
                                        }
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

        </div>

    );

}

export default ReciterSurahsPage;