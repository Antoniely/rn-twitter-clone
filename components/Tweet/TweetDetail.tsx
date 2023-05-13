import * as React from "react";
import { Animated, Image, ScrollView, StyleSheet } from "react-native";
import { TweetType } from "../../types";
import { Text, View } from "../Themed";
import { Entypo } from "@expo/vector-icons";
import Separator from "../Separator";
import StatisticsTweet from "./StatisticsTweet";

interface TweetDetailProps {
  tweet: TweetType;
  scrollY: Animated.Value;
}

const TweetDetail = ({ tweet, scrollY }: TweetDetailProps) => {
  return (
    <Animated.ScrollView
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      scrollEventThrottle={16}
      style={styles.mainContainer}
    >
      <View style={styles.gap}>
        <View style={styles.userContainer}>
          {/* @ts-ignore */}
          <Image src={tweet.user.image} style={styles.userImage} />
          <View style={styles.titleContainer}>
            <Text style={styles.name}>{tweet.user.name}</Text>
            <Text style={styles.username}>{tweet.user.username}</Text>
          </View>
          <Entypo
            name="dots-three-horizontal"
            size={16}
            color="lightgrey"
            style={{ marginLeft: "auto" }}
          />
        </View>

        <Text style={styles.content}>{tweet.content}</Text>
        {/* @ts-ignore */}
        {tweet.image && <Image src={tweet.image} style={styles.image} />}

        <StatisticsTweet tweet={tweet} />

      </View>
      <Separator />
    </Animated.ScrollView>
  );
};

export default TweetDetail;

const styles = StyleSheet.create({
  mainContainer: {
    // paddingTop: 90,
    // marginTop: 8,
  },
  gap: {
    paddingTop: 110,
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 20,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: { width: 50, height: 50, borderRadius: 50 },
  titleContainer: {
    marginLeft: 5,
  },
  name: {
    fontWeight: "700",
    fontSize: 16,
  },
  username: {
    color: "grey",
    fontSize: 16,
  },
  content: {
    lineHeight: 22,
    marginTop: 5,
    fontSize: 18,
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
    marginVertical: 10,
    borderRadius: 15,
  },
});
