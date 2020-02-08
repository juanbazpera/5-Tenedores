import { createStackNavigator } from 'react-navigation-stack';

import Restaurants from '../screens/restaurants/Restaurants';
import AddRestaurant from '../screens/restaurants/AddRestaurant';
import Restaurant from '../screens/restaurants/Restaurant';
import AddReviewRestaurant from '../screens/restaurants/AddReviewRestaurant';

const restaurantsScreenStack = createStackNavigator({
  Restaurants: {
    screen: Restaurants,
    navigationOptions: () => ({
      title: 'Restaurantes'
    })
  },
  AddRestaurant: {
    screen: AddRestaurant,
    navigationOptions: () => ({
      title: 'Nuevo Restaurante'
    })
  },
  Restaurant: {
    screen: Restaurant,
    navigationOptions: props => ({
      title: props.navigation.state.params.restaurant.item.restaurant.name
    })
  },
  AddReviewRestaurant: {
    screen: AddReviewRestaurant,
    navigationOptions: () => ({
      title: 'Nuevo comentario'
    })
  }
});

export default restaurantsScreenStack;
