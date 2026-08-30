import { Link } from "react-router-dom";

function QuickLinks() {
    const links = [
        {
            name: "القرآن الكريم",
            icon: "📖",
            path: "/quran",
        },
        {
            name: "الأحاديث",
            icon: "📜",
            path: "/hadith",
        },
        {
            name: "الأذكار",
            icon: "🌅",
            path: "/azkar",
        },
        {
            name: "التسبيح",
            icon: "🧿",
            path: "/tasbeeh",
        },
        {
            name: "استمع للقرآن",
            icon: "🎧",
            path: "/reciters",
        },
        {
            name: "مواقيت الصلاة",
            icon: "🕌",
            path: "/prayer-times",
        },
    ];

    return (
        <section className="quick-links-section">
            <div className="quick-links-header">
                <div>
                    <span className="section-label">
                        اختصارات
                    </span>

                    <h2>
                        الوصول السريع ⚡
                    </h2>
                </div>

                <p>
                    انتقل بسرعة إلى أهم أقسام التطبيق
                </p>
            </div>

            <div className="quick-links-grid">
                {links.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className="quick-link-card"
                    >
                        <span className="quick-link-icon">
                            {link.icon}
                        </span>

                        <span className="quick-link-name">
                            {link.name}
                        </span>

                        <span className="quick-link-arrow">
                            ←
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default QuickLinks;