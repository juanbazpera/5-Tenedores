// import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';

import { validatePassword } from '../../../utils/Validation';
import reauthenticate from '../../../utils/Api';

// create a component
const ChangePasswordForm = props => {
  const { toastRef, setIsVisibleModal, setReloadData } = props;

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [hideNewPassword, setHideNewPassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(
    true,
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const updatePassword = async () => {
    setIsLoading(true);
    if (!password || !newPassword || !confirmPassword) {
      setErrorMessage('Debe ingresar todos los campos');
    } else if (!validatePassword(newPassword)) {
      setErrorMessage(
        'Contraseña debe tener por lo menos 8 caracteres',
      );
    } else if (newPassword !== confirmPassword) {
      setErrorMessage(
        'La nueva contraseña debe coincidir con su confirmacion',
      );
    } else {
      setErrorMessage('');
      await reauthenticate(password).then(() => {
        firebase
          .auth()
          .currentUser.updatePassword(newPassword)
          .then(() => {
            toastRef.current.show('Contraseña actualizada con exito');
            setIsVisibleModal(false);
            setReloadData(true);
          })
          .catch(() => {
            setErrorMessage('Antigua contraseña invalida');
          });
      });
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Contraseña antigua"
        containerStyle={styles.input}
        secureTextEntry={hidePassword}
        password
        onChange={e => {
          setPassword(e.nativeEvent.text);
          setErrorMessage('');
        }}
        rightIcon={{
          type: 'material-community',
          name: hidePassword ? 'eye-outline' : 'eye-off-outline',
          color: '#c2c2c2',
          onPress: () => setHidePassword(!hidePassword),
        }}
      />
      <Input
        placeholder="Contraseña nueva"
        containerStyle={styles.input}
        secureTextEntry={hideNewPassword}
        password
        onChange={e => {
          setNewPassword(e.nativeEvent.text);
          setErrorMessage('');
        }}
        rightIcon={{
          type: 'material-community',
          name: hideNewPassword ? 'eye-outline' : 'eye-off-outline',
          color: '#c2c2c2',
          onPress: () => setHideNewPassword(!hideNewPassword),
        }}
      />
      <Input
        placeholder="Repetir contraseña nueva"
        containerStyle={styles.input}
        secureTextEntry={hideConfirmPassword}
        password
        onChange={e => {
          setConfirmPassword(e.nativeEvent.text);
          setErrorMessage('');
        }}
        rightIcon={{
          type: 'material-community',
          name: hideConfirmPassword
            ? 'eye-outline'
            : 'eye-off-outline',
          color: '#c2c2c2',
          onPress: () => setHideConfirmPassword(!hideConfirmPassword),
        }}
      />
      <Text style={{ color: '#f00' }}>{errorMessage}</Text>
      <Button
        containerStyle={styles.saveBtnContainer}
        buttonStyle={styles.saveBtn}
        title="Guardar"
        onPress={updatePassword}
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

ChangePasswordForm.propTypes = {
  setIsVisibleModal: PropTypes.func.isRequired,
  setReloadData: PropTypes.func.isRequired,
  toastRef: PropTypes.shape({
    current: PropTypes.shape({
      show: PropTypes.func,
    }),
  }).isRequired,
};

// make this component available to the app
export default ChangePasswordForm;
