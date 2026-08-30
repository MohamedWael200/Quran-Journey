import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import GlobalSearch from "../GlobalSearch.jsx";
import { toggleTheme } from "../../features/theme/themeSlice";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] =
        useState(false);

    const dispatch = useDispatch();

    const { mode } = useSelector(
        (state) => state.theme
    );

    const getNavLinkClass = ({ isActive }) => {
        return isActive
            ? "nav-link active"
            : "nav-link";
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const navItems = [
        { to: "/", label: "الرئيسية", end: true },
        { to: "/quran", label: "القرآن الكريم" },
        {
            to: "/reciters",
            label: "الاستماع إلى القرآن",
        },
        { to: "/bookmarks", label: "المحفوظات" },
        { to: "/azkar", label: "الأذكار" },
        { to: "/tasbeeh", label: "التسبيح" },
        { to: "/duas", label: "الأدعية" },
        { to: "/hadith", label: "الأحاديث" },
        { to: "/dashboard", label: "لوحة التحكم" },
        {
            to: "/prayer-times",
            label: "مواقيت الصلاة",
        },
        {
            to: "/trees",
            label: "حديقة الإنجازات 🌳",
        },
    ];

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                className="menu-toggle"
                onClick={() =>
                    setIsMenuOpen((prev) => !prev)
                }
                aria-label="فتح القائمة"
            >
                {isMenuOpen ? "✕" : "☰"}
            </button>

            {/* Navbar */}
            <nav
                className={`navbar ${
                    isMenuOpen
                        ? "navbar-open"
                        : ""
                }`}
            >
                <div className="nav-links">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            className={getNavLinkClass}
                            onClick={closeMenu}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </div>

                <div className="nav-actions">
                    <GlobalSearch />

                    <button
                        className="theme-toggle"
                        onClick={() =>
                            dispatch(toggleTheme())
                        }
                    >
                        {mode === "light"
                            ? "🌙"
                            : "☀️"}
                    </button>
                </div>
            </nav>

            {/* Overlay للموبايل */}
            {isMenuOpen && (
                <div
                    className="menu-overlay"
                    onClick={closeMenu}
                />
            )}
        </>
    );
}

export default Navbar;