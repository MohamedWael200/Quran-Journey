import { Link } from "react-router-dom";
import hadithBooks from "../../data/hadithBooks";

function HadithPage() {
    return (
        <div className="hadith-page">

            {/* Header */}
            <section className="hadith-hero">
                <span className="page-badge">
                    السنة النبوية
                </span>

                <h1>
                    📜 الأحاديث النبوية
                </h1>

                <p>
                    استكشف كتب الأحاديث النبوية الشريفة
                    واقرأ أحاديث رسول الله ﷺ.
                </p>
            </section>


            {/* Books */}
            <section className="hadith-books-section">

                <div className="section-heading">
                    <div>
                        <span className="section-label">
                            المكتبة الإسلامية
                        </span>

                        <h2>
                            كتب الأحاديث
                        </h2>
                    </div>

                    <span className="books-count">
                        {hadithBooks.length} كتب
                    </span>
                </div>


                <div className="hadith-books-grid">
                    {hadithBooks.map((book, index) => (
                        <Link
                            key={book.id}
                            to={`/hadith/${book.id}`}
                            className="hadith-book-card"
                        >
                            <div className="hadith-book-icon">
                                📖
                            </div>

                            <div className="hadith-book-info">
                                <span>
                                    الكتاب رقم {index + 1}
                                </span>

                                <h3>
                                    {book.name}
                                </h3>

                                <p>
                                    استعرض أحاديث هذا الكتاب
                                </p>
                            </div>

                            <span className="hadith-book-arrow">
                                ←
                            </span>
                        </Link>
                    ))}
                </div>

            </section>

        </div>
    );
}

export default HadithPage;