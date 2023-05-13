// import { StyleSheet, TouchableOpacity } from "react-native";
// import React, { useRef } from "react";
// import { Text, View } from "../components/Themed";
// import PagerView from "react-native-pager-view";

// export default function NewTweet() {
//   const pageRef = useRef<PagerView>(null);
//   //user setPage
//   return (
//     <View style={{ flex: 1 }}>
//       <View style={{ height: 50, flexDirection: "row" }}>
//         <TouchableOpacity
//         onPress={() => pageRef?.current?.setPage(0)}
//           style={{
//             backgroundColor: "green",
//             flex: 1,
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <Text>Pagina 1</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//         onPress={() => pageRef?.current?.setPage(1)}
//           style={{
//             backgroundColor: "yellow",
//             flex: 1,
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <Text>Pagina 2</Text>
//         </TouchableOpacity>
//       </View>
//       <PagerView style={styles.viewPager} initialPage={0} ref={pageRef}>
//         <View style={styles.page} key="1">
//           <Text>First page</Text>
//           <Text>Swipe ➡️</Text>
//         </View>
//         <View style={styles.page} key="2">
//           <Text>Second page</Text>
//         </View>
//       </PagerView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   viewPager: {
//     flex: 1,
//   },
//   page: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Animated,
  Dimensions,
} from 'react-native';
import PagerView, {
  PagerViewOnPageScrollEventData,
} from 'react-native-pager-view';

import {
  ScalingDot,
  SlidingBorder,
  ExpandingDot,
  SlidingDot,
} from 'react-native-animated-pagination-dots';
import { Text, View } from '../components/Themed';

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const INTRO_DATA = [
  {
    key: '1',
    title: 'App showcase ✨',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    key: '2',
    title: 'Introduction screen 🎉',
    description:
      "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. ",
  },
  {
    key: '3',
    title: 'And can be anything 🎈',
    description:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ',
  },
  {
    key: '4',
    title: 'And can be anything 🎈',
    description:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ',
  },
];

export default function NewTweet() {
  const width = Dimensions.get('window').width;
  const ref = React.useRef<PagerView>(null);
  const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const inputRange = [0, INTRO_DATA.length];
  const scrollX = Animated.add(
    scrollOffsetAnimatedValue,
    positionAnimatedValue
  ).interpolate({
    inputRange,
    outputRange: [0, INTRO_DATA.length * width],
  });

  const onPageScroll = React.useMemo(
    () =>
      Animated.event<PagerViewOnPageScrollEventData>(
        [
          {
            nativeEvent: {
              offset: scrollOffsetAnimatedValue,
              position: positionAnimatedValue,
            },
          },
        ],
        {
          useNativeDriver: false,
        }
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <SafeAreaView style={styles.flex}>
      <AnimatedPagerView
        initialPage={0}
        ref={ref}
        style={styles.PagerView}
        onPageScroll={onPageScroll}
      >
        {INTRO_DATA.map(({ key }) => (
          <View key={key} style={styles.center}>
            <Text style={styles.text}>{`Page Index: ${key}`}</Text>
          </View>
        ))}
      </AnimatedPagerView>
      <View style={styles.dotsContainer}>
        <View style={styles.dotContainer}>
          <Text>Expanding Dot</Text>
          <ExpandingDot
            data={INTRO_DATA}
            expandingDotWidth={30}
            //@ts-ignore
            scrollX={scrollX}
            
            inActiveDotOpacity={0.6}
            dotStyle={{
              width: 10,
              height: 10,
              backgroundColor: '#347af0',
              borderRadius: 5,
              marginHorizontal: 5,
            }}
            containerStyle={{
              top: 30,
            }}
          />
        </View>
        <View style={styles.dotContainer}>
          <Text>Scaling Dot</Text>
          <ScalingDot
            data={INTRO_DATA}
            //@ts-ignore
            scrollX={scrollX}
            containerStyle={{
              top: 30,
            }}
          />
        </View>

        <View style={styles.dotContainer}>
          <Text>Sliding Border</Text>
          <SlidingBorder
            containerStyle={{ top: 30 }}
            data={INTRO_DATA}
            //@ts-ignore
            scrollX={scrollX}
            dotSize={24}
          />
        </View>
        <View style={styles.dotContainer}>
          <Text>Sliding Dot</Text>
          <SlidingDot
            marginHorizontal={3}
            containerStyle={{ top: 30 }}
            data={INTRO_DATA}
            //@ts-ignore
            scrollX={scrollX}
            dotSize={12}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  PagerView: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#63a4ff',
  },
  progressContainer: { flex: 0.1, backgroundColor: '#63a4ff' },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 30,
  },
  separator: {
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  touchableTitle: {
    textAlign: 'center',
    color: '#000',
  },
  touchableTitleActive: {
    color: '#fff',
  },
  dotsContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  dotContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  contentSlider: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  dots: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 310,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
  },
});