import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchReciters = createAsyncThunk(
    "reciters/fetchReciters",
    async () => {
        const response = await fetch(
            "https://quran.yousefheiba.com/api/reciters"
        );

        if (!response.ok) {
            throw new Error("حدث خطأ أثناء تحميل قائمة القراء");
        }

        const data = await response.json();

        return data.reciters;
    }
);

export const fetchReciterAudio = createAsyncThunk(
    "reciters/fetchReciterAudio",
    async (reciterId) => {
        const response = await fetch(
            `https://quran.yousefheiba.com/api/reciterAudio?reciter_id=${reciterId}`
        );

        if (!response.ok) {
            throw new Error("حدث خطأ أثناء تحميل تلاوات القارئ");
        }

        return response.json();
    }
);

const initialState = {
    reciters: [],
    audioData: null,
    loading: false,
    error: null,
};

const recitersSlice = createSlice({
    name: "reciters",

    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder
            // Reciters
            .addCase(fetchReciters.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReciters.fulfilled, (state, action) => {
                state.loading = false;
                state.reciters = action.payload;
            })
            .addCase(fetchReciters.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message ||
                    "حدث خطأ أثناء تحميل القراء";
            })

            // Reciter Audio
            .addCase(fetchReciterAudio.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReciterAudio.fulfilled, (state, action) => {
                state.loading = false;
                state.audioData = action.payload;
            })
            .addCase(fetchReciterAudio.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message ||
                    "حدث خطأ أثناء تحميل التلاوات";
            });
    },
});

export default recitersSlice.reducer;