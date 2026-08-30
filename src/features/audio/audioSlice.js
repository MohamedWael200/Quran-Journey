import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedSurah: null,
    audioData: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
};

const audioSlice = createSlice({
    name: "audio",

    initialState,

    reducers: {

        playSurah: (state, action) => {

            const {
                surah,
                audioData,
                startTime = 0,
            } = action.payload;

            state.selectedSurah = {
                ...surah,
                startTime,
            };

            state.audioData = audioData;

            state.currentTime = startTime;

            state.duration = 0;

            state.isPlaying = true;
        },


        setPlaying: (state, action) => {
            state.isPlaying = action.payload;
        },


        setCurrentTime: (state, action) => {
            state.currentTime = action.payload;
        },


        setDuration: (state, action) => {
            state.duration = action.payload;
        },


        closePlayer: (state) => {

            state.selectedSurah = null;

            state.audioData = null;

            state.isPlaying = false;

            state.currentTime = 0;

            state.duration = 0;
        },
    },
});

export const {
    playSurah,
    setPlaying,
    setCurrentTime,
    setDuration,
    closePlayer,
} = audioSlice.actions;

export default audioSlice.reducer;