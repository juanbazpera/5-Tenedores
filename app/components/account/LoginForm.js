import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';

import { validateEmail } from '../../utils/Validation';
import Loading from '../Loading';

const LoginForm = props => {
  const { navigation, toastRef } = props;

  const [hidePassword, setHidePassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const login = async () => {
    setIsLoading(true);
    if (!email || !password) {
      setErrorMessage('Inserte email y contraseña');
    } else if (!validateEmail(email)) {
      setErrorMessage('Email invalido');
    } else {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          toastRef.current.show('Login correcto');
          navigation.navigate('MyAccount');
        })
        .catch(error => {
          setErrorMessage('Email o Contraseña invalido');
        });
    }
    setIsLoading(false);
  };

  return (
    <KeyboardAwareScrollView enableOnAndroid>
      <View style={styles.container}>
        <Input
          placeholder="Email"
          containerStyle={styles.inputForm}
          onChange={e => {
            setEmail(e.nativeEvent.text);
          }}
          rightIcon={<Icon type="material-community" name="at" iconStyle={styles.iconRight} />}
        />
        <Input
          placeholder="Contraseña"
          password
          secureTextEntry={hidePassword}
          containerStyle={styles.inputForm}
          onChange={e => {
            setPassword(e.nativeEvent.text);
          }}
          rightIcon={
            <Icon
              type="material-community"
              name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
              iconStyle={styles.iconRight}
              onPress={() => {
                setHidePassword(!hidePassword);
              }}
            />
          }
          errorMessage={errorMessage}
        />
        <Button
          title="Iniciar sesion"
          buttonStyle={styles.loginBtn}
          containerStyle={styles.containerLoginBtn}
          onPress={() => login()}
        />
      </View>
      <Loading isVisible={isLoading} text="Iniciando session" />
    </KeyboardAwareScrollView>
  );
};

LoginForm.propTypes = {
  toastRef: PropTypes.shape({
    current: PropTypes.shape({ show: PropTypes.func }),
  }).isRequired,
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  inputForm: {
    width: '95%',
    marginTop: 20,
  },
  iconRight: { color: '#c1c1c1' },
  containerLoginBtn: {
    marginTop: 20,
    width: '95%',
  },
  loginBtn: {
    backgroundColor: '#00a680',
  },
});

export default withNavigation(LoginForm);
