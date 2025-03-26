// screens/ComicScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Alert, Dimensions, ImageBackground, Animated } from 'react-native';
import ComicCell from '../components/ComicCell';
import AsyncStorageHelper from '../utils/AsyncStorageHelper';
import backgroundImage from '../assets/background.png';

const ComicScreen = ({ route, navigation }) => {
    const { title, description } = route.params;
    const [cells, setCells] = useState([]);
    const [nextCellId, setNextCellId] = useState(1);
    const [comicId, setComicId] = useState(null);
    const { width, height } = Dimensions.get('window');

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

                const initialCell = {
                    id: nextCellId,
                    width: width - 40, // Учитываем отступы
                    height: height / 2,
                    textFrames: [],
                };
                setCells([initialCell]);
                setNextCellId(nextCellId + 1);
            }
        };
        initializeComic();
    }, [route.params.comicId, width, height]);

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
        if (route.params.comicId === undefined) {
            // Если это новый комикс, обновим список комиксов
            navigation.navigate('Home'); // Возвращаемся на главный экран
        }
    }, [cells, nextCellId, comicId, title, description, navigation, route.params.comicId]);

    const handleAddCell = () => {
        const newCell = {
            id: nextCellId,
            width: width - 40, // на весь экран
            height: height / 2, // высота половины экрана
            textFrames: [],
        };
        setCells([...cells, newCell]);
        setNextCellId(nextCellId + 1);
    };

    const handleCellPress = (cellId) => {
        console.log("Cell Pressed", `Cell ID: ${cellId}`);
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

    const handleTextFrameChange = (cellId, frameId, newText, newWidth, newHeight, newX, newY) => {
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
                    x: newX !== undefined ? newX : updatedCells[cellIndex].textFrames[frameIndex].x,
                    y: newY !== undefined ? newY : updatedCells[cellIndex].textFrames[frameIndex].y,
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
    const handleDeleteCell = (cellId) => {
        const updatedCells = cells.filter(cell => cell.id !== cellId);
        setCells(updatedCells);
    };

    const handleMoveCell = (fromIndex, toIndex) => {
        const newCells = [...cells];
        const element = newCells.splice(fromIndex, 1)[0];
        newCells.splice(toIndex, 0, element);
        setCells(newCells);
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <ScrollView contentContainerStyle={styles.comicContainer}>
                <Text style={styles.comicTitle}>{title}</Text>
                <Text style={styles.comicDescription}>{description}</Text>

                {cells.map((cell, index) => (
                    <ComicCell
                        key={cell.id}
                        cellData={cell}
                        onCellPress={handleCellPress}
                        onTextFrameAdd={handleTextFrameAdd}
                        onTextFrameChange={handleTextFrameChange}
                        onCellResize={handleCellResize}
                        onDeleteCell={handleDeleteCell}
                        onMoveCell={handleMoveCell}
                    />
                ))}

                <Button title="Добавить ячейку" onPress={handleAddCell} />
            </ScrollView>
        </ImageBackground>
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
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
});

export default ComicScreen;