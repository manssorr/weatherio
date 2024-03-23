import {useEffect, useRef} from 'react';
import {Animated, Easing} from 'react-native';
import {timing, type EasingAnimationType} from './helpersAmin';

/**
 * Rotate helper
 * @param {number} value rotation value default 10
 * @param {number} duration animation duration default 1000
 *  @param {EasingAnimationType} easing  animation easing
 *
 * @returns {spin} animation
 */

const useSmoothIconAnimation = (
  value: number = 10,
  duration: number = 1000,
  easing: EasingAnimationType = 'StandardLinear',
): Animated.AnimatedInterpolation<number> => {
  // Use useRef to store the animated value to persist it through re-renders
  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        // Move up from 0 to 10
        timing(rotateValue, value, duration / 2, easing),

        // Move down from value to -value
        timing(rotateValue, -value, duration, easing),
        // Move up from 0 to value
        timing(rotateValue, value, duration, easing),

        // Move down from value to -value
        timing(rotateValue, -value, duration, easing),
        // Move up from 0 to value
        timing(rotateValue, value, duration, easing),

        // Move down from value to -value
        timing(rotateValue, -value, duration, easing),
        // Move up from 0 to value
        timing(rotateValue, value, duration, easing),

        // Move down from value to -value
        timing(rotateValue, -value, duration, easing),

        // Return to 0 from -value
        timing(rotateValue, 0, duration / 2, easing),
      ]),
      {
        resetBeforeIteration: true,
        iterations: Infinity,
      },
      // Loop forever
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [duration, easing, rotateValue, value]);

  const spin: Animated.AnimatedInterpolation<number> = rotateValue.interpolate({
    inputRange: [-value, 0, value],
    outputRange: [`-${value}deg`, '0deg', `${value}deg`],
  });

  return spin;
};

export default useSmoothIconAnimation;
