import React from 'react';
import { View, StyleSheet } from 'react-native';
import Navigation from './app/navigations/Navigations';

export default function App() {
  return (
    <View style={styles.container}>
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
