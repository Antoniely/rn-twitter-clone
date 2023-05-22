import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';

interface SpaceScreenProps {}

const SpaceScreen = (props: SpaceScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>SpaceScreen</Text>
    </View>
  );
};

export default SpaceScreen;

const styles = StyleSheet.create({
  container: {}
});
