import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { Image } from 'react-native-elements';

import firebase from 'firebase/app';

const RestaurantRender = props => {
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
      onPress={() => navigation.navigate('Restaurant', { restaurant })}
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

const styles = StyleSheet.create({
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

export default RestaurantRender;
