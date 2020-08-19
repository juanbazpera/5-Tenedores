import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { Rating, Icon, ListItem } from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import { firebaseApp } from '../../utils/FireBase';
import firebase from 'firebase/app';
import 'firebase/firestore';

import Banner from '../../components/Banner';
import Map from '../../components/Map';
import ListReview from '../../components/restaurants/ListReview';

const screenWidth = Dimensions.get('window').width;

const db = firebase.firestore(firebaseApp);

const Restaurant = props => {
  const { navigation } = props;
  const { restaurant } = navigation.state.params;
  const [imageRestaurant, setImageRestaurant] = useState([]);
  const [rating, setRating] = useState(restaurant.rating);
  const [isFavourite, setIsFavourite] = useState(false);
  const [userLogged, setUserLogged] = useState(false);
  const toastRef = useRef();

  firebase.auth().onAuthStateChanged(user => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  useEffect(() => {
    const arrayUrls = [];
    (async () => {
      await Promise.all(
        restaurant.images.map(async idImage => {
          await firebase
            .storage()
            .ref(`restaurants-images/${idImage}`)
            .getDownloadURL()
            .then(imageUrl => {
              arrayUrls.push(imageUrl);
            });
        })
      );
      setImageRestaurant(arrayUrls);
    })();
  }, []);

  useEffect(() => {
    if (userLogged) {
      db.collection('favourites')
        .where('idRestaurant', '==', restaurant.id)
        .where('idUser', '==', firebase.auth().currentUser.uid)
        .get()
        .then(response => {
          if (response.docs.length === 1) {
            setIsFavourite(true);
          }
        });
    }
  }, []);

  const AddToFavourite = () => {
    const payload = {
      idUser: firebase.auth().currentUser.uid,
      idRestaurant: restaurant.id
    };
    db.collection('favourites')
      .add(payload)
      .then(() => {
        setIsFavourite(true);
        toastRef.current.show('Restaurante agregado a Favoritos.');
      })
      .catch(err => {
        console.log(err);
        toastRef.current.show('Error al añadir el restaurante a favoritos.');
      });
  };

  const removeFavourite = () => {
    db.collection('favourites')
      .where('idRestaurant', '==', restaurant.id)
      .where('idUser', '==', firebase.auth().currentUser.uid)
      .get()
      .then(response => {
        response.forEach(doc => {
          const idRestaurant = doc.id;
          db.collection('favourites')
            .doc(idRestaurant)
            .delete()
            .then(() => {
              setIsFavourite(false);
              toastRef.current.show('Restaurante quitado de Favoritos.');
            })
            .catch(err => {
              console.log(err);
              toastRef.current.show(
                'Error al quitar restaurante de favoritos.'
              );
            });
        });
      })
      .catch(() => {
        toastRef.current.show('Error al quitar restaurante de favoritos.');
      });
  };

  return (
    <ScrollView style={styles.viewBody}>
      {userLogged && (
        <View style={styles.viewFavourite}>
          <Icon
            type="material-community"
            name={isFavourite ? 'heart' : 'heart-outline'}
            onPress={isFavourite ? removeFavourite : AddToFavourite}
            size={35}
            color={isFavourite ? '#00a680' : '#000'}
            underlayColor="transparent"
          />
        </View>
      )}
      <Banner arrayImages={imageRestaurant} width={screenWidth} height={200} />
      <TitleRestaurant
        name={restaurant.name}
        description={restaurant.description}
        rating={rating}
      />
      <RestaurantInfo
        location={restaurant.location}
        name={restaurant.name}
        address={restaurant.address}
      />
      <ListReview
        setRating={setRating}
        navigation={navigation}
        idRestaurant={restaurant.id}
      />
      <Toast
        ref={toastRef}
        position="bottom"
        positionValue={250}
        opacity={0.8}
      />
    </ScrollView>
  );
};

const TitleRestaurant = props => {
  const { name, description, rating } = props;

  return (
    <View style={styles.viewRestaurantTitle}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.nameRestaurant}>{name}</Text>
        <Rating
          style={styles.rating}
          imageSize={20}
          readonly
          startingValue={parseFloat(rating)}
        />
      </View>
      <Text style={styles.descriptionRestaurant}>{description}</Text>
    </View>
  );
};

const RestaurantInfo = props => {
  const { location, name, address } = props;

  const listInfo = [
    {
      text: address,
      iconName: 'map-marker',
      iconType: 'material-community',
      action: null
    }
  ];

  return (
    <View style={styles.viewRestaurantInfo}>
      <Text style={styles.restaurantInfoTitle}>
        Informacion sobre el restaurante
      </Text>
      <Map location={location} name={name} height={100} />
      {listInfo.map((item, index) => (
        <ListItem
          key={index}
          title={item.text}
          leftIcon={{
            name: item.iconName,
            type: item.iconType,
            color: '#00a680'
          }}
          containerStyle={styles.containerListItem}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  viewRestaurantTitle: {
    margin: 15
  },
  nameRestaurant: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  rating: {
    position: 'absolute',
    right: 0
  },
  descriptionRestaurant: {
    marginTop: 15,
    color: 'grey'
  },
  viewRestaurantInfo: {
    margin: 15,
    marginTop: 25
  },
  restaurantInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  containerListItem: {
    borderBottomColor: '#d8d8d8',
    borderBottomWidth: 1
  },
  viewFavourite: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: 'white',
    borderBottomLeftRadius: 100,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 5
  }
});

export default Restaurant;
