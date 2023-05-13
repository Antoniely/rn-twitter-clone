import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Separator = () => {
  return (
      <View style={styles.separator} />
  );
};

export default Separator;

const styles = StyleSheet.create({

  separator: {
    width: "100%",
    // borderColor: "#2A2A2A",
    borderColor: "#AFAFAF",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
