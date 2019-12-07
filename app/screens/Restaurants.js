// import liraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// create a component
export default function Restaurants() {
  return (
    <View style={styles.viewBody}>
      <Text>Home Screen...</Text>
    </View>
  );
}
