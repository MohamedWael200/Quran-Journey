import { createSlice } from "@reduxjs/toolkit";
import { getTheme, saveTheme } from "../../services/themeService";

const initialState = {
    mode: getTheme(),
};

const themeSlice = createSlice({
    name: "theme",

    initialState,

    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";

            saveTheme(state.mode);
        },
    },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;