// utils/AsyncStorageHelper.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const COMICS_KEY = 'comics';

const AsyncStorageHelper = {
    saveComic: async (comicId, comicData) => {
        try {
            await AsyncStorage.setItem(comicId, JSON.stringify(comicData));
        } catch (e) {
            console.error("Ошибка сохранения комикса:", e);
        }
    },
    getComic: async (comicId) => {
        try {
            const jsonValue = await AsyncStorage.getItem(comicId);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.error("Ошибка загрузки комикса:", e);
            return null;
        }
    },
    deleteComic: async (comicId) => {
        try {
            await AsyncStorage.removeItem(comicId);
        } catch (e) {
            console.error("Ошибка удаления комикса:", e);
        }
    },

    getAllComics: async () => {
        const keys = await AsyncStorage.getAllKeys();
        const comics = [];
        for (const key of keys) {
            if (key !== COMICS_KEY) { // Исключаем ключ списка комиксов
                const comicData = await AsyncStorage.getItem(key);
                if (comicData) {
                    try {
                        const parsedComic = JSON.parse(comicData);
                        comics.push({
                            id: key, // Сохраняем ID
                            title: parsedComic.title,
                            description: parsedComic.description,
                        });
                    } catch (error) {
                        console.error("Ошибка парсинга JSON при загрузке комикса:", error);
                    }
                }
            }
        }
        return comics;
    },
};

export default AsyncStorageHelper;