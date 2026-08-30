import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../../components/layout/AppLayout.jsx";
import HomePage from "../../pages/Home/HomePage.jsx";
import QuranPage from "../../pages/Quran/QuranPage.jsx";
import AzkarPage from "../../pages/Azkar/AzkarPage.jsx";
import TasbeehPage from "../../pages/Tasbeeh/TasbeehPage.jsx";
import DuasPage from "../../pages/Duas/DuasPage.jsx";
import HadithPage from "../../pages/Hadith/HadithPage.jsx";
import DashboardPage from "../../pages/Dashboard/DashboardPage.jsx";
import BookmarksPage from "../../pages/Bookmarks/BookmarksPage.jsx";
import GoalsPage from "../../pages/Goals/GoalsPage.jsx";
import SearchPage from "../../pages/Search/SearchPage.jsx";
import AchievementTreePage from "../../pages/AchievementTree/AchievementTreePage.jsx";
import SettingsPage from "../../pages/Settings/SettingsPage.jsx";
import NotFoundPage from "../../pages/NotFound/NotFoundPage.jsx";
import SurahDetailsPage from "../../pages/Quran/SurahDetailsPage.jsx";
import QuranLayout from "../../components/layout/QuranLayout.jsx";
import MushafPage from "../../pages/Quran/MushafPage.jsx";
import AzkarDetailsPage from "../../pages/Azkar/AzkarDetailsPage.jsx";
import DuasDetailsPage from "../../pages/Duas/DuasDetailsPage.jsx";
import HadithDetailsPage from "../../pages/Hadith/HadithDetailsPage.jsx";
import PrayerTimesPage from "../../pages/PrayerTimes/PrayerTimesPage.jsx";
import RecitersPage from "../../pages/Quran/RecitersPage.jsx";
import TreesPage from "../../pages/Trees/TreesPage.jsx";
import ReciterSurahsPage from "../../pages/Quran/ReciterSurahsPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "quran",
        element: <QuranLayout />,
        children: [
          {
            index: true,
            element: <QuranPage />,
          },
          {
            path: "page/:pageNumber",
            element: <MushafPage />,
          },
          // {
          //   path: ":surahId",
          //   element: <SurahDetailsPage />,
          // },
        ],
      },
      {
        path: "bookmarks",
        element: <BookmarksPage />,
      },
      {
        path: "azkar",
        children: [
          {
            index: true,
            element: <AzkarPage />,
          },
          {
            path: ":categoryId",
            element: <AzkarDetailsPage />,
          },
        ],
      },

      {
        path: "tasbeeh",
        element: <TasbeehPage />,
      },

      {
        path: "duas",
        children: [
          {
            index: true,
            element: <DuasPage />,
          },
          {
            path: ":categoryId",
            element: <DuasDetailsPage />,
          },
        ],
      },

      {
        path: "hadith",
        children: [
          {
            index: true,
            element: <HadithPage />,
          },
          {
            path: ":bookId",
            element: <HadithDetailsPage />,
          },
        ],
      },

      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "bookmarks",
        element: <BookmarksPage />,
      },

      {
        path: "goals",
        element: <GoalsPage />,
      },

      {
        path: "search",
        element: <SearchPage />,
      },

      {
        path: "achievement-tree",
        element: <AchievementTreePage />,
      },

      {
        path: "settings",
        element: <SettingsPage />,
      },

      {
        path: "prayer-times",
        element: <PrayerTimesPage />,
      },

      {
        path: "reciters",
        element: <RecitersPage />,
      },

      {
        path :"/reciters/:reciterId",
        element : <ReciterSurahsPage />,
      },


      {
        path: "trees",
        element: <TreesPage />,
      },

      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
