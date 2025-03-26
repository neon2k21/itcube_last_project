// components/ResizableView.js
import React, { useRef, useState, useEffect } from 'react';
import { View, PanResponder, Animated } from 'react-native';

const ResizableView = ({ width, height, onResize, children, style }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const [initialWidth, setInitialWidth] = useState(width);
  const [initialHeight, setInitialHeight] = useState(height);
  const [isResizing, setIsResizing] = useState(false);

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
      },
      onPanResponderMove: (evt, gestureState) => {
        const newWidth = initialWidth + gestureState.dx;
        const newHeight = initialHeight + gestureState.dy;
        onResize(newWidth > 50 ? newWidth : 50, newHeight > 50 ? newHeight : 50); // Минимальный размер 50x50
      },
      onPanResponderRelease: () => {
        setIsResizing(false);
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