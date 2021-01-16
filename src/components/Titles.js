import React, {useState} from 'react';
import {
  Animated,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../styles';
import {CONTAINER_PADDING_HORIZONTAL, NUMBER_HEIGHT} from '../config';

const Titles = ({mainOffsetY, data, onPressTitle = () => {}}) => {
  const [titlesWidth, setTitlesWidth] = useState(data.map(() => 0));

  const inputRange = data.map((_, i) => i * NUMBER_HEIGHT);
  const outputRange = titlesWidth.map(
    (el, i) =>
      titlesWidth.reduce((acc, val, ind) => {
        return ind < i ? acc - val : acc;
      }, Dimensions.get('screen').width / 2 - CONTAINER_PADDING_HORIZONTAL) -
      el / 2,
  );
  const translateTitles = mainOffsetY.y.interpolate({
    inputRange: inputRange,
    outputRange: outputRange,
  });
  return (
    <Animated.View
      style={[
        styles.titlesItemsContainer,
        {
          transform: [
            {
              translateX: translateTitles,
            },
          ],
        },
      ]}>
      {data.map((el, i) => {
        return (
          <TouchableOpacity
            onLayout={(e) => {
              e.persist();
              if (e.nativeEvent) {
                setTitlesWidth((old) => {
                  let newData = [...old];
                  newData[i] = e.nativeEvent.layout.width;
                  return newData;
                });
              }
            }}
            onPress={() => onPressTitle(i)}
            key={el.id}
            style={styles.titleItem}>
            <Text style={styles.titleItemText}>{el.title}</Text>
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
};

export default Titles;

const styles = StyleSheet.create({
  titlesItemsContainer: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'visible',
    justifyContent: 'flex-start',
  },
  titleItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  titleItemText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
