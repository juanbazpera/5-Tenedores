import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { Rating, Icon, ListItem } from 'react-native-elements';
import * as firebase from 'firebase';
import 'firebase/firestore';

import Banner from '../../components/Banner';
import Map from '../../components/Map';
import ListReview from '../../components/restaurants/ListReview';

const screenWidth = Dimensions.get('window').width;

const Restaurant = props => {
  const { navigation } = props;
  const { restaurant } = navigation.state.params.restaurant.item;
  const [imageRestaurant, setImageRestaurant] = useState([]);
  const [rating, setRating] = useState(restaurant.rating);

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

  return (
    <ScrollView style={styles.viewBody}>
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
    </ScrollView>
  );
};

export default Restaurant;

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
  }
});
