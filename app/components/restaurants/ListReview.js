import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Button, Avatar, Rating } from 'react-native-elements';

import { firebaseApp } from '../../utils/FireBase';
import firebase from 'firebase/app';
import 'firebase/firestore';

const db = firebase.firestore(firebaseApp);

const ListReview = props => {
  const { navigation, idRestaurant, setRating } = props;
  const [reviews, setReviews] = useState([]);
  const [reviewReload, setReviewReload] = useState(false);

  useEffect(() => {
    (async () => {
      const resultReviews = [];
      const arrayRatings = [];

      db.collection('reviews')
        .where('idRestaurant', '==', idRestaurant)
        .get()
        .then(response => {
          response.forEach(doc => {
            const review = doc.data();
            resultReviews.push(review);
            arrayRatings.push(review.rating);
          });
          let numSum = 0;
          arrayRatings.map(value => {
            numSum = numSum + value;
          });
          const conutRating = arrayRatings.length;
          const resultRating = numSum / conutRating;

          const resultRatingFinish = resultRating ? resultRating : 0;
          setReviews(resultReviews);
          setRating(resultRatingFinish);
        });

      setReviewReload(false);
    })();
  }, [reviewReload]);

  return (
    <View>
      {firebase.auth().currentUser && (
        <Button
          title="Agregar opinion"
          buttonStyle={styles.btnAddReview}
          titleStyle={styles.btnAddTitleReview}
          icon={{
            type: 'material-community',
            name: 'square-edit-outline',
            color: '#00a680'
          }}
          onPress={() =>
            navigation.navigate('AddReviewRestaurant', {
              idRestaurant,
              setReviewReload
            })
          }
        />
      )}

      <Text>Lista de comentarios</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  btnAddReview: {
    backgroundColor: 'transparent'
  },
  btnAddTitleReview: {
    color: '#00a680'
  }
});

export default ListReview;
