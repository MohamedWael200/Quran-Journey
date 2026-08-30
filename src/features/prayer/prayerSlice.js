import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPrayerTimes = createAsyncThunk(
    "prayer/fetchPrayerTimes",
    async () => {
        const response = await fetch(
            "https://quran.yousefheiba.com/api/getPrayerTimes"
        );

        if (!response.ok) {
            throw new Error("حدث خطأ أثناء تحميل مواقيت الصلاة");
        }

        return response.json();
    }
);

const initialState = {
    data: null,
    loading: false,
    error: null,
};

const prayerSlice = createSlice({
    name: "prayer",

    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchPrayerTimes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchPrayerTimes.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })

            .addCase(fetchPrayerTimes.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message ||
                    "حدث خطأ أثناء تحميل مواقيت الصلاة";
            });
    },
});

export default prayerSlice.reducer;