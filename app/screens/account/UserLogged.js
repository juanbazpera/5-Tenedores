import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import * as firebase from 'firebase';

import UserInfo from '../../components/account/UserInfo';
import Loading from '../../components/Loading';
import AccountOptions from '../../components/account/AccountOptions';

// create a component
export default function UserLogged() {
  const [userInfo, setUserInfo] = useState({});
  const [reloadData, setReloadData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [textLoading, setTextLoading] = useState('');
  const toastRef = useRef();

  useEffect(() => {
    const updateInfo = async () => {
      const user = await firebase.auth().currentUser.providerData[0];
      setUserInfo(user);
    };
    updateInfo();
    setReloadData(false);
  }, [reloadData]);

  return (
    <View style={styles.container}>
      <UserInfo
        userInfo={userInfo}
        setReloadData={setReloadData}
        toastRef={toastRef}
        setIsLoading={setIsLoading}
        setTextLoading={setTextLoading}
      />
      <AccountOptions
        userInfo={userInfo}
        setReloadData={setReloadData}
        toastRef={toastRef}
      />
      <Button
        title="Cerrar sesion"
        buttonStyle={styles.closeSessionBtn}
        titleStyle={styles.closeSessionTextBtn}
        onPress={() => firebase.auth().signOut()}
      />
      <Toast
        ref={toastRef}
        position="bottom"
        positionValue={150}
        opacity={0.8}
      />
      <Loading text={textLoading} isVisible={isLoading} />
    </View>
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    backgroundColor: '#f2f2f2',
  },
  closeSessionBtn: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#e3e3e3',
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    paddingTop: 10,
    paddingBottom: 10,
  },
  closeSessionTextBtn: {
    color: '#00a680',
  },
});
