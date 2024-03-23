import React, {useRef, useEffect} from 'react';
import {Animated, Text, View} from 'react-native';
import type {PropsWithChildren} from 'react';
import type {ViewStyle} from 'react-native';
import {useFade} from '../style/Animations/helpersAmin';

type FadeInViewProps = PropsWithChildren<{style: ViewStyle; duration: number}>;

const FadeInView: React.FC<FadeInViewProps> = ({
  children,
  style,
  duration = 1000,
}) => {
  const {fadeAnimation, opacityAnimatedValue} = useFade(
    duration,
    'in',
    'PredefinedBounce',
  );

  useEffect(() => {
    fadeAnimation.start();
  }, [fadeAnimation]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...style,
        opacity: opacityAnimatedValue, // Bind opacity to animated value
      }}>
      {children}
    </Animated.View>
  );
};

export default FadeInView;
