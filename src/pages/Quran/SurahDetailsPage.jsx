import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchSurahAyahs } from "../../features/quran/quranSlice";

function SurahDetailsPage() {
    const { surahId } = useParams();

    const dispatch = useDispatch();

    const { ayahs, ayahsLoading, ayahsError } = useSelector(
        (state) => state.quran
    );

    useEffect(() => {
        dispatch(fetchSurahAyahs(surahId));
    }, [dispatch, surahId]);

    if (ayahsLoading) {
        return <h2>جاري تحميل آيات السورة...</h2>;
    }

    if (ayahsError) {
        return <h2>{ayahsError}</h2>;
    }

    return (
        <div>
            <h2>آيات السورة</h2>

            {ayahs.map((ayah) => (
                <div key={ayah.id}>
                    <p>
                        {ayah.number_in_surah} - {ayah.text}
                    </p>
                </div>
            ))}

            <Link to="/quran">
                العودة إلى قائمة السور
            </Link>
        </div>
    );
}

export default SurahDetailsPage;