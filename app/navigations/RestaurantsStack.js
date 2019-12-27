import { createStackNavigator } from 'react-navigation-stack';

import Restaurants from '../screens/restaurants/Restaurants';
import AddRestaurant from '../screens/restaurants/AddRestaurant';

const restaurantsScreenStack = createStackNavigator({
  Restaurants: {
    screen: Restaurants,
    navigationOptions: () => ({
      title: 'Restaurantes',
    }),
  },
  AddRestaurant: {
    screen: AddRestaurant,
    navigationOptions: () => ({
      title: 'Nuevo Restaurante',
    }),
  },
});

export default restaurantsScreenStack;
