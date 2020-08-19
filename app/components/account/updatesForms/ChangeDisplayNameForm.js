// import liraries
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';

// create a component
const ChangeDisplayNameForm = props => {
  const {
    displayName,
    setIsVisibleModal,
    setReloadData,
    toastRef,
  } = props;

  const [newDisplayName, setNewDisplayName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const updateDisplayName = async () => {
    setIsLoading(true);
    await firebase
      .auth()
      .currentUser.updateProfile({ displayName: newDisplayName })
      .then(() => {
        toastRef.current.show(
          'Nombre de usuario cambiado correctamente',
        );
        setIsVisibleModal(false);
        setReloadData(true);
      })
      .catch(() => {
        setIsVisibleModal(false);
        setErrorMessage('No se pudo cambiar, intentelo mas tarde');
      });
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Nombre"
        containerStyle={styles.input}
        defaultValue={displayName && displayName}
        onChange={e => setNewDisplayName(e.nativeEvent.text)}
        rightIcon={{
          type: 'material-community',
          name: 'account-circle-outline',
          color: '#c2c2c2',
        }}
        errorMessage={errorMessage}
      />
      <Button
        containerStyle={styles.saveBtnContainer}
        buttonStyle={styles.saveBtn}
        title="Guardar"
        onPress={updateDisplayName}
        loading={isLoading}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
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

ChangeDisplayNameForm.propTypes = {
  displayName: PropTypes.string.isRequired,
  setIsVisibleModal: PropTypes.func.isRequired,
  setReloadData: PropTypes.func.isRequired,
  toastRef: PropTypes.shape({
    current: PropTypes.shape({
      show: PropTypes.func,
    }),
  }).isRequired,
};

// make this component available to the app
export default ChangeDisplayNameForm;
