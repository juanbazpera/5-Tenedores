import firebase from 'firebase/app';
import 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Toast from 'react-native-easy-toast';
import { Icon, Image, Button } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import Loading from '../components/Loading';
import { firebaseApp } from '../utils/FireBase';

const db = firebase.firestore(firebaseApp);

const Favourites = props => {
  const { navigation } = props;
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadRestaurants, setReloadRestaurants] = useState(false);
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);
  const [userLogged, setUserLogged] = useState(false);

  firebase.auth().onAuthStateChanged(user => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  const toastRef = useRef();

  const getDataRestaurant = idRestaurantArray => {
    const arrayRestaurants = [];
    idRestaurantArray.forEach(idRestaurant => {
      const result = db
        .collection('restaurants')
        .doc(idRestaurant)
        .get();

      arrayRestaurants.push(result);
    });
    return Promise.all(arrayRestaurants);
  };

  useEffect(() => {
    if (userLogged) {
      setIsLoading(true);
      const userId = firebase.auth().currentUser.uid;
      db.collection('favourites')
        .where('idUser', '==', userId)
        .get()
        .then(response => {
          const restaurantIdArray = [];
          response.forEach(doc => {
            restaurantIdArray.push(doc.data().idRestaurant);
          });
          const restaurantArray = [];
          getDataRestaurant(restaurantIdArray).then(response => {
            let restaurant = null;
            response.forEach(doc => {
              restaurant = doc.data();
              restaurant.id = doc.id;
              restaurantArray.push({ restaurant });
            });
            setRestaurants(restaurantArray);
            setIsLoading(false);
          });
        })
        .catch(err => {
          setIsLoading(false);
          console.log(err);
        });
      setReloadRestaurants(false);
    }
  }, [reloadRestaurants]);

  if (!userLogged) {
    return (
      <View style={{ flex: 1, alignContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#00a680', padding: 20, fontSize: 15 }}>
          Para ver restaurantes favoritos, debe iniciar sesión{'\n'}
        </Text>
        <Button
          buttonStyle={styles.btnViewStyle}
          containerStyle={styles.btnViewContainer}
          title="Iniciar Sesión"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    );
  }

  return (
    <View style={styles.viewBody}>
      <NavigationEvents onWillFocus={() => setReloadRestaurants(true)} />
      {isLoading ? (
        <View style={styles.loaderRestaurants}>
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: 15 }}>Cargando restaurantes favoritos</Text>
        </View>
      ) : (
        <View style={styles.viewBody}>
          {restaurants.length > 0 ? (
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={restaurants}
              renderItem={restaurant => (
                <Restaurant
                  restaurant={restaurant}
                  navigation={navigation}
                  setIsVisibleLoading={setIsVisibleLoading}
                  toastRef={toastRef}
                  setReloadRestaurants={setReloadRestaurants}
                />
              )}
            />
          ) : (
            <View style={styles.loaderRestaurants}>
              <Text>No tiene restaurantes favoritos</Text>
            </View>
          )}
        </View>
      )}
      <Toast
        ref={toastRef}
        position="bottom"
        positionValue={250}
        opacity={0.8}
      />
      <Loading text="Eliminando restaurante" isVisible={isVisibleLoading} />
    </View>
  );
};

const Restaurant = props => {
  const {
    restaurant,
    navigation,
    setIsVisibleLoading,
    toastRef,
    setReloadRestaurants
  } = props;
  const { images, name, id } = restaurant.item.restaurant;
  const [imageRestaurant, setImageRestaurant] = useState(null);
  useEffect(() => {
    const image = images[0];
    firebase
      .storage()
      .ref(`restaurants-images/${image}`)
      .getDownloadURL()
      .then(result => {
        setImageRestaurant(result);
      });
  }, []);

  const confirmRemoveFavourite = id => {
    Alert.alert(
      'Eliminar restaurante de favoritos',
      '¿Seguro quieres eliminar este restaurante de favoritos?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Eliminar',
          onPress: () => removeFromFavourite(id)
        }
      ],
      { cancelable: false }
    );
  };

  const removeFromFavourite = idRestaurant => {
    const idUser = firebase.auth().currentUser.uid;
    setIsVisibleLoading(true);
    db.collection('favourites')
      .where('idRestaurant', '==', idRestaurant)
      .where('idUser', '==', idUser)
      .get()
      .then(response => {
        response.docs.forEach(doc => {
          const favouriteId = doc.id;
          db.collection('favourites')
            .doc(favouriteId)
            .delete()
            .then(() => {
              setIsVisibleLoading(false);
              setReloadRestaurants(true);
              toastRef.current.show('Restaurante eliminado.');
            })
            .then(() => {
              setIsVisibleLoading(false);
              toastRef.current.show('Error, no se pudo eliminar restaurante.');
            });
        });
      })
      .catch(() => {
        setIsVisibleLoading(false);
        toastRef.current.show('Error, no se pudo eliminar restaurante');
      });
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Restaurant', {
          restaurant: restaurant.item.restaurant
        })
      }
    >
      <View style={styles.viewRestaurant}>
        <Image
          resizeMode="cover"
          source={{ uri: imageRestaurant }}
          style={styles.imageRestaurant}
          PlaceholderContent={<ActivityIndicator color="#fff" />}
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Icon
          type="material-community"
          name="heart"
          color="#00a680"
          containerStyle={styles.favourite}
          onPress={() => confirmRemoveFavourite(id)}
          size={30}
          underlayColor="transparent"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
  loaderRestaurants: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center'
  },
  viewRestaurant: {
    margin: 10
  },
  imageRestaurant: {
    width: '100%',
    height: 180
  },
  info: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: -30,
    backgroundColor: '#fff'
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20
  },
  favourite: {
    marginTop: -35,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 100
  },
  btnViewStyle: {
    backgroundColor: '#00a680'
  },
  btnViewContainer: {
    width: '70%'
  }
});

export default Favourites;
