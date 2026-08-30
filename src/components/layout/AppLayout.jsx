import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./Navbar.jsx";
import MotivationReminder from "../MotivationReminder.jsx";

function AppLayout() {
    const { mode } = useSelector(
        (state) => state.theme
    );

    return (
        <div className={`app ${mode}`}>
            <header className="app-header">
                <div className="header-container">
                    <div className="app-logo">
                        <span className="logo-icon">
                            ☪
                        </span>

                        <div>
                            <h2>Qoran</h2>
                            <p>رفيقك اليومي مع القرآن</p>
                        </div>
                    </div>

                    <Navbar />
                </div>
            </header>

            <MotivationReminder />

            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default AppLayout;