/* eslint-disable react/jsx-one-expression-per-line */
import React, { useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image, Divider } from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

import LoginForm from '../../components/account/LoginForm';

import LogoImage from '../../../assets/img/5-tenedores-letras-icono-logo.png';
import LoginFacebook from '../../components/account/LoginFacebook';

function Login(props) {
  const toastRef = useRef();

  const { navigation } = props;

  return (
    <View style={styles.viewContainer}>
      <View style={styles.imageContainer}>
        <Image source={LogoImage} style={styles.logo} resizeMode="contain" />
      </View>
      <LoginForm toastRef={toastRef} />
      <CreateAccount navigation={navigation} />
      <Divider style={styles.divider} />
      <LoginFacebook toastRef={toastRef} navigation={navigation} />
      <Toast ref={toastRef} position="bottom" positionValue={150} opacity={0.8} />
    </View>
  );
}

Login.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
    navigate: PropTypes.func,
  }).isRequired,
};

function CreateAccount(props) {
  const { navigation } = props;
  return (
    <Text style={styles.registerText}>
      ¿Aun no tienes cuenta?{' '}
      <Text style={styles.registerBtn} onPress={() => navigation.navigate('Register')}>
        {' '}
        Registrarse
      </Text>
    </Text>
  );
}
CreateAccount.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
  },
  imageContainer: {
    marginTop: 20,
  },
  logo: {
    width: '100%',
    height: 150,
  },
  divider: {
    backgroundColor: '#00a680',
    marginBottom: 10,
  },
  registerText: {
    marginLeft: 10,
    marginRight: 10,
  },
  registerBtn: {
    fontWeight: 'bold',
    color: '#00a680',
  },
});

export default withNavigation(Login);
