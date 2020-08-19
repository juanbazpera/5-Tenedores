// import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Images, Image } from 'react-native';
import { SearchBar, ListItem, Icon } from 'react-native-elements';
import { useDebouncedCallback } from 'use-debounce';
import { FireSQL } from 'firesql';
import firebase from 'firebase/app';

const fireSQL = new FireSQL(firebase.firestore(), { includeId: 'id' });

export default function Search(props) {
  const { navigation } = props;
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    console.log(search);
    if (search) {
      fireSQL
        .query(`SELECT * FROM restaurants WHERE name LIKE '${search}%'`)
        .then(response => setRestaurants(response));
    }
  }, [search]);

  return (
    <View style={styles.viewBody}>
      <SearchBar
        placeholder="Busca tu restaurante..."
        onChangeText={e => setSearch(e)}
        value={search}
        containerStyle={styles.searchBar}
      />
      {restaurants.length === 0 ? (
        <NotFondRestaurant />
      ) : (
        <FlatList
          data={restaurants}
          renderItem={restaurant => (
            <Restaurant restaurant={restaurant} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}

const Restaurant = props => {
  const { restaurant, navigation } = props;
  const { name, images } = restaurant.item;
  const [imageRestaurant, setImageRestaurant] = useState(null);

  useEffect(() => {
    onSearch();
  }, [search]);

  const [onSearch] = useDebouncedCallback(() => {
    const image = images[0];
    firebase
      .storage()
      .ref(`restaurants-images/${image}`)
      .getDownloadURL()
      .then(response => {
        setImageRestaurant(response);
      })
      .catch(() =>
        console.log('No se puede obtener la imagen del restaurante.')
      );
  }, 300);

  return (
    <ListItem
      title={name}
      leftAvatar={{ source: { uri: imageRestaurant } }}
      rightIcon={<Icon type="material-community" name="chevron-right" />}
      onPress={() =>
        navigation.navigate('Restaurant', { restaurant: restaurant.item })
      }
    />
  );
};

const NotFondRestaurant = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Image
        source={require('../../assets/img/no-result-found.png')}
        resizeMode="cover"
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  searchBar: {
    marginBottom: 20
  }
});
