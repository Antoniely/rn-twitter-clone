import { StyleSheet } from "react-native";
import React from "react";
import { getDateShort, getTimeShort } from "../../utils/date";
import Separator from "../Separator";
import { Text, View } from "../Themed";
import IconButton from "../IconButton";
import { TweetType } from "../../types";

type StatisticsTweetProps = {
  tweet: TweetType
}

const StatisticsTweet = ({tweet}: StatisticsTweetProps) => {
  return (
    <View style={styles.statisticsContainer}>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>
          {getTimeShort({ date: tweet.createdAt })}.
        </Text>
        <Text style={styles.date}>
          · {getDateShort({ date: tweet.createdAt })} desde Earth ·
        </Text>
        <View style={styles.visualizationsContainer}>
          <Text style={styles.impresions}>{tweet.impressions ?? 0}</Text>
          <Text style={styles.visualizacionsTitle}>visualizaciones</Text>
        </View>
      </View>
      <Separator />
      <View style={styles.container}>
        <View style={styles.visualizationsContainer}>
          <Text style={styles.impresions}>{tweet.numberOfRetweets ?? 0}</Text>
          <Text style={styles.visualizacionsTitle}>Retweets</Text>
        </View>
        <View style={styles.visualizationsContainer}>
          <Text style={styles.impresions}>{tweet.numberOfQuotes ?? 0}</Text>
          <Text style={styles.visualizacionsTitle}>Citas</Text>
        </View>
      </View>
      <Separator />
      <View style={styles.container}>
        <View style={styles.visualizationsContainer}>
          <Text style={styles.impresions}>{tweet.numberOfLikes ?? 0}</Text>
          <Text style={styles.visualizacionsTitle}>Me gusta</Text>
        </View>
        <View style={styles.visualizationsContainer}>
          <Text style={styles.impresions}>{tweet.numberOfQuotes ?? 0}</Text>
          <Text style={styles.visualizacionsTitle}>elementos guardados</Text>
        </View>
      </View>
      <Separator />
      <View style={styles.iconButtom}>
        <IconButton icon="comment" />
        <IconButton icon="retweet" />
        <IconButton icon="heart" />
        <IconButton isBookmark />
        <IconButton icon="share-apple" />
      </View>
    </View>
  );
};

export default StatisticsTweet;

const styles = StyleSheet.create({
  statisticsContainer: {
    gap: 10,
  },
  date: {
    letterSpacing: -0.5,
    color: "grey",
    fontSize: 16,
  },
  visualizationsContainer: {
    flexDirection: "row",
  },
  impresions: {
    fontWeight: "700",
    fontSize: 16,
  },
  visualizacionsTitle: {
    letterSpacing: -0.5,
    marginLeft: 2,
    fontSize: 16,
    color: "grey",
  },
  dateContainer: {
    flexDirection: "row",
    columnGap: 4,
  },
  container: {
    flexDirection: "row",
    columnGap: 10,
  },
  iconButtom: {
    flexDirection: "row",
    marginVertical: 5,
    justifyContent: "space-evenly",
  },
});
