import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import useDebounce from "../hooks/useDebounce";
import surahStartPages from "../data/surahStartPages";
import { fetchSurahs } from "../features/quran/quranSlice";

function GlobalSearch() {
    const [searchTerm, setSearchTerm] =
        useState("");

    const dispatch = useDispatch();

    const debouncedSearchTerm =
        useDebounce(searchTerm, 500);

    const { surahs } = useSelector(
        (state) => state.quran
    );

    useEffect(() => {
        if (surahs.length === 0) {
            dispatch(fetchSurahs());
        }
    }, [dispatch, surahs.length]);

    const filteredSurahs = surahs.filter(
        (surah) => {
            const searchValue =
                debouncedSearchTerm.trim();

            return (
                surah.name_ar.includes(
                    searchValue
                ) ||
                String(surah.number) ===
                searchValue
            );
        }
    );

    const handleSelectSurah = () => {
        setSearchTerm("");
    };

    return (
        <div className="global-search">
            <div className="search-input-wrapper">
                <span className="search-icon">
                    🔍
                </span>

                <input
                    type="text"
                    placeholder="ابحث عن سورة..."
                    value={searchTerm}
                    onChange={(e) =>
                        setSearchTerm(e.target.value)
                    }
                />

                {searchTerm && (
                    <button
                        className="clear-search"
                        onClick={() =>
                            setSearchTerm("")
                        }
                        aria-label="مسح البحث"
                    >
                        ✕
                    </button>
                )}
            </div>

            {debouncedSearchTerm && (
                <div className="search-results">
                    {filteredSurahs.length > 0 ? (
                        filteredSurahs.map(
                            (surah) => (
                                <Link
                                    key={surah.id}
                                    className="search-result-item"
                                    to={`/quran/page/${
                                        surahStartPages[
                                            surah.number
                                            ]
                                    }`}
                                    onClick={
                                        handleSelectSurah
                                    }
                                >
                                    <span className="surah-number">
                                        {surah.number}
                                    </span>

                                    <span className="surah-name">
                                        {surah.name_ar}
                                    </span>

                                    <span className="result-arrow">
                                        ←
                                    </span>
                                </Link>
                            )
                        )
                    ) : (
                        <div className="no-results">
                            <span>🔎</span>
                            <p>
                                لا توجد سورة بهذا الاسم
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default GlobalSearch;