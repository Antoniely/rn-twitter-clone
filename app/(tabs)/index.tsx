import { Animated, FlatList, Pressable, StyleSheet } from "react-native";
import { View } from "../../components/Themed";
import { useEffect, useRef, useState } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import Tweet from "../../components/Tweet/Tweet";
import tweets from "../../assets/data/tweets";
import { Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";

import DinamicHeader from "../../components/DinamicHeader";

import Constants from "../../constants/Constants";
import TweetSkeleton from "../../components/Tweet/TweetSkeleton";

const { CONTAINER_HEIGHT } = Constants;

export default function TabOneScreen() {
  const [loading, setLoading] = useState(true);

  const tabBarHeight = useBottomTabBarHeight();

  const scrollY = useRef(new Animated.Value(0)).current;
  const offsetAnim = useRef(new Animated.Value(0)).current;
  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollY.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: "clamp",
      }),
      offsetAnim
    ),
    0,
    CONTAINER_HEIGHT
  );
  var _clampedScrollValue = 0;
  var _offsetValue = 0;
  var _scrollValue = 0;

  useEffect(() => {
    scrollY.addListener(({ value }) => {
      const diff = value - _scrollValue;
      _scrollValue = value;
      _clampedScrollValue = Math.min(
        Math.max(_clampedScrollValue + diff, 0),
        CONTAINER_HEIGHT
      );
    });
    offsetAnim.addListener(({ value }) => {
      _offsetValue = value;
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, []);

  var scrollEndTimer: any = null;

  const onMomentumScrollBegin = () => {
    clearTimeout(scrollEndTimer);
  };
  const onMomentumScrollEnd = () => {
    const toValue =
      _scrollValue > CONTAINER_HEIGHT &&
      _clampedScrollValue > CONTAINER_HEIGHT / 2
        ? _offsetValue + CONTAINER_HEIGHT
        : _offsetValue - CONTAINER_HEIGHT;

    Animated.timing(offsetAnim, {
      toValue,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  const onScrollEndDrag = () => {
    scrollEndTimer = setTimeout(onMomentumScrollEnd, 250);
  };

  const headerTranslate = clampedScroll.interpolate({
    inputRange: [0, CONTAINER_HEIGHT],
    outputRange: [0, -(CONTAINER_HEIGHT - 50)],
    extrapolate: "clamp",
  });

  const opacity = clampedScroll.interpolate({
    inputRange: [0, CONTAINER_HEIGHT - 20, CONTAINER_HEIGHT],
    outputRange: [1, 0.05, 0],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.page}>
      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEnabled={!loading}
        scrollEventThrottle={1}
        keyExtractor={(item, index) => (!loading ? item.id : index)}
        contentContainerStyle={[
          styles.contentContainerStyle,
          { paddingBottom: tabBarHeight },
        ]}
        data={!loading ? tweets : Array(5)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) =>
          !loading ? <Tweet tweet={item} /> : <TweetSkeleton />
        }
        onMomentumScrollBegin={onMomentumScrollBegin}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScrollEndDrag={onScrollEndDrag}
      />
      <DinamicHeader headerTranslate={headerTranslate} opacity={opacity} />

      <Link
        href="/new-tweet"
        asChild
        style={[styles.floatingButton, { bottom: tabBarHeight + 10 }]}
      >
        <Pressable>
          <Entypo name="plus" size={22} color="white" />
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingTop: CONTAINER_HEIGHT,
    marginTop: 8,
  },
  floatingButton: {
    backgroundColor: "#1C9BF0",
    borderRadius: 25,
    padding: 15,

    position: "absolute",
    right: 15,
    // bottom: 15,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
});
