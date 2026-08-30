import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LoadingScreen from "../../components/common/LoadingScreen";

import { fetchQuranPage } from "../../features/quran/quranSlice";

import {
    saveReadingProgress,
} from "../../services/readingProgressService";

import {
    addBookmark,
    getBookmarks,
    removeBookmark,
} from "../../services/bookmarkService";

import {
    addReadPage,
} from "../../services/dailyStatsService";

function MushafPage() {
    const { pageNumber } = useParams();

    const [isBookmarked, setIsBookmarked] =
        useState(false);

    const dispatch = useDispatch();

    const {
        currentPage,
        currentPageLoading,
        currentPageError,
    } = useSelector((state) => state.quran);

    const currentPageNumber =
        Number(pageNumber);

    useEffect(() => {
        dispatch(
            fetchQuranPage(pageNumber)
        );
    }, [dispatch, pageNumber]);


    // حفظ تقدم القراءة
    useEffect(() => {
        saveReadingProgress(pageNumber);

        addReadPage(
            Number(pageNumber)
        );
    }, [pageNumber]);


    // حالة الـ Bookmark
    useEffect(() => {
        const bookmarks =
            getBookmarks();

        const isSaved =
            bookmarks.some(
                (bookmark) =>
                    bookmark.pageNumber ===
                    Number(pageNumber)
            );

        setIsBookmarked(isSaved);
    }, [pageNumber]);


    const handleBookmark = () => {
        if (isBookmarked) {
            removeBookmark(
                currentPageNumber
            );

            setIsBookmarked(false);

            return;
        }

        addBookmark({
            pageNumber: currentPageNumber,
        });

        setIsBookmarked(true);
    };


    if (currentPageLoading) {
        return (
            <LoadingScreen
                text="جاري فتح صفحة المصحف..."
            />
        );
    }


    if (currentPageError) {
        return (
            <div className="mushaf-error">
                <h2>
                    حدث خطأ أثناء تحميل الصفحة
                </h2>

                <p>
                    {currentPageError}
                </p>
            </div>
        );
    }


    if (!currentPage) {
        return null;
    }


    // السور الموجودة في الصفحة
    const pageSurahs = [];

    currentPage.ayahs.forEach((ayah) => {
        const exists =
            pageSurahs.find(
                (surah) =>
                    surah.number ===
                    ayah.surah.number
            );

        if (!exists) {
            pageSurahs.push(
                ayah.surah
            );
        }
    });


    return (
        <div className="mushaf-reader">

            {/* Header */}

            <div className="mushaf-toolbar">

                <div>
                    <span className="mushaf-page-label">
                        القرآن الكريم
                    </span>

                    <h2>
                        صفحة {currentPage.number}
                    </h2>
                </div>


                <button
                    onClick={handleBookmark}
                    className={`bookmark-btn ${
                        isBookmarked
                            ? "saved"
                            : ""
                    }`}
                >
                    {isBookmarked
                        ? "🔖 محفوظة"
                        : "🔖 حفظ الصفحة"}
                </button>

            </div>


            {/* Mushaf */}

            <div className="mushaf-paper">

                <div className="mushaf-frame">

                    {/* الزخارف */}

                    <span className="mushaf-corner top-right">
                        ❁
                    </span>

                    <span className="mushaf-corner top-left">
                        ❁
                    </span>

                    <span className="mushaf-corner bottom-right">
                        ❁
                    </span>

                    <span className="mushaf-corner bottom-left">
                        ❁
                    </span>


                    {/* محتوى المصحف */}

                    <div className="mushaf-content">

                        {currentPage.ayahs.map((ayah, index) => {

                            const previousAyah =
                                currentPage.ayahs[index - 1];

                            // هل دي بداية سورة جديدة في الصفحة؟
                            const isNewSurah =
                                index === 0 ||
                                previousAyah?.surah.number !==
                                ayah.surah.number;

                            // سورة التوبة بدون بسملة
                            const showBismillah =
                                isNewSurah &&
                                ayah.surah.number !== 9;

                            return (
                                <span
                                    key={ayah.number}
                                    className="mushaf-ayah"
                                >

                {/* اسم السورة */}

                                    {isNewSurah && (
                                        <span className="surah-header">

                        <span className="surah-decoration">
                            ❖
                        </span>

                        <span className="surah-title">
                            سورة {ayah.surah.name}
                        </span>

                        <span className="surah-decoration">
                            ❖
                        </span>

                    </span>
                                    )}


                                    {/* البسملة */}

                                    {showBismillah && (
                                        <span className="bismillah">
                        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                    </span>
                                    )}


                                    {/* نص الآية */}

                                    <span className="ayah-text">
                    {ayah.text}
                </span>


                                    {/* رقم الآية */}

                                    <span className="ayah-marker">
                    {ayah.numberInSurah}
                </span>

            </span>
                            );
                        })}

                    </div>


                    {/* رقم الصفحة */}

                    <div className="mushaf-page-number">
                        {currentPage.number}
                    </div>

                </div>

            </div>


            {/* Navigation */}

            <div className="mushaf-navigation">

                {currentPageNumber > 1 ? (
                    <Link
                        to={`/quran/page/${
                            currentPageNumber - 1
                        }`}
                        className="mushaf-nav-btn"
                    >
                        → الصفحة السابقة
                    </Link>
                ) : (
                    <span />
                )}


                {currentPageNumber < 604 ? (
                    <Link
                        to={`/quran/page/${
                            currentPageNumber + 1
                        }`}
                        className="mushaf-nav-btn"
                    >
                        الصفحة التالية ←
                    </Link>
                ) : (
                    <span />
                )}

            </div>

        </div>
    );
}

export default MushafPage;