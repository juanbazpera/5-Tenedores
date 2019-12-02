import { createStackNavigator } from 'react-navigation-stack';

import TopRestaurants from '../screens/TopRestaurants';

const topRestaurantsScreenStack = createStackNavigator({
  TopRestaurants: {
    screen: TopRestaurants,
    navigationOptions: () => ({
      title: 'Top Restaurantes',
    }),
  },
});

export default topRestaurantsScreenStack;
