import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as firebase from 'firebase';

import UpdateUserInfo from './UpdateUserInfo';

export default function UserInfo() {
  const [userInfo, setUserInfo] = useState({});

  const getUserInfo = async () => {
    const user = await firebase.auth().currentUser;
    user.providerData.forEach(userInfo => {
      setUserInfo(userInfo);
    });
  };

  useEffect(() => {
    getUserInfo();
  }, [userInfo]);

  const checkUserAvatar = photoURL => {
    return (
      photoURL ||
      'https://api.adorable.io/avatars/285/abott@adorable.png'
    );
  };

  const photoURL = checkUserAvatar(userInfo.photoURL);
  return (
    <View>
      <View style={styles.viewUserInfo}>
        <Avatar
          rounded
          size="large"
          source={{ uri: photoURL }}
          containerStyle={styles.userInfoAvatar}
        />
        <Text style={styles.displayName}>{userInfo.displayName}</Text>
        <Text>{userInfo.email}</Text>
      </View>
      <UpdateUserInfo />
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: '#f2f2f2',
  },
  userInfoAvatar: {
    marginRight: 20,
  },
  displayName: {
    fontWeight: 'bold',
  },
});
