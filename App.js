import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as firebase from 'firebase';
import Navigation from './app/navigations/Navigations';
import firebaseConfig from './app/utils/FireBase';

firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
    <View style={styles.container}>
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
