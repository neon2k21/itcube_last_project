// screens/ComicsListScreen.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorageHelper from '../utils/AsyncStorageHelper';

const ComicsListScreen = ({ navigation }) => {
  const [comics, setComics] = useState([]);

  useEffect(() => {
      const loadComics = async () => {
          const allComics = await AsyncStorageHelper.getAllComics();
          setComics(allComics);
      };
      loadComics();
  }, []);

  const renderItem = ({ item }) => (
      <TouchableOpacity style={styles.comicItem} onPress={() => navigation.navigate('Comic', { ...item, comicId: item.id })}>  {/* Передаем comicId */}
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
});

export default ComicsListScreen;