import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import PropTypes from 'prop-types';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';

import UpdateUserInfo from './UpdateUserInfo';

export default function UserInfo(props) {
  const {
    userInfo: { uid, displayName, email, photoURL },
  } = props;

  const checkUserAvatar = () => {
    return photoURL || 'https://api.adorable.io/avatars/285/abott@adorable.png';
  };

  const changeAvatar = async () => {
    const resultpermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const resultPermissionCamera = resultpermission.permissions.cameraRoll.status;
    if (!resultPermissionCamera === 'denied') {
      console.log('Es necesario aceptar los permisos de la galeria');
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (result.cancelled) {
        console.log('Se ha cerrado la galeria');
      } else {
        uploadImage(result.uri, uid).then(() => {
          console.log('Imagen subida correctamente');
        });
      }
    }
  };

  const uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase
      .storage()
      .ref()
      .child(`avatar/${imageName}`);
    return ref.put(blob);
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
          onEditPress={changeAvatar()}
        />
        <View>
          <Text style={styles.displayName}>{displayName || 'Anónimo'}</Text>
          <Text>{email || 'Social login'}</Text>
        </View>
      </View>
      <UpdateUserInfo />
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
