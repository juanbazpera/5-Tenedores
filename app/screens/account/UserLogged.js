import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import * as firebase from 'firebase';

import UserInfo from '../../components/MyAccount/MyAccountUser/UserInfo';

// create a component
export default function MyAccountUser() {
  return (
    <View style={styles.container}>
      <UserInfo />
      <Button title="Cerrar sesion" onPress={() => firebase.auth().signOut()} />
    </View>
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
