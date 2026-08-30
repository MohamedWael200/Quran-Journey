import { useEffect, useState } from "react";
import {
    useDispatch,
    useSelector,
} from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    getLastListening,
} from "../../services/lastListeningService";

import {
    fetchReciters,
} from "../../features/reciters/recitersSlice";

function RecitersPage() {
    const [lastListening, setLastListening] =
        useState(null);

    const [
        reciterSearch,
        setReciterSearch,
    ] = useState("");

    const [
        currentReciterPage,
        setCurrentReciterPage,
    ] = useState(1);

    const recitersPerPage = 20;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        reciters,
        loading,
        error,
    } = useSelector(
        (state) => state.reciters
    );

    // =========================
    // تحميل القراء
    // =========================

    useEffect(() => {
        dispatch(fetchReciters());
    }, [dispatch]);

    // =========================
    // تحميل آخر استماع
    // =========================

    useEffect(() => {
        const savedListening =
            getLastListening();

        if (savedListening) {
            setLastListening(savedListening);
        }
    }, []);

    // =========================
    // اختيار قارئ
    // =========================

    const handleSelectReciter = (
        reciterId
    ) => {
        navigate(`/reciters/${reciterId}`);
    };

    // =========================
    // استكمال آخر استماع
    // =========================

    const handleContinueListening = () => {
        if (!lastListening) return;

        navigate(
            `/reciters/${lastListening.reciterId}`,
            {
                state: {
                    continueListening: true,
                    lastListening,
                },
            }
        );
    };

    // =========================
    // بحث القراء
    // =========================

    const filteredReciters =
        reciters.filter((reciter) =>
            reciter.reciter_name
                .toLowerCase()
                .includes(
                    reciterSearch.toLowerCase()
                )
        );

    const totalReciterPages = Math.ceil(
        filteredReciters.length /
        recitersPerPage
    );

    const reciterStartIndex =
        (currentReciterPage - 1) *
        recitersPerPage;

    const currentReciters =
        filteredReciters.slice(
            reciterStartIndex,
            reciterStartIndex +
            recitersPerPage
        );

    const handleReciterSearch = (value) => {
        setReciterSearch(value);

        setCurrentReciterPage(1);
    };

    // =========================
    // Loading
    // =========================

    if (
        loading &&
        reciters.length === 0
    ) {
        return (
            <div className="reciters-loading">
                <div className="loading-headphones">
                    🎧
                </div>

                <h2>
                    جاري تحميل القراء
                </h2>

                <p>
                    يتم تجهيز قائمة التلاوات...
                </p>
            </div>
        );
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return (
        <div className="reciters-page">

            {/* Hero */}

            <section className="reciters-hero">
                <div>
                    <span className="section-label">
                        تلاوات القرآن الكريم
                    </span>

                    <h1>
                        استمع إلى القرآن الكريم 🎧
                    </h1>

                    <p>
                        اختر قارئك المفضل واستمع
                        إلى تلاوات القرآن الكريم
                        في أي وقت.
                    </p>
                </div>

                <div className="reciters-hero-icon">
                    🎧
                </div>
            </section>


            {/* آخر استماع */}

            {lastListening && (
                <section className="last-listening-card">

                    <div className="last-listening-icon">
                        🔊
                    </div>

                    <div className="last-listening-content">

                        <span className="section-label">
                            تابع من حيث توقفت
                        </span>

                        <h2>
                            آخر استماع
                        </h2>

                        <div className="last-listening-info">

                            <span>
                                القارئ:{" "}
                                <strong>
                                    {
                                        lastListening.reciterName
                                    }
                                </strong>
                            </span>

                            <span>
                                السورة:{" "}
                                <strong>
                                    {
                                        lastListening
                                            .surah
                                            .surah_name_ar
                                    }
                                </strong>
                            </span>

                        </div>
                    </div>

                    <button
                        className="continue-listening-btn"
                        onClick={
                            handleContinueListening
                        }
                    >
                        ▶ استكمال الاستماع
                    </button>

                </section>
            )}


            {/* القراء */}

            <section className="reciters-section">

                <div className="reciters-section-header">

                    <div>
                        <span className="section-label">
                            اختر قارئك المفضل
                        </span>

                        <h2>
                            القراء
                        </h2>
                    </div>

                    <span className="reciters-count">
                        {filteredReciters.length} قارئ
                    </span>

                </div>


                {/* Search */}

                <div className="reciter-search">

                    <span>🔍</span>

                    <input
                        type="text"
                        placeholder="ابحث عن قارئ..."
                        value={reciterSearch}
                        onChange={(e) =>
                            handleReciterSearch(
                                e.target.value
                            )
                        }
                    />

                </div>


                {/* Grid */}

                {currentReciters.length === 0 ? (
                    <div className="empty-state">

                        <div>🔎</div>

                        <h3>
                            لا يوجد قارئ بهذا الاسم
                        </h3>

                        <p>
                            جرب البحث باسم آخر
                        </p>

                    </div>
                ) : (
                    <div className="reciters-grid">

                        {currentReciters.map(
                            (reciter) => (
                                <button
                                    key={
                                        reciter.reciter_id
                                    }
                                    className="reciter-card"
                                    onClick={() =>
                                        handleSelectReciter(
                                            reciter.reciter_id
                                        )
                                    }
                                >

                                    <div className="reciter-avatar">
                                        🎙️
                                    </div>

                                    <div className="reciter-info">

                                        <h3>
                                            {
                                                reciter.reciter_name
                                            }
                                        </h3>

                                        <span>
                                            اضغط لعرض التلاوات
                                        </span>

                                    </div>

                                    <span className="reciter-arrow">
                                        ←
                                    </span>

                                </button>
                            )
                        )}

                    </div>
                )}


                {/* Pagination */}

                {totalReciterPages > 1 && (
                    <div className="pagination">

                        <button
                            onClick={() =>
                                setCurrentReciterPage(
                                    (prev) =>
                                        prev - 1
                                )
                            }
                            disabled={
                                currentReciterPage === 1
                            }
                        >
                            السابق →
                        </button>

                        <span>
                            صفحة{" "}
                            <strong>
                                {currentReciterPage}
                            </strong>

                            {" من "}

                            <strong>
                                {totalReciterPages}
                            </strong>
                        </span>

                        <button
                            onClick={() =>
                                setCurrentReciterPage(
                                    (prev) =>
                                        prev + 1
                                )
                            }
                            disabled={
                                currentReciterPage ===
                                totalReciterPages
                            }
                        >
                            ← التالي
                        </button>

                    </div>
                )}

            </section>

        </div>
    );
}

export default RecitersPage;