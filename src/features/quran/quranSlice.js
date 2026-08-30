import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSurahs = createAsyncThunk(
    "quran/fetchSurahs",
    async () => {
        const response = await fetch(
            "https://quran.yousefheiba.com/api/surahs"
        );

        if (!response.ok) {
            throw new Error("حدث خطأ أثناء تحميل السور");
        }

        const result = await response.json();

        return result;
    }
);

export const fetchSurahAyahs = createAsyncThunk(
    "quran/fetchSurahAyahs",
    async (surahNumber) => {
        const response = await fetch(
            `https://quran.yousefheiba.com/api/ayah?number=${surahNumber}`
        );

        if (!response.ok) {
            throw new Error("حدث خطأ أثناء تحميل آيات السورة");
        }

        const result = await response.json();

        return result;
    }
);

export const fetchQuranPage = createAsyncThunk(
    "quran/fetchQuranPage",
    async (pageNumber) => {
        const response = await fetch(
            `https://quran.yousefheiba.com/api/quranPagesText?page=${pageNumber}`
        );

        if (!response.ok) {
            throw new Error("حدث خطأ أثناء تحميل صفحة المصحف");
        }

        const result = await response.json();

        return result.data;
    }
);

const initialState = {
    surahs: [],
    surahsLoading: false,
    surahsError: null,

    ayahs: [],
    ayahsLoading: false,
    ayahsError: null,

    currentPage: null,
    currentPageLoading: false,
    currentPageError: null,
};

const quranSlice = createSlice({
    name: "quran",

    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder
            //fetchSurahs
            .addCase(fetchSurahs.pending, (state) => {
                state.surahsLoading = true;
                state.surahsError = null;
            })

            .addCase(fetchSurahs.fulfilled, (state, action) => {
                state.surahsLoading = false;
                state.surahs = action.payload;
            })

            .addCase(fetchSurahs.rejected, (state, action) => {
                state.surahsLoading = false;
                state.surahsError = action.error.message;
            })
            //fetchSurahAyahs
            .addCase(fetchSurahAyahs.pending, (state) => {
                state.ayahsLoading = true;
                state.ayahsError = null;
            })

            .addCase(fetchSurahAyahs.fulfilled, (state, action) => {
                state.ayahsLoading = false;
                state.ayahs = action.payload;
            })

            .addCase(fetchSurahAyahs.rejected, (state, action) => {
                state.ayahsLoading = false;
                state.ayahsError = action.error.message;
            })

            //fetchQuranPage
            .addCase(fetchQuranPage.pending, (state) => {
                state.currentPageLoading = true;
                state.currentPageError = null;
            })

            .addCase(fetchQuranPage.fulfilled, (state, action) => {
                state.currentPageLoading = false;
                state.currentPage = action.payload;
            })

            .addCase(fetchQuranPage.rejected, (state, action) => {
                state.currentPageLoading = false;
                state.currentPageError = action.error.message;
            });
    },
});

export default quranSlice.reducer;