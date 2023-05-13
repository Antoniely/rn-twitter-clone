import { Animated, StyleSheet } from "react-native";
import { useEffect, useRef } from "react";

import TweetDetail from "../../components/Tweet/TweetDetail";
import tweets from "../../assets/data/tweets";

import { useSearchParams } from "expo-router";
import { Text, View } from "../../components/Themed";
import DinamicHeaderTweet from "../../components/Tweet/DinamicHeaderTweet";

const CONTAINER_HEIGHT = 90;

export default function TweetScreen() {
  const { id } = useSearchParams();
  const scrollY = useRef(new Animated.Value(0)).current;
  const offsetAnim = useRef(new Animated.Value(0)).current;
  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollY.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: 'clamp',
      }),
      offsetAnim,
    ),
    0,
    CONTAINER_HEIGHT
  )
  var _clampedScrollValue = 0;
  var _offsetValue = 0;
  var _scrollValue = 0;

  useEffect(() => {
    scrollY.addListener(({ value }) => {
      const diff = value - _scrollValue;
      _scrollValue = value;
      _clampedScrollValue = Math.min(
        Math.max(_clampedScrollValue + diff, 0),
        CONTAINER_HEIGHT,
      )
    });
    offsetAnim.addListener(({ value }) => {
      _offsetValue = value;
    })
  }, []);

  const headerTranslate = clampedScroll.interpolate({
    inputRange: [0, CONTAINER_HEIGHT],
    outputRange: [0, -(CONTAINER_HEIGHT - 50) ],
    extrapolate: 'clamp',
  })

  const opacity = clampedScroll.interpolate({
    inputRange: [0, CONTAINER_HEIGHT - 20, CONTAINER_HEIGHT],
    outputRange: [1, 0.05, 0],
    extrapolate: 'clamp',
  })

  const tweet = tweets.find((t) => t.id === id);

  if (!tweet) {
    return <Text>Tweet {id} not found!</Text>;
  }

  return (
    <View style={styles.page}>
      <TweetDetail tweet={tweet} scrollY={scrollY} />
      <DinamicHeaderTweet headerTranslate={headerTranslate} opacity={opacity} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});
