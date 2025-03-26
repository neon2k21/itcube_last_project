// components/ComicCell.js
import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, PanResponder, Animated, TouchableOpacity, TextInput } from 'react-native';
import ResizableView from './ResizableView';

const ComicCell = ({ cellData, onCellPress, onTextFrameAdd, onTextFrameChange, onCellResize }) => {
    const { id, width, height, textFrames } = cellData;
    const [localWidth, setLocalWidth] = useState(width || 150);
    const [localHeight, setLocalHeight] = useState(height || 150);
    const [editingTextFrame, setEditingTextFrame] = useState(null); // Для редактирования текста

    const handleResize = (newWidth, newHeight) => {
        setLocalWidth(newWidth);
        setLocalHeight(newHeight);
        onCellResize(id, newWidth, newHeight); // Сообщаем ComicScreen об изменении размера
    };

    const handleTextFramePress = () => {
        onTextFrameAdd(id);
    };

    const handleTextChange = (frameId, newText) => {
        onTextFrameChange(id, frameId, newText); // Сообщаем ComicScreen об изменении текста
    };

    return (
        <TouchableOpacity onPress={() => onCellPress(id)} style={{ margin: 10 }}>
            <ResizableView
                width={localWidth}
                height={localHeight}
                onResize={handleResize}
                style={{ backgroundColor: 'skyblue', borderWidth: 1, borderColor: 'gray', overflow: 'hidden' }}
            >
                {textFrames && textFrames.map((frame) => (
                  <ResizableView
                    key={frame.id}
                    width={frame.width}
                    height={frame.height}
                    onResize={(newWidth, newHeight) => {
                        onTextFrameChange(id, frame.id, frame.text, newWidth, newHeight);  //Сообщаем об изменении размера текстовой рамки
                    }}
                    style={[
                        styles.textFrame,
                        { left: frame.x, top: frame.y, position: 'absolute', backgroundColor: 'white' }
                    ]}
                  >
                    <TextInput
                      style={{ flex: 1, textAlign: 'center', fontSize: 14 }} // добавьте стили для текста
                      value={frame.text}
                      onChangeText={(text) => handleTextChange(frame.id, text)}
                      multiline={true}
                    />
                  </ResizableView>
                ))}

                <TouchableOpacity style={styles.addTextFrameButton} onPress={handleTextFramePress}>
                    <Text>Add Text Frame</Text>
                </TouchableOpacity>
            </ResizableView>
        </TouchableOpacity>
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
        //position: 'absolute', // Убрал здесь, чтобы позиционирование шло через props
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