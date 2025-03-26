// screens/HomeScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, ImageBackground, Alert } from 'react-native';
import AsyncStorageHelper from '../utils/AsyncStorageHelper';
import backgroundImage from '../assets/background.png';

const HomeScreen = ({ navigation }) => {
    const [comics, setComics] = useState([]);

    const loadComics = useCallback(async () => {
        const allComics = await AsyncStorageHelper.getAllComics();
        setComics(allComics);
    }, []);

    useEffect(() => {
        loadComics();
    }, [loadComics]);

    const handleCreateComic = () => {
        navigation.navigate('CreateComic');
    };

    const handleDeleteComic = async (comicId) => {
        Alert.alert(
            "Удалить комикс?",
            "Вы уверены, что хотите удалить этот комикс?",
            [
                {
                    text: "Отмена",
                    style: "cancel"
                },
                {
                    text: "Удалить",
                    onPress: async () => {
                        await AsyncStorageHelper.deleteComic(comicId);
                        loadComics(); // Обновляем список после удаления
                    },
                }
            ]
        );
    };

    const renderItem = ({ item }) => (
        <View style={styles.comicItemContainer}>
            <TouchableOpacity style={styles.comicItem} onPress={() => navigation.navigate('Comic', { ...item, comicId: item.id })}>
                <Text style={styles.comicTitle}>{item.title}</Text>
                <Text>{item.description}</Text>
            </TouchableOpacity>
            <Button title="Удалить" onPress={() => handleDeleteComic(item.id)} />
        </View>
    );

    return (
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <View style={styles.container}>
                <FlatList
                    data={comics}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    ListHeaderComponent={() => <Text style={styles.header}>Мои комиксы</Text>}
                    ListFooterComponent={() => (
                        <Button title="Создать комикс" onPress={handleCreateComic} />
                    )}
                    contentContainerStyle={styles.listContainer}
                />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    comicItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    comicItem: {
        flex: 1,
    },
    comicTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    listContainer: {
        paddingBottom: 20,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
});

export default HomeScreen;