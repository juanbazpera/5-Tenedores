// import liraries
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';

import UserGuest from './UserGuest';
import UserLogged from './UserLogged';
import Loading from '../../components/Loading';

export default function MyAccount(props) {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      return !user ? setLogin(false) : setLogin(true);
    });
  }, []);

  const logout = () => {
    firebase.auth().signOut();
  };

  if (login === null) {
    return <Loading isVisible text="Cargando..." />;
  }
  if (login) return <UserLogged logout={() => logout()} />;
  return <UserGuest />;
}

MyAccount.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func })
    .isRequired,
};
