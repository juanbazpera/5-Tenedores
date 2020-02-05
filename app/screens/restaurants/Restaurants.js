// import liraries
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import PropTypes from 'prop-types';

import ListRestaurants from '../../components/restaurants/ListRestaurants';

import firebase from '../../utils/FireBase';

const db = firebase.firestore();

// create a component
export default function Restaurants(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [startRestaurants, setStartRestaurants] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalRestaurants, setTotalRestaurants] = useState(0);
  const [isReloadRestaurants, setIsReloadRestaurants] = useState(false);
  const limitRestaurants = 8;

  useEffect(() => {
    firebase.auth().onAuthStateChanged(userInfo => {
      setUser(userInfo);
    });
  }, []);

  useEffect(() => {
    db.collection('restaurants')
      .get()
      .then(snap => {
        setTotalRestaurants(snap.size);
      });

    const getRestaurants = async () => {
      setIsLoading(true);
      const resultRestaurants = [];

      const restaurantsResult = db
        .collection('restaurants')
        .orderBy('createAt', 'desc')
        .limit(limitRestaurants);

      await restaurantsResult
        .get()
        .then(response => {
          setStartRestaurants(response.docs[response.docs.length - 1]);
          let restaurant = null;
          response.forEach(doc => {
            restaurant = doc.data();
            restaurant.id = doc.id;
            resultRestaurants.push({ restaurant });
          });
          setRestaurants(resultRestaurants);
        })
        .catch(error => {
          console.log('Error: ', error);
        });
      setIsLoading(false);
    };

    getRestaurants();
    setIsReloadRestaurants(false);
  }, [isReloadRestaurants]);

  const handleLoadMore = async () => {
    const resultRestaurants = [];
    if (restaurants.length < totalRestaurants) setIsLoading(true);

    const restaurantsDb = db
      .collection('restaurants')
      .orderBy('createAt', 'desc')
      .startAfter(startRestaurants.data().createAt)
      .limit(limitRestaurants);

    await restaurantsDb.get().then(response => {
      if (response.docs.length > 0) {
        setStartRestaurants(response.docs[response.docs.length - 1]);
      } else {
        setIsLoading(false);
      }

      response.forEach(doc => {
        let restaurant = doc.data();
        restaurant.id = doc.id;
        resultRestaurants.push({ restaurant });
      });
      setRestaurants([...restaurants, ...resultRestaurants]);
    });
  };

  return (
    <View style={styles.viewBody}>
      <ListRestaurants
        restaurants={restaurants}
        isLoading={isLoading}
        handleLoadMore={handleLoadMore}
      />
      {user && (
        <AddRestaurantButton
          navigation={navigation}
          setIsReloadRestaurants={setIsReloadRestaurants}
        />
      )}
    </View>
  );
}

const AddRestaurantButton = props => {
  const { navigation, setIsReloadRestaurants } = props;
  return (
    <ActionButton
      buttonColor="#00a680"
      onPress={() => navigation.navigate('AddRestaurant', { setIsReloadRestaurants })}
    />
  );
};

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
  },
});

Restaurants.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

AddRestaurantButton.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
