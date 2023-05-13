import * as React from "react";
import { StyleSheet, Image, Pressable } from "react-native";
import { TweetType } from "../../types";
import { Entypo } from "@expo/vector-icons";

import IconButton from "../IconButton";
import { Link } from "expo-router";
import { Text, View } from "../Themed";

interface TweetProps {
  tweet: TweetType;
}

const Tweet = ({ tweet }: TweetProps) => {
  return (
    <Link href={`/tweet/${tweet.id}`} asChild>
      <Pressable style={styles.container}>
        <Image src={tweet.user.image} style={styles.userImage} />

        <View style={styles.mainContainer}>
          <View style={styles.headContainer}>
            <Text style={styles.name}>{tweet.user.name}</Text>
            <Text numberOfLines={1} style={styles.username}>{tweet.user.username}</Text>
            <Text style={styles.createdAt}>· 2h</Text>
            <Entypo
              name="dots-three-horizontal"
              size={16}
              color="grey"
              style={{ marginLeft: "auto" }}
            />
          </View>

          <Text style={styles.content}>{tweet.content}</Text>

          {tweet.image && <Image src={tweet.image} style={styles.image} />}

          <View style={styles.footer}>
            <IconButton icon="comment" text={tweet.numberOfComments} />
            <IconButton icon="retweet" text={tweet.numberOfRetweets} />
            <IconButton icon="heart" text={tweet.numberOfLikes} />
            <IconButton icon="chart" text={tweet.impressions || 0} />
            <IconButton icon="share-apple" />
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

export default Tweet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#2A2A2A",
  },
  mainContainer: {
    marginLeft: 10,
    flex: 1,
  },
  headContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    flexShrink: 1,
    color: "grey",
    marginLeft: 5,

  },
  createdAt: { 
    color: "grey",
    marginHorizontal: 10,
  },
  userImage: { width: 50, height: 50, borderRadius: 50 },
  name: {
    fontWeight: "700",
    fontSize: 16,
  },
  content: {
    lineHeight: 20,
    marginTop: 5,
    fontSize: 16,
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
    marginVertical: 10,
    borderRadius: 15,
  },

  //   footer
  footer: {
    flexDirection: "row",
    marginVertical: 5,
    justifyContent: "space-between",
  },
});
