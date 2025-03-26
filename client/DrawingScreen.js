import React, { useRef, useState } from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import { Canvas, Path, Skia } from '@shopify/react-native-skia';

export default function DrawingScreen() {
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState(null);
  const [brushType, setBrushType] = useState('pencil'); // 'pencil', 'marker', 'pen'

  const canvasRef = useRef(null);

  const handleTouchStart = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    setCurrentPath([{ x: locationX, y: locationY }]);
  };

  const handleTouchMove = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    setCurrentPath((prevPath) => [...prevPath, { x: locationX, y: locationY }]);
  };

  const handleTouchEnd = () => {
    setPaths((prevPaths) => [...prevPaths, currentPath]);
    setCurrentPath(null);
  };

  const changeBrush = (type) => {
    setBrushType(type);
    Alert.alert(`Кисть изменена на: ${type}`);
  };

  return (
    <View style={styles.container}>
      <Canvas
        ref={canvasRef}
        style={styles.canvas}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {paths.map((path, index) => (
          <Path
            key={index}
            path={Skia.Path.Make().addPoly(path, false)}
            strokeWidth={brushType === 'pencil' ? 2 : brushType === 'marker' ? 5 : 3}
            stroke={brushType === 'pencil' ? 'black' : brushType === 'marker' ? 'blue' : 'red'}
          />
        ))}
        {currentPath && (
          <Path
            path={Skia.Path.Make().addPoly(currentPath, false)}
            strokeWidth={brushType === 'pencil' ? 2 : brushType === 'marker' ? 5 : 3}
            stroke={brushType === 'pencil' ? 'black' : brushType === 'marker' ? 'blue' : 'red'}
          />
        )}
      </Canvas>
      <View style={styles.buttons}>
        <Button title="Карандаш" onPress={() => changeBrush('pencil')} />
        <Button title="Фломастер" onPress={() => changeBrush('marker')} />
        <Button title="Ручка" onPress={() => changeBrush('pen')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  canvas: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
  },
});