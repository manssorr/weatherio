import DEVICE from '@/constants/device';
import {Animated, Easing, EasingFunction, type ViewStyle} from 'react-native';

export type EasingAnimationType =
  | 'PredefinedBounce'
  | 'PredefinedEase'
  | 'PredefinedElastic'
  | 'StandardLinear'
  | 'StandardQuad'
  | 'StandardCubic'
  | 'AdditionalBezier'
  | 'AdditionalCircle'
  | 'AdditionalSin'
  | 'AdditionalExp'
  | 'CombinationsInBounce'
  | 'CombinationsOutExp'
  | 'CombinationsInOutElastic';
export const EasingAnimations: Record<EasingAnimationType, EasingFunction> = {
  // Predefined
  PredefinedBounce: Easing.bounce,
  PredefinedEase: Easing.ease,
  PredefinedElastic: Easing.elastic(4),

  // Standard
  StandardLinear: Easing.linear,
  StandardQuad: Easing.quad,
  StandardCubic: Easing.cubic,

  // Additional
  AdditionalBezier: Easing.bezier(0, 2, 1, -1),
  AdditionalCircle: Easing.circle,
  AdditionalSin: Easing.sin,
  AdditionalExp: Easing.exp,

  // Combinations
  CombinationsInBounce: Easing.in(Easing.bounce),
  CombinationsOutExp: Easing.out(Easing.exp),
  CombinationsInOutElastic: Easing.inOut(Easing.elastic(1)),
};

/**
 * Timing helper
 * @param from initial value default 0
 * @param to final value default 1
 * @param duration animation duration in ms default 1000
 * @param easing animation easing
 * @returns {Animated.CompositeAnimation} animation
 */

export const timing = (
  from: Animated.Value | Animated.ValueXY = new Animated.Value(0),
  to: number = 1,
  duration: number = 1000,
  easing: EasingAnimationType = 'StandardLinear',
): Animated.CompositeAnimation =>
  Animated.timing(from, {
    toValue: to,
    duration: duration,
    easing: EasingAnimations[easing],
    useNativeDriver: true,
  });

/**
 * Fade helper
 * @param duration animation duration default 1000
 * @param type fade "in" or "out" default "in"
 * @param mode animation mode default "ease"
 *
 * @returns {fadeAnimation} animation
 * @returns {opacityAnimatedValue} animated value
 */
export const useFade = (
  duration: number = 1000,
  type: 'in' | 'out' = 'in',
  easing: EasingAnimationType = 'PredefinedEase',
): {
  fadeAnimation: Animated.CompositeAnimation;
  opacityAnimatedValue: Animated.Value;
} => {
  const startingValue: number = type === 'in' ? 0 : 1;
  const endingValue: number = type === 'in' ? 1 : 0;

  const opacityAnimatedValue = new Animated.Value(startingValue);
  // Initial value for opacity: 0

  const fadeAnimation = Animated.timing(opacityAnimatedValue, {
    toValue: endingValue,
    duration: duration,
    easing: EasingAnimations[easing],
    useNativeDriver: true,
  });

  return {fadeAnimation, opacityAnimatedValue};
};

export const useButtonAnimation = (
  duration: number = 1000,
  type: 'in' | 'out' = 'in',
  easing: EasingAnimationType = 'PredefinedEase',
): {
  buttonAnimation: Animated.CompositeAnimation;
  animatedStyles: ViewStyle;
} => {
  const startingValue: number = type === 'in' ? 0 : 1;
  const endingValue: number = type === 'in' ? 1 : 0;

  const opacityAnimatedValue = new Animated.Value(startingValue);
  // Initial value for opacity: 0

  const buttonAnimation = Animated.timing(opacityAnimatedValue, {
    toValue: endingValue,
    duration: duration,
    easing: EasingAnimations[easing],
    useNativeDriver: false,
  });

  const scale = opacityAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const animatedStyles = {
    opacity: opacityAnimatedValue,
    transform: [{scale}],
  };

  return {buttonAnimation, animatedStyles};
};
