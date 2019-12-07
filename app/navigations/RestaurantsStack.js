import { createStackNavigator } from 'react-navigation-stack';

import Restaurants from '../screens/Restaurants';

const restaurantsScreenStack = createStackNavigator({
  Restaurants: {
    screen: Restaurants,
    navigationOptions: () => ({
      title: 'Restaurantes',
    }),
  },
});

export default restaurantsScreenStack;
