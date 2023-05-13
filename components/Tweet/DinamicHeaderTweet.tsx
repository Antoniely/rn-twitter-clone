import * as React from "react";
import { StyleSheet, Animated } from "react-native";
import { BlurView } from "expo-blur";
import { useTheme } from "@react-navigation/native";
import { Text, View } from "../Themed";
import Constants from "../../constants/Constants";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface DinamicHeaderTweetProps {
  headerTranslate: Animated.AnimatedInterpolation<string | number>;
  opacity?: Animated.AnimatedInterpolation<string | number>;
}

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const DinamicHeaderTweet = ({
  headerTranslate,
  opacity,
}: DinamicHeaderTweetProps) => {
  const router = useRouter();
  const isDark = useTheme().dark;

  return (
    <AnimatedBlurView
      intensity={40}
      tint={isDark ? "dark" : "light"}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 90,
        width: "100%",
        transform: [{ translateY: headerTranslate }],
      }}
    >
      <Animated.View
        style={[
          styles.mainContainer,
          { opacity, transform: [{ translateY: headerTranslate }] },
        ]}
      >
        <Animated.View style={styles.container}>
          <Ionicons
            name="arrow-back"
            size={26}
            color={isDark ? "white" : "black"}
            style={styles.backButtom}
            onPress={() => router.back()}
          />
          <Text style={styles.title}>Tweet</Text>
        </Animated.View>
      </Animated.View>
    </AnimatedBlurView>
  );
};

export default DinamicHeaderTweet;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-end",
  },
  container: {
    flex: 1,
    height: 50,
    flexDirection: "row",
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  backButtom: { position: "absolute", top: 16, left: 20 },
  title: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 10,
  },
});
