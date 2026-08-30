function LoadingScreen({
                           text = "جاري التحميل..."
                       }) {
    return (
        <div className="loading-screen">
            <div className="quran-loader">
                <div className="quran-book">
                    <div className="loader-book-page loader-page-left"></div>

                    <div className="book-spine"></div>

                    <div className="loader-book-page loader-page-right"></div>
                </div>
            </div>

            <h2>{text}</h2>

            <p>لحظات قليلة...</p>
        </div>
    );
}

export default LoadingScreen;