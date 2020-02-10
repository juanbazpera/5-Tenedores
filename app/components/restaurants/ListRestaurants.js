// import liraries
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import * as firebase from 'firebase';

import { Image } from 'react-native-elements';

// create a component
const ListRestaurants = props => {
  const { restaurants, isLoading, handleLoadMore, navigation } = props;

  if (restaurants.length) {
    return (
      <View>
        <FlatList
          data={restaurants}
          renderItem={restaurant => (
            <Restaurant restaurant={restaurant} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={2}
          ListFooterComponent={<FooterList isLoading={isLoading} />}
        />
      </View>
    );
  }
  return (
    <View style={styles.loaderRestaurants}>
      <ActivityIndicator size="large" />
      <Text style={{ marginTop: 15 }}>Cargando restaurantes</Text>
    </View>
  );
};

const Restaurant = props => {
  const { restaurant, navigation } = props;
  const { name, address, description, images } = restaurant.item.restaurant;
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

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Restaurant', {
          restaurant: restaurant.item.restaurant
        })
      }
    >
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
          <Text style={styles.restaurantDescription}>
            {description.substring(0, 60)}...
          </Text>
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
    alignItems: 'center'
  },
  loaderRestaurants: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center'
  },
  notFoundRestaurant: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center'
  },
  viewRestaurant: {
    flexDirection: 'row',
    margin: 10
  },
  viewRestaurantImage: {
    marginRight: 15
  },
  imageRestaurant: {
    width: 80,
    height: 80
  },
  restaurantName: {
    fontWeight: 'bold'
  },
  restaurantAddress: {
    paddingTop: 2,
    color: 'grey'
  },
  restaurantDescription: {
    paddingTop: 2,
    color: 'grey',
    width: 300
  }
});

// make this component available to the app
export default ListRestaurants;
