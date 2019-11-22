import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as firebase from 'firebase';

import firebaseConfig from './app/utils/FireBase';
firebase.initializeApp(firebaseConfig);

import UserNavigation from './app/navigations/User';

export default function App() {
  return (
    <View style={styles.container}>
      <UserNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
