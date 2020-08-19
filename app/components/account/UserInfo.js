import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import PropTypes from 'prop-types';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';

export default function UserInfo(props) {
  const {
    userInfo: { uid, displayName, email, photoURL },
    setReloadData,
    toastRef,
    setIsLoading,
    setTextLoading,
  } = props;
  const checkUserAvatar = () => {
    return photoURL || 'https://api.adorable.io/avatars/285/abott@adorable.png';
  };

  const uploadImage = async (uri, imageName) => {
    setTextLoading('Actualizando foto');
    setIsLoading(true);
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase
      .storage()
      .ref()
      .child(`avatar/${imageName}`);
    return ref.put(blob);
  };

  const changeAvatar = async () => {
    const resultpermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const resultPermissionCamera = resultpermission.permissions.cameraRoll.status;
    if (!resultPermissionCamera === 'denied') {
      toastRef.current.show('Es necesario aceptar los permisos de la galeria');
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (result.cancelled) {
        toastRef.current.show('Se ha cerrado la galeria');
      } else {
        uploadImage(result.uri, uid).then(() => {
          toastRef.current.show('Imagen subida correctamente');
          updatePhotoUrl(uid);
        });
      }
    }
  };

  const updatePhotoUrl = userId => {
    firebase
      .storage()
      .ref(`avatar/${userId}`)
      .getDownloadURL()
      .then(async result => {
        const user = {
          photoURL: result,
        };
        await firebase.auth().currentUser.updateProfile(user);
        setReloadData(true);
        setIsLoading(false);
      })
      .catch(() => {
        toastRef.current.show('Error al recuperar la imagen del servidor.');
      });
  };

  return (
    <View>
      <View style={styles.viewUserInfo}>
        <Avatar
          rounded
          size="large"
          source={{ uri: checkUserAvatar() }}
          containerStyle={styles.userInfoAvatar}
          showEditButton
          onEditPress={() => changeAvatar()}
        />
        <View>
          <Text style={styles.displayName}>{displayName || 'Anónimo'}</Text>
          <Text>{email || 'Social login'}</Text>
        </View>
      </View>
    </View>
  );
}

UserInfo.propTypes = {
  userInfo: PropTypes.shape({
    uid: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string,
    photoURL: PropTypes.string,
  }).isRequired,
  setReloadData: PropTypes.func.isRequired,
  toastRef: PropTypes.shape({
    current: PropTypes.shape({
      show: PropTypes.func,
    }),
  }).isRequired,
  setIsLoading: PropTypes.func.isRequired,
  setTextLoading: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: '#f2f2f2',
  },
  userInfoAvatar: {
    marginRight: 20,
  },
  displayName: {
    fontWeight: 'bold',
  },
});
