// components/ComicCell.js
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, PanResponder, Animated, TouchableOpacity, TextInput, Alert } from 'react-native';
import ResizableView from './ResizableView';
import SizeHandle from './SizeHandle';
import Draggable from './Draggable';

const ComicCell = ({ cellData, onCellPress, onTextFrameAdd, onTextFrameChange, onCellResize, onDeleteCell, onMoveCell }) => {
    const { id, width, height, textFrames } = cellData;
    const [localWidth, setLocalWidth] = useState(width || 300);
    const [localHeight, setLocalHeight] = useState(height || 300);
    const [localTextFrames, setLocalTextFrames] = useState(textFrames || []);
    const [isResizingCell, setIsResizingCell] = useState(false);
    const [selectedTextFrame, setSelectedTextFrame] = useState(null);
    const longPressTimeout = useRef(null);


    useEffect(() => {
        setLocalTextFrames(textFrames || []);
    }, [textFrames]);

    const handleResize = (newWidth, newHeight) => {
        setLocalWidth(newWidth);
        setLocalHeight(newHeight);
        onCellResize(id, newWidth, newHeight);
    };

    const handleTextFramePress = () => {
        onTextFrameAdd(id);
    };

    const handleTextChange = (frameId, newText) => {
        onTextFrameChange(id, frameId, newText);
    };

    const handleTextFrameMove = (frameId, dx, dy) => {
        const frameIndex = localTextFrames.findIndex(frame => frame.id === frameId);
        if (frameIndex !== -1) {
            const updatedTextFrames = [...localTextFrames];
            updatedTextFrames[frameIndex] = {
                ...updatedTextFrames[frameIndex],
                x: updatedTextFrames[frameIndex].x + dx,
                y: updatedTextFrames[frameIndex].y + dy,
            };
            setLocalTextFrames(updatedTextFrames);
            onTextFrameChange(id, frameId, updatedTextFrames[frameIndex].text, updatedTextFrames[frameIndex].width, updatedTextFrames[frameIndex].height, updatedTextFrames[frameIndex].x + dx, updatedTextFrames[frameIndex].y + dy);
        }
    };

    const handleCellLongPress = () => {
        Alert.alert(
            "Действия с ячейкой",
            "Выберите действие",
            [
                {
                    text: "Удалить",
                    onPress: () => onDeleteCell(id),
                },
                {
                    text: "Отмена",
                    style: "cancel",
                },
            ],
            { cancelable: true }
        );
    };

    const handleCellPressIn = () => {
        longPressTimeout.current = setTimeout(() => {
            handleCellLongPress();
        }, 1000); // 1 секунда
    };

    const handleCellPressOut = () => {
        clearTimeout(longPressTimeout.current);
    };

    const handleSizeChange = (deltaX, deltaY) => {
        const newWidth = localWidth + deltaX;
        const newHeight = localHeight + deltaY;
        setLocalWidth(newWidth);
        setLocalHeight(newHeight);
        onCellResize(id, newWidth, newHeight);
    };

    return (
        <View style={{ margin: 10 }}>
            <TouchableOpacity
                style={{
                    width: localWidth,
                    height: localHeight,
                    backgroundColor: 'skyblue',
                    borderWidth: 1,
                    borderColor: 'gray',
                    overflow: 'hidden',
                }}
                onPressIn={handleCellPressIn}
                onPressOut={handleCellPressOut}
                onPress={() => {
                    if (!isResizingCell) {
                        onCellPress(id);
                        setIsResizingCell(!isResizingCell);
                    }
                }}
            >
                {localTextFrames && localTextFrames.map((frame) => (
                    <Draggable
                        key={frame.id}
                        onDragStart={() => setSelectedTextFrame(frame.id)}
                        onDragEnd={() => setSelectedTextFrame(null)}
                        onDrag={(dx, dy) => handleTextFrameMove(frame.id, dx, dy)}
                    >
                        <View
                            style={[
                                styles.textFrame,
                                {
                                    left: frame.x,
                                    top: frame.y,
                                    width: frame.width,
                                    height: frame.height,
                                    position: 'absolute',
                                    backgroundColor: 'white',
                                    borderColor: selectedTextFrame === frame.id ? 'blue' : 'black', // Выделение
                                    borderWidth: 1,
                                }
                            ]}
                        >
                            <TextInput
                                style={{ flex: 1, textAlign: 'center', fontSize: 14 }}
                                value={frame.text}
                                onChangeText={(text) => handleTextChange(frame.id, text)}
                                multiline={true}
                            />
                        </View>
                    </Draggable>
                ))}

                <TouchableOpacity style={styles.addTextFrameButton} onPress={handleTextFramePress}>
                    <Text>Add Text Frame</Text>
                </TouchableOpacity>

                {isResizingCell && (
                    <>
                        <SizeHandle direction="x" onSizeChange={handleSizeChange} />
                        <SizeHandle direction="y" onSizeChange={handleSizeChange} />
                    </>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    cell: {
        borderWidth: 1,
        borderColor: 'gray',
        margin: 10,
        overflow: 'hidden',
    },
    textFrame: {
        borderWidth: 1,
        borderColor: 'black',
    },
    addTextFrameButton: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: 'lightgray',
        padding: 5,
        borderRadius: 5,
    },
});

export default ComicCell;