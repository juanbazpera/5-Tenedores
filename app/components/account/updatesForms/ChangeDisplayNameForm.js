// import liraries
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import * as firebase from 'firebase';

// create a component
const ChangeDisplayNameForm = props => {
  const {
    displayName,
    setIsVisibleModal,
    setReloadData,
    toastRef,
  } = props;

  const [newDisplayName, setNewDisplayName] = useState('');

  const updateDisplayName = async () => {
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
        toastRef.current.show(
          'No se pudo cambiar, intentelo mas tarde',
        );
      });
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
        // errorMessage()
      />
      <Button
        containerStyle={styles.saveBtnContainer}
        buttonStyle={styles.saveBtn}
        title="Guardar"
        onPress={updateDisplayName}
        // loading={}
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
  },
  saveBtn: {
    backgroundColor: '#00a680',
  },
});

// make this component available to the app
export default ChangeDisplayNameForm;
