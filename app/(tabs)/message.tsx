import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface MessageScreenProps {}

const MessageScreen = (props: MessageScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>MessageScreen</Text>
    </View>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  container: {}
});
