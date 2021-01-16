import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  Animated,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {colors} from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {CONTAINER_PADDING_HORIZONTAL, NUMBER_HEIGHT} from './config';
import Dot from './components/Dot';
import Number from './components/Number';
import Titles from './components/Titles';

const data = [
  {
    title: 'Mindful minutesr',
    number: '8888',
    id: '1',
  },
  {
    title: 'Current streak',
    number: '1',
    id: '2',
  },
  {
    title: 'Longest streak',
    number: '20',
    id: '3',
  },
  {
    title: 'Episode completed',
    number: '100',
    id: '4',
  },
  {
    title: 'Episode completed',
    number: '100',
    id: '5',
  },
];

const Main = () => {
  const numbersScrollRef = useRef();
  const [mainOffsetY] = useState(new Animated.ValueXY({x: 0, y: 0}));

  const handleOnPressTitle = (index) => {
    numbersScrollRef.current.scrollToIndex({
      animated: true,
      index: index,
      viewPosition: 0.5,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.contentWrapper}>
          <View>
            <LinearGradient
              colors={[colors.bg, colors.bgOpacity]}
              start={{y: 0.1, x: 0}}
              end={{y: 1, x: 0}}
              style={styles.numbersTopGradient}
            />
            <Animated.FlatList
              ref={numbersScrollRef}
              style={styles.numbersWrapper}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: mainOffsetY.y,
                      },
                    },
                  },
                ],
                {
                  useNativeDriver: false,
                },
              )}
              pagingEnabled
              scrollEventThrottle={16}
              data={data}
              keyExtractor={(item, index) => item.id + index}
              renderItem={({item, index}) => (
                <Number mainOffsetY={mainOffsetY} index={index} item={item} />
              )}
            />
            <LinearGradient
              colors={[colors.bgOpacity, colors.bg]}
              start={{y: 0.2, x: 0}}
              end={{y: 0.9, x: 0}}
              style={styles.numbersBottomGradient}
            />
          </View>

          <View style={styles.titlesWrapper}>
            <LinearGradient
              colors={[colors.bg, colors.bgOpacity]}
              start={{x: 0.2, y: 0}}
              end={{x: 0.8, y: 0}}
              style={styles.titlesLeftGradient}
            />
            <Titles
              data={data}
              mainOffsetY={mainOffsetY}
              onPressTitle={handleOnPressTitle}
            />
            <LinearGradient
              colors={[colors.bgOpacity, colors.bg]}
              start={{x: 0.2, y: 0}}
              end={{x: 0.8, y: 0}}
              style={styles.titlesRightGradient}
            />
          </View>

          <View style={styles.dotsWrapper}>
            {data.map((el, index) => {
              return (
                <Dot mainOffsetY={mainOffsetY} index={index} key={el.id} />
              );
            })}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.bg,
    paddingHorizontal: CONTAINER_PADDING_HORIZONTAL,
    paddingTop: 200,
  },
  contentWrapper: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.secondary,
  },
  numbersWrapper: {
    height: NUMBER_HEIGHT,
  },

  titlesWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  dotsWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 24,
  },

  titlesLeftGradient: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
    width: 30,
  },
  titlesRightGradient: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
    width: 30,
  },
  numbersTopGradient: {
    position: 'absolute',
    right: 0,
    top: 0,
    left: 0,
    zIndex: 1,
    height: 20,
  },
  numbersBottomGradient: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 1,
    height: 20,
  },
});

export default Main;
