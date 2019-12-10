import React, { useState } from 'react';
import { SocialIcon } from 'react-native-elements';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import * as facebook from 'expo-facebook';

import facebookApi from '../../utils/Social';
import Loading from '../Loading';

const LoginFacebook = props => {
  const { toastRef, navigation } = props;

  const [isVisibleLoading, setIsVisibleLoading] = useState(false);

  const loginFacebook = async () => {
    const { type, token } = await facebook.logInWithReadPermissionsAsync(facebookApi.application_id, {
      permissions: facebookApi.permissions,
    });
    setIsVisibleLoading(true);
    if (type === 'success') {
      const credentials = firebase.auth.FacebookAuthProvider.credential(token);
      await firebase
        .auth()
        .signInWithCredential(credentials)
        .then(() => {
          toastRef.current.show('Login correcto');
          navigation.navigate('MyAccount');
        })
        .catch(() => {
          toastRef.current.show('Error accediendo con facebook, reintente mas tarde');
        });
    } else if (type === 'cancel') {
      toastRef.current.show('Inicio de sesión cancelado');
    } else {
      toastRef.current.show('Error desconocido');
    }
    setIsVisibleLoading(false);
  };

  return (
    <React.Fragment>
      <SocialIcon title="Iniciar sesión con facebook" button type="facebook" onPress={() => loginFacebook()} />
      <Loading text="Iniciando sesión" isVisible={isVisibleLoading} />
    </React.Fragment>
  );
};

LoginFacebook.propTypes = {
  toastRef: PropTypes.shape({ current: PropTypes.shape({ show: PropTypes.func }) }).isRequired,
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};

export default LoginFacebook;
