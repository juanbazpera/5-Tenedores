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
  const [userLogged, setUserLogged] = useState();

  firebase.auth().onAuthStateChanged(user => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

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
      {userLogged ? (
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
      ) : (
        <View style={{ flex: 1 }}>
          <Text
            style={{ textAlign: 'center', color: '#00a680', padding: 20 }}
            onPress={() => navigation.navigate('Login')}
          >
            Para escribir un comentario, debe logearse{'\n'}
            <Text style={{ fontWeight: 'bold' }}>
              Pulsa AQUI para iniciar sesion
            </Text>
          </Text>
        </View>
      )}

      <FlatList
        data={reviews}
        renderItem={review => Review(review)}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const Review = props => {
  const { title, review, rating, createAt, avatarUser } = props.item;
  const createDateReview = new Date(createAt.seconds * 1000);
  return (
    <View style={styles.viewReview}>
      <View style={styles.viewImageAvatar}>
        <Avatar
          size="large"
          rounded
          containerStyle={styles.imageAvatarUser}
          source={{
            uri: avatarUser
              ? avatarUser
              : 'https://api.adorable.io/avatars/50/abott@adorable.png'
          }}
        />
      </View>
      <View style={styles.viewInfo}>
        <Text style={styles.reviewTitle}>{title}</Text>
        <Text style={styles.reviewText}>{review}</Text>
        <Rating imageSize={15} startingValue={rating} readonly />
        <Text style={styles.reviewDate}>
          {createDateReview.getDate()}/{createDateReview.getMonth() + 1}/
          {createDateReview.getFullYear()} - {createDateReview.getHours()}:
          {createDateReview.getMinutes() < 10 ? '0' : ''}
          {createDateReview.getMinutes()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnAddReview: {
    backgroundColor: 'transparent'
  },
  btnAddTitleReview: {
    color: '#00a680'
  },
  viewReview: {
    flexDirection: 'row',
    margin: 10,
    paddingBottom: 20,
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: 1
  },
  viewImageAvatar: {
    marginRight: 15
  },
  imageAvatarUser: {
    width: 50,
    height: 50
  },
  viewInfo: {
    flex: 1,
    alignItems: 'flex-start'
  },
  reviewTitle: {
    fontWeight: 'bold'
  },
  reviewText: {
    paddingTop: 2,
    color: '#c3c3c3',
    marginBottom: 5
  },
  reviewDate: {
    marginTop: 5,
    color: '#c3c3c3',
    fontSize: 12,
    position: 'absolute',
    right: 0,
    bottom: 0
  }
});

export default ListReview;
