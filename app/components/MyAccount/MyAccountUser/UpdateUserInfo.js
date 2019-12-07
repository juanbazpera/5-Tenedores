import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
export default function UpdateUserInfo() {
  return (
    <View style={styles.container}>
      <Text>UpdateUserInfo</Text>
    </View>
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: '#f2f2f2',
  },
});
