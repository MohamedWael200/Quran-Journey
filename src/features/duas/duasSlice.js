import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {},
    loading: false,
    error: null,
};

export const fetchDuas = createAsyncThunk(
    "duas/fetchDuas",
    async () => {
        const response = await fetch(
            "https://quran.yousefheiba.com/api/duas"
        );

        if (!response.ok) {
            throw new Error("حدث خطأ أثناء تحميل الأدعية");
        }

        return response.json();
    }
);

const duasSlice = createSlice({
    name: "duas",

    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchDuas.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDuas.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchDuas.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default duasSlice.reducer;