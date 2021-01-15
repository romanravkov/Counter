import React from 'react';
import {Animated, Text, View, StyleSheet} from 'react-native';
import {colors} from '../styles';
import {NUMBER_HEIGHT, NUMBER_OFFSET} from '../config';

const Number = ({item, mainOffsetY, index}) => {
  return (
    <View style={styles.number}>
      {item.number.split('').map((el, i, arr) => {
        const translateY = mainOffsetY.y.interpolate({
          inputRange: [index * NUMBER_HEIGHT, (index + 1) * NUMBER_HEIGHT],
          outputRange: [0, -(i * NUMBER_OFFSET)],
        });
        return (
          <Animated.View
            key={el + i}
            style={{transform: [{translateY: translateY}]}}>
            <Text style={styles.numberText}>{el}</Text>
          </Animated.View>
        );
      })}
    </View>
  );
};

export default Number;

const styles = StyleSheet.create({
  number: {
    height: NUMBER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  numberText: {
    color: colors.white,
    fontSize: 48,
    fontWeight: '600',
  },
});
