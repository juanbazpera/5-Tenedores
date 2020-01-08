// import liraries
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import { Image } from 'react-native-elements';
import * as firebase from 'firebase';

// create a component
const ListRestaurants = props => {
  const { restaurants, isLoading } = props;

  return (
    <View>
      {restaurants ? (
        <FlatList
          data={restaurants}
          renderItem={restaurant => <Restaurant restaurant={restaurant} />}
          keyExtractor={(item, index) => index.toString()}
          // onEndReached={}
          onEndReachedThreshold={0}
          ListFooterComponent={<FooterList isLoading={isLoading} />}
        />
      ) : (
        <View style={styles.loaderRestaurants}>
          <ActivityIndicator size="large" />
          <Text>Cargando restaurantes</Text>
        </View>
      )}
    </View>
  );
};

const Restaurant = props => {
  const { restaurant } = props;
  const { name, address, description, images } = restaurant.item.restaurant;
  const [imageRestaurant, setImageRestaurant] = useState(null);
  console.log(images);
  useEffect(() => {
    const image = images[0];
    firebase
      .storage()
      .ref(`restaurants-images/${image}/${image}`)
      .getDownloadURL()
      .then(result => {
        setImageRestaurant(result);
      });
  }, []);

  return (
    <TouchableOpacity onPress={console.log('Ir al restaurante')}>
      <View style={styles.viewRestaurant}>
        <View style={styles.viewRestaurantImage}>
          <Image
            resizeMode="cover"
            source={{ uri: imageRestaurant }}
            style={styles.imageRestaurant}
            PlaceholderContent={<ActivityIndicator color="#fff" />}
          />
        </View>
        <View>
          <Text style={styles.restaurantName}>{name}</Text>
          <Text style={styles.restaurantAddress}>{address}</Text>
          <Text style={styles.restaurantDescription}>{description.substring(0, 60)}...</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const FooterList = props => {
  const { isLoading } = props;

  if (isLoading) {
    return (
      <View style={styles.loadingRestaurants}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View style={styles.notFoundRestaurant}>
      <Text>No quedan restaurantes por cargar</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  loadingRestaurants: {
    marginTop: 20,
    alignItems: 'center',
  },
  viewRestaurant: {
    flexDirection: 'row',
    margin: 10,
  },
  viewRestaurantImage: {
    marginRight: 15,
  },
  imageRestaurant: {
    width: 80,
    height: 80,
  },
  restaurantName: {
    fontWeight: 'bold',
  },
  restaurantAddress: {
    paddingTop: 2,
    color: 'grey',
  },
  restaurantDescription: {
    paddingTop: 2,
    color: 'grey',
    width: 300,
  },
  loaderRestaurants: {
    marginTop: 10,
    marginBottom: 10,
  },
  notFoundRestaurant: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
});

// make this component available to the app
export default ListRestaurants;
