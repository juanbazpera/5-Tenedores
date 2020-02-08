// import liraries
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, Dimensions, StyleSheet } from 'react-native';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import PropTypes from 'prop-types';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'uuid/v4';
import firebase from 'firebase/app';
import firebaseConfig from '../../utils/FireBase';
import 'firebase/firestore';

import Modal from '../Modal';

const db = firebase.firestore(firebaseConfig);

const noImage = require('../../../assets/img/no-image.png');
// create a component
const AddRestaurantForm = props => {
  const { navigation, toastRef, setIsLoading, setIsReloadRestaurants } = props;
  const [imagesSelected, setImagesSelected] = useState([]);
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantAddress, setRestaurantAddress] = useState('');
  const [restaurantDescription, setRestaurantDescription] = useState('');
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [locationRestaurant, setLocationRestaurant] = useState(null);

  const addRestaurant = () => {
    if (!restaurantAddress || !restaurantDescription || !restaurantName) {
      toastRef.current.show('Todos los campos del formulario son obligatorios');
    } else if (imagesSelected.length === 0) {
      toastRef.current.show('El restaurante debe tener una foto');
    } else if (!locationRestaurant) {
      toastRef.current.show('Debe localizar el restaurante en el mapa');
    } else {
      setIsLoading(true);
      db.collection('restaurants')
        .add({
          name: restaurantName,
          address: restaurantAddress,
          description: restaurantDescription,
          location: locationRestaurant,
          images: [],
          rating: 0,
          ratingTotal: 0,
          quantityVoting: 0,
          createAt: new Date(),
          createBy: firebase.auth().currentUser.uid
        })
        .then(success => {
          uploadImageStorage(imagesSelected).then(imagesArray => {
            success.update({ images: imagesArray });
          });
          setIsLoading(false);
          setIsReloadRestaurants(true);
          navigation.navigate('Restaurants');
        })
        .catch(error => {
          setIsLoading(false);
          toastRef.current.show('Error al crear el restaurante');
        });
      // });
    }
  };

  const uploadImageStorage = async imageArray => {
    const imagesBlob = [];
    await Promise.all(
      imageArray.map(async image => {
        const response = await fetch(image);
        const blob = await response.blob();
        const ref = firebase
          .storage()
          .ref(`restaurants-images/`)
          .child(uuid());
        await ref.put(blob).then(result => {
          imagesBlob.push(result.metadata.name);
        });
      })
    );
    return imagesBlob;
  };

  return (
    <ScrollView>
      <PrincipalImage principalImage={imagesSelected[0]} />
      <FormAdd
        setIsVisibleMap={setIsVisibleMap}
        setRestaurantAddress={setRestaurantAddress}
        setRestaurantDescription={setRestaurantDescription}
        setRestaurantName={setRestaurantName}
        locationRestaurant={locationRestaurant}
      />
      <UploadImage
        imagesSelected={imagesSelected}
        setImagesSelected={setImagesSelected}
        toastRef={toastRef}
      />
      <Map
        isVisibleMap={isVisibleMap}
        setIsVisibleMap={setIsVisibleMap}
        toastRef={toastRef}
        setLocationRestaurant={setLocationRestaurant}
      />
      <Button
        title="Crear restaurante"
        onPress={addRestaurant}
        buttonStyle={styles.addRestaurantBtn}
      />
    </ScrollView>
  );
};
AddRestaurantForm.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
  toastRef: PropTypes.shape({
    current: PropTypes.shape({ show: PropTypes.func })
  }).isRequired
};

const FormAdd = props => {
  const {
    setRestaurantAddress,
    setRestaurantDescription,
    setRestaurantName,
    setIsVisibleMap,
    locationRestaurant
  } = props;
  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Nombre del restaurante"
        containerStyle={styles.inputContainer}
        onChange={e => setRestaurantName(e.nativeEvent.text)}
      />
      <Input
        placeholder="Dirección"
        containerStyle={styles.inputContainer}
        rightIcon={{
          type: 'material-community',
          name: 'google-maps',
          color: locationRestaurant ? '#00a680' : '#c2c2c2',
          onPress: () => setIsVisibleMap(true)
        }}
        onChange={e => setRestaurantAddress(e.nativeEvent.text)}
      />
      <Input
        inputStyle={styles.textarea}
        multiline
        numberOfLines={5}
        placeholder="Descripción"
        maxLength={120}
        containerStyle={styles.inputTextAreaContainer}
        onChange={e => setRestaurantDescription(e.nativeEvent.text)}
      />
    </View>
  );
};
FormAdd.propTypes = {
  setRestaurantAddress: PropTypes.func.isRequired,
  setRestaurantDescription: PropTypes.func.isRequired,
  setRestaurantName: PropTypes.func.isRequired,
  setIsVisibleMap: PropTypes.func.isRequired
};
FormAdd.defaultProps = {
  locationRestaurant: null
};

