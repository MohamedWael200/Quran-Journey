import { configureStore } from "@reduxjs/toolkit";
import quranReducer from "../../features/quran/quranSlice.js";
import themeReducer from "../../features/theme/themeSlice.js"
import azkarReducer from "../../features/azkar/azkarSlice.js"
import duasReducer from "../../features/duas/duasSlice";
import hadithReducer from "../../features/hadith/hadithSlice";
import prayerReducer from "../../features/prayer/prayerSlice";
import recitersReducer from "../../features/reciters/recitersSlice";

export const store = configureStore({
  reducer: {
    quran : quranReducer,
    theme: themeReducer,
    azkar: azkarReducer,
    duas: duasReducer,
    hadith: hadithReducer,
    prayer: prayerReducer,
    reciters: recitersReducer,
  },
});

export default store;
