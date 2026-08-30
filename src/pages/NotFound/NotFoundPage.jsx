import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <div className="not-found-page">

            <section className="not-found-card">

                <div className="not-found-icon">
                    📖
                </div>

                <span className="section-label">
                    خطأ 404
                </span>

                <h1>
                    الصفحة غير موجودة
                </h1>

                <p>
                    يبدو أن الصفحة التي تبحث عنها غير موجودة
                    أو ربما تم نقلها إلى مكان آخر.
                </p>

                <div className="not-found-actions">

                    <Link
                        to="/"
                        className="not-found-home-btn"
                    >
                        🏠 العودة للرئيسية
                    </Link>

                    <Link
                        to="/quran"
                        className="not-found-quran-btn"
                    >
                        📖 ابدأ القراءة
                    </Link>

                </div>

            </section>

        </div>
    );
}

export default NotFoundPage;