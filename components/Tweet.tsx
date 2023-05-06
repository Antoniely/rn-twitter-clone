import * as React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { TweetType } from "../types";
import { Entypo } from "@expo/vector-icons";

import IconButton from "./IconButton";


interface TweetProps {
  tweet: TweetType;
}

const Tweet = ({ tweet }: TweetProps) => {
  return (
    <View style={styles.container}>
      <Image src={tweet.user.image} style={styles.userImage} />

      <View style={styles.mainContainer}>
        <View style={styles.headContainer}>
          <Text style={styles.name}>{tweet.user.name}</Text>
          <Text style={styles.username}>{tweet.user.username} · 2h</Text>
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
            <IconButton icon="comment" text={tweet.numberOfComments}/>
            <IconButton icon="retweet" text={tweet.numberOfRetweets}/>
            <IconButton icon="heart" text={tweet.numberOfLikes}/>
            <IconButton icon="chart" text={tweet.impressions || 0}/>
            <IconButton icon="share-apple"/>
        </View>
      </View>
    </View>
  );
};

export default Tweet;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "lightgrey",
    backgroundColor: "white",
  },
  mainContainer: {
    marginLeft: 10,
    flex: 1,
  },
  headContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    color: "grey",
    marginLeft: 5,
  },
  userImage: { width: 50, height: 50, borderRadius: 50 },
  name: {
    fontWeight: "600",
  },
  content: {
    lineHeight: 20,
    marginTop: 5,
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
    justifyContent: 'space-between'
  },
});
