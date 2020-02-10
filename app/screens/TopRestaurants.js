// import liraries
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Toast from 'react-native-easy-toast';

import { firebaseApp } from '../utils/FireBase';
import firebase from 'firebase/app';
import 'firebase/firestore';

import ListTopRestaurants from '../components/ranking/ListTopRestaurants';

const db = firebase.firestore(firebaseApp);

export default function TopRestaurants(props) {
  const { navigation } = props;
  const [restaurants, setRestaurants] = useState([]);
  const toastRef = useRef();

  useEffect(() => {
    (async () => {
      db.collection('restaurants')
        .orderBy('rating', 'desc')
        .limit(5)
        .get()
        .then(response => {
          const restaurantArray = [];
          response.forEach(doc => {
            let restaurant = doc.data();
            restaurant.id = doc.id;
            restaurantArray.push(restaurant);
          });
          setRestaurants(restaurantArray);
        })
        .catch(err => {
          console.log(err);
          toastRef.current.show('Error al cargar el ranking.', 3000);
        });
    })();
  }, []);
  return (
    <View style={styles.viewBody}>
      <ListTopRestaurants restaurants={restaurants} navigation={navigation} />
      <Toast
        ref={toastRef}
        position="bottom"
        positionValue={250}
        opacity={0.8}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
