// import liraries
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';

import { validateEmail } from '../../../utils/Validation';
import reauthenticate from '../../../utils/Api';

// create a component
const ChangeEmailForm = props => {
  const { email, setIsVisibleModal, toastRef, setReloadData } = props;

  const [newEmail, setNewEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const updateEmail = async () => {
    setIsLoading(true);
    if (!newEmail || !password) {
      setErrorMessage('Debe ingresar Email y Contraseña');
    } else if (!validateEmail(newEmail)) {
      setErrorMessage('Email invalido');
    } else if (email === newEmail) {
      setErrorMessage('Debe ingresar un email nuevo');
    } else {
      setErrorMessage('');
      await reauthenticate(password)
        .then(() => {
          firebase
            .auth()
            .currentUser.updateEmail(newEmail)
            .then(() => {
              toastRef.current.show('Email actualizado con exito.');
              setIsVisibleModal(false);
              setReloadData(true);
            });
        })
        .catch(() => {
          setErrorMessage('Email en uso');
        });
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Nombre"
        containerStyle={styles.input}
        defaultValue={email}
        onChange={e => {
          setErrorMessage('');
          setNewEmail(e.nativeEvent.text);
        }}
        rightIcon={{
          type: 'material-community',
          name: 'at',
          color: '#c2c2c2',
        }}
      />
      <Input
        placeholder="Inserte contraseña"
        containerStyle={styles.input}
        secureTextEntry={hidePassword}
        password
        onChange={e => {
          setErrorMessage('');
          setPassword(e.nativeEvent.text);
        }}
        rightIcon={{
          type: 'material-community',
          name: hidePassword ? 'eye-outline' : 'eye-off-outline',
          color: '#c2c2c2',
          onPress: () => setHidePassword(!hidePassword),
        }}
      />
      <Text style={{ color: '#f00' }}>
        {errorMessage && errorMessage}
      </Text>
      <Button
        containerStyle={styles.saveBtnContainer}
        buttonStyle={styles.saveBtn}
        title="Guardar"
        onPress={updateEmail}
        loading={isLoading}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginBottom: 10,
  },
  saveBtnContainer: {
    marginTop: 20,
    width: '100%',
  },
  saveBtn: {
    backgroundColor: '#00a680',
  },
});

ChangeEmailForm.propTypes = {
  email: PropTypes.string.isRequired,
  setIsVisibleModal: PropTypes.func.isRequired,
  setReloadData: PropTypes.func.isRequired,
  toastRef: PropTypes.shape({
    current: PropTypes.shape({
      show: PropTypes.func,
    }),
  }).isRequired,
};

// make this component available to the app
export default ChangeEmailForm;
