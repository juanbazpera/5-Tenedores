// import liraries
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from 'react-native';
import RestaurantRender from './RestaurantRender';

// create a component
const ListRestaurants = props => {
  const { restaurants, isLoading, handleLoadMore, navigation } = props;

  if (restaurants.length) {
    return (
      <View>
        <FlatList
          data={restaurants}
          renderItem={restaurant => (
            <RestaurantRender restaurant={restaurant} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={2}
          ListFooterComponent={<FooterList isLoading={isLoading} />}
        />
      </View>
    );
  }
  return (
    <View style={styles.loaderRestaurants}>
      <ActivityIndicator size="large" />
      <Text style={{ marginTop: 15 }}>Cargando restaurantes</Text>
    </View>
  );
};

const FooterList = props => {
  const { isLoading } = props;

  if (isLoading) {
    return (
      <View style={styles.loadingRestaurants}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View style={styles.notFoundRestaurant}>
      <Text>No quedan restaurantes por cargar</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  loadingRestaurants: {
    marginTop: 20,
    alignItems: 'center'
  },
  loaderRestaurants: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center'
  },
  notFoundRestaurant: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center'
  }
});

// make this component available to the app
export default ListRestaurants;
