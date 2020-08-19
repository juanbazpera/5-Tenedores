import React, { useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Toast from 'react-native-easy-toast';
import Loading from '../../components/Loading';
import AddRestaurantForm from '../../components/restaurants/AddRestaurantForm';

// create a component
const AddRestaurant = props => {
  const { navigation } = props;
  const { setIsReloadRestaurants } = navigation.state.params;
  const toastRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <View style={styles.container}>
      <AddRestaurantForm
        navigation={navigation}
        toastRef={toastRef}
        setIsLoading={setIsLoading}
        setIsReloadRestaurants={setIsReloadRestaurants}
      />
      <Loading isVisible={isLoading} text="Creando restaurante" />
      <Toast
        ref={toastRef}
        position="bottom"
        positionValue={150}
        opacity={0.8}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default AddRestaurant;
