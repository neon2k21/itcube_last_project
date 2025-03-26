// components/ResizableView.js
import React, { useRef, useState, useEffect } from 'react';
import { View, PanResponder, Animated, ScrollView } from 'react-native';

const ResizableView = ({ width, height, onResize, children, style, disableScrollViewScrolling }) => {
    const pan = useRef(new Animated.ValueXY()).current;
    const [initialWidth, setInitialWidth] = useState(width);
    const [initialHeight, setInitialHeight] = useState(height);
    const [isResizing, setIsResizing] = useState(false);
    const scrollViewRef = useRef(null);

    useEffect(() => {
        setInitialWidth(width);
        setInitialHeight(height);
    }, [width, height]);

    const panResponder = React.useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: (evt, gestureState) => {
                setIsResizing(true);
                // Отключаем прокрутку ScrollView
                let node = evt.target;
                while (node) {
                    if (node.nodeName === 'RCTScrollView') {
                        scrollViewRef.current = node;
                        node.setNativeProps({ scrollEnabled: false });
                        break;
                    }
                    node = node.parentNode;
                }
            },
            onPanResponderMove: (evt, gestureState) => {
                const newWidth = initialWidth + gestureState.dx;
                const newHeight = initialHeight + gestureState.dy;
                onResize(newWidth > 50 ? newWidth : 50, newHeight > 50 ? newHeight : 50);
            },
            onPanResponderRelease: (evt) => {
                setIsResizing(false);
                // Восстанавливаем прокрутку ScrollView
                if (scrollViewRef.current) {
                    scrollViewRef.current.setNativeProps({ scrollEnabled: true });
                    scrollViewRef.current = null;
                }
            },
            onPanResponderTerminate: (evt) => {
                setIsResizing(false);
                // Восстанавливаем прокрутку ScrollView
                if (scrollViewRef.current) {
                    scrollViewRef.current.setNativeProps({ scrollEnabled: true });
                    scrollViewRef.current = null;
                }
            },
        })
    ).current;

    return (
        <View
            {...panResponder.panHandlers}
            style={[
                { width, height, position: 'relative' },
                style,
            ]}
        >
            {children}
            {isResizing && (
                <View style={{ position: 'absolute', bottom: 0, right: 0, width: 20, height: 20, backgroundColor: 'lightgray', borderRadius: 10 }} />
            )}
        </View>
    );
};

export default ResizableView;