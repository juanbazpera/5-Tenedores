import React from 'react';
import { View, StyleSheet, Platform, InteractionManager } from 'react-native';
import Navigation from './app/navigations/Navigations';
// import loadImagesFromApi from './app/utils/RestaurantsFromApi';

export default function App() {
  // loadImagesFromApi();
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
