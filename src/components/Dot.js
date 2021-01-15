import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import {colors} from '../styles';
import {ACTIVE_DOT_SIZE, DOT_SIZE, NUMBER_HEIGHT} from '../config';

const Dot = ({mainOffsetY, index}) => {
  const width = mainOffsetY.y.interpolate({
    inputRange: [
      index > 0 ? (index - 1) * NUMBER_HEIGHT : -NUMBER_HEIGHT,
      index * NUMBER_HEIGHT,
      (index + 1) * NUMBER_HEIGHT,
    ],
    outputRange: [DOT_SIZE, ACTIVE_DOT_SIZE, DOT_SIZE],
  });
  const color = mainOffsetY.y.interpolate({
    inputRange: [
      index > 0 ? (index - 1) * NUMBER_HEIGHT : -NUMBER_HEIGHT,
      index * NUMBER_HEIGHT,
      (index + 1) * NUMBER_HEIGHT,
    ],
    outputRange: [colors.secondary, colors.white, colors.secondary],
    extrapolate: 'clamp',
  });
  return (
    <Animated.View
      style={[styles.dot, {width: width, backgroundColor: color}]}
    />
  );
};

export default Dot;

const styles = StyleSheet.create({
  dot: {
    minWidth: DOT_SIZE,
    minHeight: DOT_SIZE,
    maxWidth: ACTIVE_DOT_SIZE,
    borderRadius: 3,
    marginHorizontal: 3,
    backgroundColor: colors.secondary,
  },
});
