import { Link } from "react-router-dom";
import { useState } from "react";

import {
    getBookmarks,
    removeBookmark,
} from "../../services/bookmarkService";

function BookmarksPage() {
    const [bookmarks, setBookmarks] = useState(
        getBookmarks()
    );

    const handleRemoveBookmark = (pageNumber) => {
        const updatedBookmarks =
            removeBookmark(pageNumber);

        setBookmarks(updatedBookmarks);
    };

    return (
        <div className="bookmarks-page">

            {/* Header */}

            <section className="bookmarks-hero">
                <div className="bookmarks-hero-icon">
                    🔖
                </div>

                <div>
                    <span className="section-label">
                        صفحاتك المحفوظة
                    </span>

                    <h1>
                        المحفوظات
                    </h1>

                    <p>
                        احتفظ بالصفحات المهمة وارجع لها
                        في أي وقت بسهولة.
                    </p>
                </div>
            </section>


            {/* Stats */}

            <section className="bookmarks-summary">
                <div className="bookmark-summary-icon">
                    🔖
                </div>

                <div>
                    <span>
                        إجمالي الصفحات المحفوظة
                    </span>

                    <strong>
                        {bookmarks.length}
                    </strong>
                </div>
            </section>


            {/* Content */}

            {bookmarks.length === 0 ? (

                <section className="empty-bookmarks">

                    <div className="empty-bookmark-icon">
                        🔖
                    </div>

                    <h2>
                        لا توجد صفحات محفوظة
                    </h2>

                    <p>
                        أثناء القراءة يمكنك حفظ أي صفحة
                        للعودة إليها لاحقًا.
                    </p>

                    <Link
                        to="/quran"
                        className="empty-bookmarks-btn"
                    >
                        📖 ابدأ القراءة
                    </Link>

                </section>

            ) : (

                <section className="bookmarks-section">

                    <div className="bookmarks-section-header">
                        <div>
                            <span className="section-label">
                                مكتبتك الخاصة
                            </span>

                            <h2>
                                الصفحات المحفوظة
                            </h2>
                        </div>

                        <span className="bookmarks-count">
                            {bookmarks.length} صفحة
                        </span>
                    </div>


                    <div className="bookmarks-grid">

                        {bookmarks.map((bookmark) => (

                            <article
                                key={bookmark.pageNumber}
                                className="bookmark-card"
                            >

                                <div className="bookmark-card-number">
                                    {bookmark.pageNumber}
                                </div>


                                <div className="bookmark-card-content">

                                    <span>
                                        صفحة من القرآن الكريم
                                    </span>

                                    <h3>
                                        الصفحة رقم{" "}
                                        {bookmark.pageNumber}
                                    </h3>

                                </div>


                                <div className="bookmark-card-actions">

                                    <Link
                                        to={`/quran/page/${bookmark.pageNumber}`}
                                        className="open-bookmark-btn"
                                    >
                                        فتح الصفحة ←
                                    </Link>

                                    <button
                                        onClick={() =>
                                            handleRemoveBookmark(
                                                bookmark.pageNumber
                                            )
                                        }
                                        className="remove-bookmark-btn"
                                        title="حذف من المحفوظات"
                                    >
                                        🗑️
                                    </button>

                                </div>

                            </article>

                        ))}

                    </div>

                </section>

            )}

        </div>
    );
}

export default BookmarksPage;