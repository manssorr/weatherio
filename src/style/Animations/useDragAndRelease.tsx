import {useRef} from 'react';
import {
  Animated,
  PanResponder,
  PanResponderInstance,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';

// Define a type for the hook's return value for better type safety
type UseDragAndReleaseReturn = {
  panResponder: PanResponderInstance;
  pan: Animated.ValueXY;
};

export const useDragAndRelease = (): UseDragAndReleaseReturn => {
  const pan = useRef(new Animated.ValueXY()).current;

  // Setup the panResponder
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event(
        [null, {dx: pan.x, dy: pan.y}],
        {useNativeDriver: false}, // Use native driver for better performance
      ),
      onPanResponderRelease: (
        e: GestureResponderEvent,
        state: PanResponderGestureState,
      ) => {
        pan.flattenOffset(); // Apply the offset as a permanent value and reset offset to zero
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          friction: 5, // Adjust the friction to control the "bounciness" of the spring
          useNativeDriver: true,
        }).start();
      },
    }),
  ).current;

  return {panResponder, pan};
};
