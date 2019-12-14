import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import * as firebase from 'firebase';

import UserInfo from '../../components/account/UserInfo';

// create a component
export default function MyAccountUser() {
  const getCurrentUser = () => {
    const user = firebase.auth().currentUser.providerData[0];
    return user;
  };

  return (
    <View style={styles.container}>
      <UserInfo userInfo={getCurrentUser()} />
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
