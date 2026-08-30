import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAzkar = createAsyncThunk(
    "azkar/fetchAzkar",
    async () => {
        const response = await fetch(
            "https://quran.yousefheiba.com/api/azkar"
        );

        if (!response.ok) {
            throw new Error("حدث خطأ أثناء تحميل الأذكار");
        }

        return response.json();
    }
);

const initialState = {
    data: {},
    loading: false,
    error: null,
};

const azkarSlice = createSlice({
    name: "azkar",

    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchAzkar.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchAzkar.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })

            .addCase(fetchAzkar.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message ||
                    "حدث خطأ أثناء تحميل الأذكار";
            });
    },
});

export default azkarSlice.reducer;