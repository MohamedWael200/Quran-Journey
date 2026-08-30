const LAST_LISTENING_KEY = "lastListening";

export const saveLastListening = (data) => {
    localStorage.setItem(
        LAST_LISTENING_KEY,
        JSON.stringify(data)
    );
};

export const getLastListening = () => {
    const data = localStorage.getItem(
        LAST_LISTENING_KEY
    );

    if (!data) {
        return null;
    }

    return JSON.parse(data);
};

export const removeLastListening = () => {
    localStorage.removeItem(
        LAST_LISTENING_KEY
    );
};