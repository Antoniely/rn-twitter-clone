import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import { Text, View } from "../Themed";

const TweetSkeleton = () => {
  const opacity = new Animated.Value(0.5);

  useEffect(() => {
    Animated.loop(
      Animated.timing(opacity, {
        toValue: 1,
        duration: 2000,
        easing: Easing.bounce,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.avatar, { opacity }]} />

      <View style={styles.mainContainer}>
        <Animated.View style={[styles.name, { opacity }]} />
        <Animated.View style={[styles.title, { opacity }]} />
        <Animated.View style={[styles.title, { opacity }]} />
        <Animated.View style={[styles.titleShort, { opacity }]} />

        <Animated.View style={[styles.image, { opacity }]} />

        <View style={styles.buttonContainer}>
          <Animated.View style={[styles.button, { opacity }]} />
          <Animated.View style={[styles.button, { opacity }]} />
          <Animated.View style={[styles.button, { opacity }]} />
          <Animated.View style={[styles.button, { opacity }]} />
        </View>
      </View>
    </View>
  );
};

export default TweetSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#2A2A2A",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#484848",
  },
  mainContainer: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    height: 12,
    width: "50%",
    backgroundColor: "#484848",
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    marginBottom: 20,
  },
  title: {
    height: 12,
    width: "100%",
    backgroundColor: "#484848",
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    marginBottom: 4,
  },
  titleShort: {
    height: 12,
    width: "30%",
    backgroundColor: "#484848",
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    marginBottom: 20,
  },
  image: {
    height: 150,
    width: "100%",
    backgroundColor: "#484848",
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 14,
    alignItems: "center",
  },
  button: {
    height: 12,
    width: "15%",
    backgroundColor: "#484848",
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
});
