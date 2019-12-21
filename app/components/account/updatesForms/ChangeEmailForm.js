// import liraries
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import * as firebase from 'firebase';
import { withNavigation } from 'react-navigation';

import validateEmail from '../../../utils/Validation';

// create a component
const ChangeEmailForm = props => {
  const { email, setIsVisibleModal, toastRef, navigation } = props;

  const [newEmail, setNewEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const updateEmail = async () => {
    if (!validateEmail(newEmail)) {
      setErrorMessage('Email invalido');
    } else {
      setErrorMessage('');
      // ! TODO Seguir aca... hay que revocar las credenciales para poder cambiar el email
      await firebase.auth().currentUser.getIdToken(true);
      await firebase
        .auth()
        .currentUser.updateEmail(newEmail)
        .then(() => {
          setIsVisibleModal(false);
          firebase.auth().signOut();
          toastRef.current.show('Email cambiado correctamente');
          navigation.navigate('MyAccount');
        })
        .catch(error => {
          console.log(error);
          toastRef.current.show(
            'No se pudo cambiar el email, intente mas tarde',
          );
        });
    }
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
        // errorMessage()
      />
      <Text style={{ color: '#f00' }}>
        {errorMessage && errorMessage}
      </Text>
      <Button
        containerStyle={styles.saveBtnContainer}
        buttonStyle={styles.saveBtn}
        title="Guardar"
        onPress={updateEmail}
        // loading={}
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
  },
  saveBtn: {
    backgroundColor: '#00a680',
  },
});

// make this component available to the app
export default withNavigation(ChangeEmailForm);
