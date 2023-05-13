import { BlurView } from "expo-blur";
import { useRef } from "react";
import { StyleSheet, Animated, Image, TouchableOpacity } from "react-native";
import { Text, View } from "./Themed";
import { useTheme } from "@react-navigation/native";

const AVATAR = require("../assets/images/avatar.png");
const TWITTER = require("../assets/images/twitter.png");

enum TITLETAB {
  FOR_YOU = "Para ti",
  FOLLOWING = "Siguiendo",
}

interface DinamicHeaderProps {
  headerTranslate: Animated.AnimatedInterpolation<string | number>;
  opacity: Animated.AnimatedInterpolation<string | number>;
}

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const DinamicHeader = ({ headerTranslate, opacity }: DinamicHeaderProps) => {
  const isDark = useTheme().dark;
  // const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <AnimatedBlurView
      intensity={40}
      tint={isDark ? "dark" : "light"}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 135,
        width: "100%",
        transform: [{ translateY: headerTranslate }],
      }}
    >
      <Animated.View
        style={[
          styles.mainContainer,
          { transform: [{ translateY: headerTranslate }] },
        ]}
      >
        <Animated.View style={[styles.container, { opacity }]}>
          <View style={styles.images}>
            <Image source={AVATAR} style={styles.avatar} />
            <Image source={TWITTER} style={styles.twitter} />
          </View>
          <View style={styles.tab}>
            <View style={styles.forYou}>
              <TouchableOpacity>
                <Text style={styles.textTab}>{TITLETAB.FOR_YOU}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.following}>
              <TouchableOpacity>
                <Text style={styles.textTab}>{TITLETAB.FOLLOWING}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.indicator} />
          </View>
        </Animated.View>
      </Animated.View>
    </AnimatedBlurView>
  );
};

export default DinamicHeader;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
    borderColor: "#2A2A2A",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  container: {
    flex: 1,
  },
  images: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    flex: 1.8,
    paddingHorizontal: 20
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 50,
  },
  twitter: {
    width: 32,
    height: 32,
    marginLeft: "38%",
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    height: 40,
    // position: 'relative'
  },
  forYou: {
    height: "100%",
    width: "50%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  following: {
    height: "100%",
    width: "50%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  textTab: {
    fontWeight: "bold",
    // color: "lightgrey",
    fontSize: 16,
    paddingBottom: 12,
  },
  indicator: {
    position: "absolute",
    width: 50,
    left: 72,
    bottom: 0,
    borderColor: "#1C9BF0",
    borderBottomWidth: 3,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
});
