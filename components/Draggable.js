// components/Draggable.js
import React, { useRef } from 'react';
import { Animated, PanResponder } from 'react-native';

const Draggable = ({ children, onDrag, onDragStart, onDragEnd }) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      pan.setOffset({
        x: pan.x._value,
        y: pan.y._value
      });
      pan.setValue({ x: 0, y: 0 });
      onDragStart && onDragStart();
    },
    onPanResponderMove: Animated.event(
      [
        null,
        { dx: pan.x, dy: pan.y }
      ],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: () => {
      onDragEnd && onDragEnd();
      pan.flattenOffset();
      onDrag(pan.x._value, pan.y._value);
    },
    onPanResponderTerminate: () => {
      onDragEnd && onDragEnd();
      pan.flattenOffset();
    },
  });

  return (
    <Animated.View
      style={{
        transform: [{ translateX: pan.x }, { translateY: pan.y }]
      }}
      {...panResponder.panHandlers}
    >
      {children}
    </Animated.View>
  );
};

export default Draggable;