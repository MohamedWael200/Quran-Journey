import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="site-footer">

            <div className="footer-container">

                {/* About */}

                <div className="footer-about">

                    <h3>
                        📖 Quran Journey
                    </h3>

                    <p>
                        رحلة إيمانية مع كتاب الله،
                        اقرأ واستمع وتدبر القرآن الكريم
                        في أي وقت.
                    </p>

                </div>


                {/* Links */}

                <div className="footer-links">

                    <h4>
                        روابط سريعة
                    </h4>

                    <Link to="/">
                        الرئيسية
                    </Link>

                    <Link to="/quran">
                        المصحف
                    </Link>

                    <Link to="/reciters">
                        القراء
                    </Link>

                    <Link to="/bookmarks">
                        المحفوظات
                    </Link>

                </div>


                {/* Dua */}

                <div className="footer-dua">

                    <h4>
                        🤲 دعوة طيبة
                    </h4>

                    <p>
                        نسألكم الدعاء لجدي وستّي
                        بالرحمة والمغفرة،
                        وأن يجعل الله هذا العمل
                        صدقة جارية لهما.
                    </p>

                </div>

            </div>


            {/* Bottom */}

            <div className="footer-bottom">

                <p>
                    صُمم بحب ليكون صدقة جارية 🤍
                </p>

                <span>
                    © {new Date().getFullYear()} Quran Journey
                </span>

            </div>

        </footer>
    );
}

export default Footer;