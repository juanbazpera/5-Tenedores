import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';

import Loading from '../Loading';
import { validateEmail } from '../../utils/Validation';

// create a component
const RegisterForm = props => {
  const { toastRef, navigation } = props;

  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordConfirm, setHidePasswordConfirm] = useState(true);
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const register = async () => {
    setIsVisibleLoading(true);
    if (!email || !password || !passwordConfirmation) {
      toastRef.current.show('Todos los campos son obligatorios');
    } else if (!validateEmail(email)) {
      toastRef.current.show('El email no es correcto');
    } else if (password !== passwordConfirmation) {
      toastRef.current.show('Las contraseña no son iguales');
    } else {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          toastRef.current.show('Usuario creado correctamente');
          navigation.navigate('MyAccount');
        })
        .catch(() => {
          toastRef.current.show('Error al crear la cuenta, intente mas tarde');
        });
    }
    setIsVisibleLoading(false);
  };

  return (
    <KeyboardAwareScrollView enableOnAndroid>
      <View style={styles.container}>
        <Input
          placeholder="Correo electronico"
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
          onChange={e => setPassword(e.nativeEvent.text)}
          rightIcon={
            <Icon
              type="material-community"
              name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
              iconStyle={styles.iconRight}
              onPress={() => setHidePassword(!hidePassword)}
            />
          }
        />
        <Input
          placeholder="Repetir contraseña"
          password
          secureTextEntry={hidePasswordConfirm}
          containerStyle={styles.inputForm}
          onChange={e => setPasswordConfirmation(e.nativeEvent.text)}
          rightIcon={
            <Icon
              type="material-community"
              name={hidePasswordConfirm ? 'eye-outline' : 'eye-off-outline'}
              iconStyle={styles.iconRight}
              onPress={() => setHidePasswordConfirm(!hidePasswordConfirm)}
            />
          }
        />
        <Button
          buttonStyle={styles.registerBtn}
          containerStyle={styles.registerContainerBtn}
          title="Registrarse"
          onPress={() => register()}
        />
        <Loading text="Creando cuenta" isVisible={isVisibleLoading} />
      </View>
    </KeyboardAwareScrollView>
  );
};

RegisterForm.propTypes = {
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
    width: '100%',
    marginTop: 20,
  },
  iconRight: {
    color: '#c1c1c1',
  },
  registerContainerBtn: {
    marginTop: 20,
    width: '95%',
  },
  registerBtn: {
    backgroundColor: '#00a680',
  },
});

export default withNavigation(RegisterForm);
