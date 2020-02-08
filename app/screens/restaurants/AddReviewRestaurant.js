import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AirbnbRating, Button, Input } from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import Loading from '../../components/Loading';

import { firebaseApp } from '../../utils/FireBase';
import firebase from 'firebase/app';
import 'firebase/firestore';
const db = firebase.firestore(firebaseApp);

const AddReviewRestaurant = props => {
  const { navigation } = props;
  const { idRestaurant, setReviewReload } = navigation.state.params;
  const [rating, setRating] = useState(null);
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toastRef = useRef();

  const addReview = () => {
    if (!rating) {
      toastRef.current.show('Debe dar una puntuación.');
      return;
    }
    if (!title) {
      toastRef.current.show('Debe indicar un titulo.');
      return;
    }
    if (!review) {
      toastRef.current.show('Debe escribir un comentario.');
      return;
    }
    setIsLoading(true);
    const user = firebase.auth().currentUser;
    const payload = {
      idUser: user.uid,
      avatarUser: user.photoURL,
      idRestaurant,
      title,
      review,
      rating,
      createAt: new Date()
    };

    db.collection('reviews')
      .add(payload)
      .then(() => updateRestaurant())
      .catch(err => {
        console.log(err);
        toastRef.current.show(
          'Error al enviar la review, intentelo mas tarde.'
        );
      });
  };

  const updateRestaurant = () => {
    const restaurantRef = db.collection('restaurants').doc(idRestaurant);
    restaurantRef
      .get()
      .then(response => {
        const restaurantData = response.data();
        const ratingTotal = restaurantData.ratingTotal + rating;
        const quantityVoting = restaurantData.quantityVoting + 1;
        const ratingResult = ratingTotal / quantityVoting;
        restaurantRef
          .update({
            rating: ratingResult,
            ratingTotal,
            quantityVoting
          })
          .then(() => {
            setIsLoading(false);
            setReviewReload(true);
            navigation.goBack();
          })
          .catch(err => console.log('No se puede actualizar el rating', err));
      })
      .catch(() => console.log('No se puede actualizar el rating'));
    setIsLoading(false);
  };

  return (
    <View style={styles.viewBody}>
      <View style={styles.viewRating}>
        <AirbnbRating
          count={5}
          reviews={['Pésimo', 'Deficiente', 'Normal', 'Muy bueno', 'Excelente']}
          defaultRating={0}
          size={30}
          onFinishRating={value => setRating(value)}
        />
      </View>
      <View style={styles.formReview}>
        <Input
          placeholder="Titulo"
          onChange={e => setTitle(e.nativeEvent.text)}
        />
        <Input
          placeholder="Comentario"
          multiline
          inputContainerStyle={styles.textArea}
          onChange={e => setReview(e.nativeEvent.text)}
        />
        <Button
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          title="Enviar comentario"
          onPress={addReview}
        />
      </View>
      <Toast
        ref={toastRef}
        position="bottom"
        positionValue={150}
        opacity={0.8}
      />
      <Loading isVisible={isLoading} text="Enviando comentario." />
    </View>
  );
};

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  viewRating: {
    height: 90,
    backgroundColor: '#f2f2f2'
  },
  formReview: {
    margin: 10,
    marginTop: 40,
    flex: 1,
    alignItems: 'center'
  },
  textArea: {
    height: 150,
    width: '100%',
    padding: 0,
    margin: 0
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '95%',
    marginTop: 20,
    marginBottom: 10
  },
  btn: {
    backgroundColor: '#00a680'
  }
});

export default AddReviewRestaurant;
