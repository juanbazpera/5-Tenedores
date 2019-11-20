// import liraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default function Search() {
  return (
    <View style={styles.viewBody}>
      <Text>Search Screen...</Text>
    </View>
  );
}
