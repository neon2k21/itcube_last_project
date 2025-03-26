// screens/ComicScreen.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import ComicCell from '../components/ComicCell';

const ComicScreen = ({ route }) => {
  const { title, description } = route.params;
  const [cells, setCells] = useState([]);
  const [nextCellId, setNextCellId] = useState(1);

  const handleAddCell = () => {
    const newCell = {
      id: nextCellId,
      text: `Ячейка комикса ${nextCellId}`,
    };
    setCells([...cells, newCell]);
    setNextCellId(nextCellId + 1);
  };

  return (
    <ScrollView contentContainerStyle={styles.comicContainer}>
      <Text style={styles.comicTitle}>{title}</Text>
      <Text style={styles.comicDescription}>{description}</Text>

      {cells.map((cell) => (
        <ComicCell key={cell.id} text={cell.text} />
      ))}

      <Button title="Добавить ячейку" onPress={handleAddCell} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  comicContainer: {
    padding: 20,
    alignItems: 'center',
  },
  comicTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  comicDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default ComicScreen;