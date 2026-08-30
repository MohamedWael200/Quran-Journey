import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    loading: false,
    error: null,
};

export const fetchHadithBook = createAsyncThunk(
    "hadith/fetchHadithBook",
    async (edition) => {
        const response = await fetch(
            `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${edition}.json`
        );

        if (!response.ok) {
            throw new Error("حدث خطأ أثناء تحميل الأحاديث");
        }

        return response.json();
    }
);

const hadithSlice = createSlice({
    name: "hadith",

    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchHadithBook.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.data = [];
            })
            .addCase(fetchHadithBook.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.hadiths || [];
            })
            .addCase(fetchHadithBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default hadithSlice.reducer;