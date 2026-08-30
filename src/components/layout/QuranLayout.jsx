import { Outlet } from "react-router-dom";

function QuranLayout() {
    return (
        <div className="quran-layout">
            <section className="quran-layout-hero">
                <span className="quran-layout-icon">
                    📖
                </span>

                <div>
                    <span className="section-label">
                        القرآن الكريم
                    </span>

                    <h1>
                        رحلتك مع كتاب الله
                    </h1>

                    <p>
                        اقرأ القرآن الكريم وتابع تقدمك
                        في رحلتك اليومية.
                    </p>
                </div>
            </section>

            <Outlet />
        </div>
    );
}

export default QuranLayout;