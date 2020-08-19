import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { Card, Image, Icon, Rating } from 'react-native-elements';

import * as firebase from 'firebase';

const ListTopRestaurants = props => {
  const { restaurants, navigation } = props;
  return (
    <FlatList
      data={restaurants}
      renderItem={restaurant => (
        <Restaurant restaurant={restaurant} navigation={navigation} />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const Restaurant = props => {
  const { restaurant, navigation } = props;
  const { name, description, images, ranking } = restaurant.item;
  const [imageRestaurant, setImageRestaurant] = useState(null);
  const [iconColor, setIconColor] = useState('#000');

  useEffect(() => {
    const image = images[0];
    firebase
      .storage()
      .ref(`restaurants-images/${image}`)
      .getDownloadURL()
      .then(response => {
        setImageRestaurant(response);
      })
      .catch(() =>
        console.log('No se puede obtener la imagen del restaurante')
      );
  }, []);

  useEffect(() => {
    switch (restaurant.index) {
      case 0:
        setIconColor('#efb819');
        break;
      case 1:
        setIconColor('#e3e4e5');
        break;
      case 2:
        setIconColor('#cd7f32');
        break;
      default:
        setIconColor('#000');
        break;
    }
  }, []);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Restaurant', { restaurant: restaurant.item })
      }
    >
      <Card containerStyle={styles.containerCard}>
        <Icon
          type="material-community"
          name="chess-queen"
          color={iconColor}
          size={40}
          containerStyle={styles.containerIcon}
          iconStyle={styles.icon}
        />
        <Image
          style={styles.restauranteImage}
          resizeMode="cover"
          source={{ uri: imageRestaurant }}
        />
        <View style={styles.titleRanking}>
          <Text style={styles.title}>{name}</Text>
          <Rating
            imageSize={20}
            startingValue={ranking}
            readonly
            style={styles.rating}
          />
        </View>
        <Text style={styles.description}>{description}</Text>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerCard: {
    marginBottom: 30,
    borderWidth: 0
  },
  restauranteImage: {
    width: '100%',
    height: 200
  },
  titleRanking: {
    flexDirection: 'row',
    marginTop: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  rating: {
    position: 'absolute',
    right: 0
  },
  description: {
    color: 'gray',
    marginTop: 0,
    textAlign: 'justify'
  },
  containerIcon: {
    position: 'absolute',
    top: 5,
    left: 5,
    zIndex: 1,
    shadowColor: 'white',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 1
    }
  }
});

export default ListTopRestaurants;
