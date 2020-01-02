// import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import PropTypes from 'prop-types';

import firebase from '../../utils/FireBase';

const AddRestaurantButton = props => {
  const { navigation } = props;
  return (
    <ActionButton buttonColor="#00a680" onPress={() => navigation.navigate('AddRestaurant')} />
  );
};

// create a component
export default function Restaurants(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(userInfo => {
      setUser(userInfo);
    });
  }, []);

  return (
    <View style={styles.viewBody}>
      <Text>Home Screen...</Text>
      {user && <AddRestaurantButton navigation={navigation} />}
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
