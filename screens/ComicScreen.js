// screens/ComicScreen.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Alert } from 'react-native';
import ComicCell from '../components/ComicCell';
import AsyncStorageHelper from '../utils/AsyncStorageHelper';

const ComicScreen = ({ route, navigation }) => {
  const { title, description } = route.params;
  const [cells, setCells] = useState([]);
  const [nextCellId, setNextCellId] = useState(1);
  const [comicId, setComicId] = useState(null);

  useEffect(() => {
      const initializeComic = async () => {
          if (route.params.comicId) {
              const loadedComic = await AsyncStorageHelper.getComic(route.params.comicId);
              if (loadedComic) {
                  setCells(loadedComic.cells);
                  setNextCellId(loadedComic.nextCellId);
                  setComicId(route.params.comicId);
              }
          } else {
              const newComicId = Date.now().toString();
              setComicId(newComicId);
          }
      };
      initializeComic();
  }, [route.params.comicId]);

  useEffect(() => {
      const saveComic = async () => {
          if (comicId) {
              const comicData = {
                  title,
                  description,
                  cells,
                  nextCellId,
              };
              await AsyncStorageHelper.saveComic(comicId, comicData);
          }
      };
      saveComic();
  }, [cells, nextCellId, comicId, title, description]);


  const handleAddCell = () => {
      const newCell = {
          id: nextCellId,
          width: 150,
          height: 150,
          textFrames: [],
      };
      setCells([...cells, newCell]);
      setNextCellId(nextCellId + 1);
  };

  const handleCellPress = (cellId) => {
      Alert.alert("Cell Pressed", `Cell ID: ${cellId}`);
  };

  const handleTextFrameAdd = (cellId) => {
      const cellIndex = cells.findIndex(cell => cell.id === cellId);
      if (cellIndex !== -1) {
          const newTextFrame = {
              id: Date.now().toString(),
              x: 10,
              y: 10,
              width: 100,
              height: 30,
              text: "New Text"
          };
          const updatedCells = [...cells];
          updatedCells[cellIndex].textFrames = [...(updatedCells[cellIndex].textFrames || []), newTextFrame];
          setCells(updatedCells);
      }
  };

  const handleTextFrameChange = (cellId, frameId, newText, newWidth, newHeight) => {
      const cellIndex = cells.findIndex(cell => cell.id === cellId);
      if (cellIndex !== -1) {
          const updatedCells = [...cells];
          const frameIndex = updatedCells[cellIndex].textFrames.findIndex(frame => frame.id === frameId);
          if (frameIndex !== -1) {
              updatedCells[cellIndex].textFrames[frameIndex] = {
                  ...updatedCells[cellIndex].textFrames[frameIndex],
                  text: newText,
                  width: newWidth || updatedCells[cellIndex].textFrames[frameIndex].width,
                  height: newHeight || updatedCells[cellIndex].textFrames[frameIndex].height,
              };
              setCells(updatedCells);
          }
      }
  };
  const handleCellResize = (cellId, newWidth, newHeight) => {
      const cellIndex = cells.findIndex(cell => cell.id === cellId);
      if (cellIndex !== -1) {
          const updatedCells = [...cells];
          updatedCells[cellIndex] = {
              ...updatedCells[cellIndex],
              width: newWidth,
              height: newHeight,
          };
          setCells(updatedCells);
      }
  };

  return (
    <ScrollView contentContainerStyle={styles.comicContainer}>
      <Text style={styles.comicTitle}>{title}</Text>
      <Text style={styles.comicDescription}>{description}</Text>

      {cells.map((cell) => (
        <ComicCell
          key={cell.id}
          cellData={cell}
          onCellPress={handleCellPress}
          onTextFrameAdd={handleTextFrameAdd}
          onTextFrameChange={handleTextFrameChange}
          onCellResize={handleCellResize}
        />
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