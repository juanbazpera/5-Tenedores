// import liraries
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';

import MyAccountGuest from '../../components/MyAccount/MyAccountGuest';
import MyAccountUser from '../../components/MyAccount/MyAccountUser';

export default function MyAccount(props) {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const isUserLogin = async () => {
      await firebase.auth().onAuthStateChanged(isLoggin => {
        setLogin(isLoggin);
      });
    };
    setLogin(() => isUserLogin());
  }, []);

  const goToScreen = nameScreen => {
    const { navigation } = props;
    navigation.navigate(nameScreen);
  };

  const logout = () => {
    firebase.auth().signOut();
  };

  if (login) {
    return <MyAccountUser logout={() => logout()} />;
  }
  return <MyAccountGuest goToScreen={() => goToScreen('Login')} />;
}

MyAccount.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func })
    .isRequired,
};
