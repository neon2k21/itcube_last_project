// components/SizeHandle.js
import React from 'react';
import { View, StyleSheet, PanResponder, Animated, Text } from 'react-native';

const SizeHandle = ({ direction, onSizeChange }) => {
    const pan = new Animated.ValueXY();

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([
            null,
            { dx: direction === 'x' ? pan.x : 0, dy: direction === 'y' ? pan.y : 0 },
        ], { useNativeDriver: false }),
        onPanResponderRelease: () => {
            pan.setValue({ x: 0, y: 0 });
        },
    });

    pan.x.addListener(({ value }) => {
        if (direction === 'x') {
            onSizeChange(value, 0);
        }
    });

    pan.y.addListener(({ value }) => {
        if (direction === 'y') {
            onSizeChange(0, value);
        }
    });


    return (
        <View
            style={[
                styles.handle,
                direction === 'x' ? styles.xHandle : styles.yHandle,
            ]}
            {...panResponder.panHandlers}
        >
            {direction === 'x' && <Text style={styles.handleText}>↔</Text>}
            {direction === 'y' && <Text style={styles.handleText}>↕</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    handle: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    xHandle: {
        bottom: 0,
        left: 0,
        right: 0,
        height: 30, // Увеличиваем высоту
    },
    yHandle: {
        top: 0,
        right: 0,
        bottom: 0,
        width: 30, // Увеличиваем ширину
    },
    handleText: {
        color: 'white',
        fontSize: 20,
    },
});

export default SizeHandle;