// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button } from 'react-native';
import AsyncStorageHelper from '../utils/AsyncStorageHelper';

const HomeScreen = ({ navigation }) => {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    const loadComics = async () => {
      const allComics = await AsyncStorageHelper.getAllComics();
      setComics(allComics);
    };
    loadComics();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.comicItem} onPress={() => navigation.navigate('Comic', { ...item, comicId: item.id })}>
      <Text style={styles.comicTitle}>{item.title}</Text>
      <Text>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={comics}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => <Text style={styles.header}>Мои комиксы</Text>}
        ListFooterComponent={() => (
          <Button title="Создать комикс" onPress={() => navigation.navigate('CreateComic')} />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
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
  comicItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  comicTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 20, // Добавляем отступ снизу, чтобы кнопка не прилипала к краю
  },
});

export default HomeScreen;