const PrincipalImage = props => {
  const { principalImage } = props;
  const widthScreen = Dimensions.get('window').width;

  return (
    <View style={styles.principalImage}>
      <Image
        source={principalImage ? { uri: principalImage } : noImage}
        style={{ width: widthScreen, height: 200 }}
      />
    </View>
  );
};
PrincipalImage.propTypes = {
  principalImage: PropTypes.string
};
PrincipalImage.defaultProps = {
  principalImage: ''
};

const UploadImage = props => {
  const { imagesSelected, setImagesSelected, toastRef } = props;

  const removeImage = image => {
    Alert.alert('Eliminar Imagen', 'Seguro que decea eliminar imagen?', [
      {
        text: 'Cancelar',
        style: 'cancel'
      },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () =>
          setImagesSelected(
            imagesSelected.filter(imagesUrl => imagesUrl !== image)
          )
      }
    ]);
  };

  const imageSelect = async () => {
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const resultPermissionCamera =
      resultPermission.permissions.cameraRoll.status;
    if (resultPermissionCamera === 'denied') {
      toastRef.current.show('Es necesario aceptar los permisos de la galeria.');
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });
      if (result.cancelled) {
        toastRef.current.show('Se ha cerrado la galeria.');
      } else {
        setImagesSelected([...imagesSelected, result.uri]);
      }
    }
  };

  return (
    <View style={styles.viewImage}>
      {imagesSelected.length < 4 && (
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.containerIcon}
          onPress={imageSelect}
        />
      )}

      {imagesSelected.map(imageRestaurant => (
        <Avatar
          key={imageRestaurant}
          style={styles.miniatureStyles}
          source={{ uri: imageRestaurant }}
          onPress={() => removeImage(imageRestaurant)}
        />
      ))}
    </View>
  );
};
UploadImage.propTypes = {
  imagesSelected: PropTypes.arrayOf(PropTypes.string).isRequired,
  setImagesSelected: PropTypes.func.isRequired,
  toastRef: PropTypes.shape({
    current: PropTypes.shape({ show: PropTypes.func })
  }).isRequired
};

const Map = props => {
  const {
    isVisibleMap,
    setIsVisibleMap,
    setLocationRestaurant,
    toastRef
  } = props;
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const getCurrentLocation = async () => {
      const resultPermissions = await Permissions.askAsync(
        Permissions.LOCATION
      );
      const statusPermissions = resultPermissions.permissions.location.status;
      if (statusPermissions !== 'granted') {
        toastRef.current.show('Debe aceptar los permisos de localización');
      } else {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001
        });
      }
    };
    getCurrentLocation();
  }, []);

  const locationConfirmation = () => {
    setLocationRestaurant(location);
    setIsVisibleMap(false);
    toastRef.current.show('Localizacion guardada correctamente');
  };

  return (
    <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
      <View>
        {location && (
          <MapView
            style={styles.mapStyle}
            initialRegion={location}
            showsUserLocation
            onRegionChange={region => setLocation(region)}
          >
            <MapView.Marker coordinate={location} draggable />
          </MapView>
        )}
        <View style={styles.viewMapBtn}>
          <Button
            title="Guardar ubicacion"
            onPress={locationConfirmation}
            containerStyle={styles.viewMapBtnContainerSave}
            buttonStyle={styles.viewMapBtnSave}
          />
          <Button
            title="Cancelar"
            onPress={() => setIsVisibleMap(false)}
            containerStyle={styles.viewMapBtnContainerCancel}
            buttonStyle={styles.viewMapBtnCancel}
          />
        </View>
      </View>
    </Modal>
  );
};
Map.propTypes = {
  isVisibleMap: PropTypes.bool.isRequired,
  setIsVisibleMap: PropTypes.func.isRequired,
  setLocationRestaurant: PropTypes.func.isRequired,
  toastRef: PropTypes.shape({
    current: PropTypes.shape({ show: PropTypes.func })
  }).isRequired
};

// define your styles
const styles = StyleSheet.create({
  viewImage: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30
  },
  containerIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: '#e3e3e3'
  },
  miniatureStyles: {
    width: 70,
    height: 70,
    marginRight: 10
  },
  principalImage: {
    alignItems: 'center',
    height: 200,
    marginBottom: 20
  },
  viewForm: {
    marginLeft: 10,
    marginRight: 10
  },
  inputContainer: {
    marginBottom: 10
  },
  inputTextAreaContainer: {
    padding: 0,
    margin: 0,
    width: '100%'
  },
  textarea: {
    textAlignVertical: 'top' // hack android
  },
  mapStyle: {
    width: '100%',
    height: 500
  },
  viewMapBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10
  },
  viewMapBtnContainerSave: {
    paddingRight: 5
  },
  viewMapBtnSave: {
    backgroundColor: '#00a680'
  },
  viewMapBtnContainerCancel: {
    paddingLeft: 5
  },
  viewMapBtnCancel: {
    backgroundColor: '#a60d0d'
  },
  addRestaurantBtn: {
    backgroundColor: '#00a680',
    margin: 20
  }
});

export default AddRestaurantForm;
