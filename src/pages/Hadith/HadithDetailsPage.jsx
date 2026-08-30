import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import hadithBooks from "../../data/hadithBooks";
import { fetchHadithBook } from "../../features/hadith/hadithSlice";
import LoadingScreen from "../../components/common/LoadingScreen";

function HadithDetailsPage() {
    const { bookId } = useParams();

    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 20;

    const { data, loading, error } = useSelector(
        (state) => state.hadith
    );

    const currentBook = hadithBooks.find(
        (book) => book.id === bookId
    );

    const validHadiths = data.filter(
        (hadith) => hadith.text?.trim()
    );

    const totalPages = Math.ceil(
        validHadiths.length / itemsPerPage
    );

    const startIndex =
        (currentPage - 1) * itemsPerPage;

    const currentHadiths = validHadiths.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    useEffect(() => {
        if (currentBook) {
            dispatch(
                fetchHadithBook(currentBook.edition)
            );
        }
    }, [dispatch, currentBook]);

    useEffect(() => {
        setCurrentPage(1);
    }, [bookId]);

    if (!currentBook) {
        return (
            <div className="hadith-error">
                <h2>هذا الكتاب غير موجود</h2>
            </div>
        );
    }

    if (loading) {
        return (
            <LoadingScreen
                text="جاري تحميل الأحاديث النبوية..."
            />
        );
    }

    if (error) {
        return (
            <div className="hadith-error">
                <h2>حدث خطأ</h2>

                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="hadith-details-page">

            {/* Header */}

            <section className="hadith-book-header">

                <div className="hadith-book-icon">
                    📜
                </div>

                <div className="hadith-book-content">

                    <span className="section-label">
                        الأحاديث النبوية
                    </span>

                    <h1>
                        {currentBook.name}
                    </h1>

                    <p>
                        استكشف الأحاديث النبوية
                        الشريفة وتصفحها بسهولة.
                    </p>

                </div>

                <div className="hadith-book-count">

                    <strong>
                        {validHadiths.length}
                    </strong>

                    <span>
                        حديث
                    </span>

                </div>

            </section>


            {/* Hadiths */}

            <section className="hadiths-list-section">

                <div className="hadiths-list-header">

                    <div>
                        <span className="section-label">
                            الصفحة الحالية
                        </span>

                        <h2>
                            الأحاديث
                        </h2>
                    </div>

                    <span className="hadith-page-badge">
                        {startIndex + 1} -{" "}
                        {Math.min(
                            startIndex + itemsPerPage,
                            validHadiths.length
                        )}
                    </span>

                </div>


                {currentHadiths.length === 0 ? (

                    <div className="empty-hadiths">
                        <span>📭</span>

                        <h3>
                            لا توجد أحاديث
                        </h3>

                        <p>
                            لم يتم العثور على أحاديث
                            في هذا الكتاب.
                        </p>
                    </div>

                ) : (

                    <div className="hadiths-list">

                        {currentHadiths.map(
                            (hadith, index) => {

                                const hadithNumber =
                                    startIndex + index + 1;

                                return (
                                    <article
                                        key={
                                            hadith.hadithnumber ||
                                            index
                                        }
                                        className="hadith-card"
                                    >

                                        <div className="hadith-number">

                                            <span>
                                                حديث
                                            </span>

                                            <strong>
                                                {hadithNumber}
                                            </strong>

                                        </div>


                                        <div className="hadith-content">

                                            <p>
                                                {hadith.text}
                                            </p>

                                        </div>

                                    </article>
                                );
                            }
                        )}

                    </div>

                )}

            </section>


            {/* Pagination */}

            {totalPages > 1 && (

                <div className="hadith-pagination">

                    <button
                        onClick={() => {
                            setCurrentPage(
                                (prev) =>
                                    Math.max(
                                        prev - 1,
                                        1
                                    )
                            );

                            window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            });
                        }}
                        disabled={currentPage === 1}
                    >
                        →
                        السابق
                    </button>


                    <div className="pagination-info">

                        <strong>
                            {currentPage}
                        </strong>

                        <span>
                            من {totalPages}
                        </span>

                    </div>


                    <button
                        onClick={() => {
                            setCurrentPage(
                                (prev) =>
                                    Math.min(
                                        prev + 1,
                                        totalPages
                                    )
                            );

                            window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            });
                        }}
                        disabled={
                            currentPage === totalPages
                        }
                    >
                        التالي
                        ←
                    </button>

                </div>

            )}

        </div>
    );
}

export default HadithDetailsPage;