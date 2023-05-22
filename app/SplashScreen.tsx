import { useEffect, useRef } from "react";
import { Image, StyleSheet, Animated } from "react-native";
import { View } from "../components/Themed";

import Svg, { Path } from "react-native-svg";

const AnimatedSVG = Animated.createAnimatedComponent(Svg);
const AnimatedPath = Animated.createAnimatedComponent(Path);

const SplashScreen = () => {
  const animationScale = useRef(new Animated.Value(0)).current;
  const animationColor = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animationScale, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.sequence([
        Animated.delay(500),
        Animated.timing(animationColor, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
      ])
    ]).start();
  }, []);

  const colorInterpolate = animationColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["#fff", "#000"],
    extrapolate: "clamp",

  });

  const zoomInterpolate = animationScale.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [80, 50, 3000],
    extrapolate: "clamp",

  });

  const opacityInterpolate = animationColor.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <Animated.View style={[styles.container]}>
      <AnimatedSVG
        xml-space="preserve"
        viewBox="0 0 248 204"
        width={zoomInterpolate}
        height={zoomInterpolate}
        // opacity={opacityInterpolate}
      >
        <AnimatedPath
          fill={colorInterpolate}
          d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07a50.338 50.338 0 0 0 22.8-.87C27.8 117.2 10.85 96.5 10.85 72.46v-.64a50.18 50.18 0 0 0 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71a143.333 143.333 0 0 0 104.08 52.76 50.532 50.532 0 0 1 14.61-48.25c20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26a50.69 50.69 0 0 1-22.2 27.93c10.01-1.18 19.79-3.86 29-7.95a102.594 102.594 0 0 1-25.2 26.16z"
        />
      </AnimatedSVG>
    </Animated.View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C9BF0",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 90,
    height: 90,
  },
});
