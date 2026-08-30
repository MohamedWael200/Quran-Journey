const STORAGE_KEY = "quran-bookmarks";

export const getBookmarks = () => {
    const bookmarks = localStorage.getItem(STORAGE_KEY);

    return bookmarks ? JSON.parse(bookmarks) : [];
};

export const addBookmark = (bookmark) => {
    const bookmarks = getBookmarks();

    const isAlreadySaved = bookmarks.some(
        (item) => item.pageNumber === bookmark.pageNumber
    );

    if (isAlreadySaved) {
        return bookmarks;
    }

    const updatedBookmarks = [...bookmarks, bookmark];

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedBookmarks)
    );

    return updatedBookmarks;
};

export const removeBookmark = (pageNumber) => {
    const bookmarks = getBookmarks();

    const updatedBookmarks = bookmarks.filter(
        (item) => item.pageNumber !== pageNumber
    );

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedBookmarks)
    );

    return updatedBookmarks;
};