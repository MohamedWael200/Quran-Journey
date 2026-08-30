import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./Navbar.jsx";

import MotivationReminder from "../MotivationReminder.jsx";
import Footer from "../common/Footer.jsx";
import CharityBanner from "../common/CharityBanner.jsx";
import GlobalAudioPlayer from "../audio/GlobalAudioPlayer.jsx";

function AppLayout() {
    const { mode } = useSelector(
        (state) => state.theme
    );

    return (
        <div className={`app ${mode}`}>

            {/* Header */}

            <header className="app-header">
                <div className="header-container">

                    <div className="app-logo">
                        <span className="logo-icon">
                            ☪
                        </span>

                        <div>
                            <h2>Qoran</h2>
                            <p>
                                رفيقك اليومي مع القرآن
                            </p>
                        </div>
                    </div>

                    <Navbar />

                </div>
            </header>


            {/* رسالة الصدقة الجارية */}

            <CharityBanner />


            {/* رسالة التحفيز */}

            <MotivationReminder />


            {/* محتوى الصفحات */}

            <main>
                <Outlet />
            </main>


            {/* Footer */}

            <Footer />

            <GlobalAudioPlayer />
        </div>
    );
}

export default AppLayout;