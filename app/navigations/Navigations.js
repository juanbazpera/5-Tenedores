import React from 'react';
import { createAppContainer } from 'react-navigation';
import PropTypes from 'prop-types';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon } from 'react-native-elements';

import restaurantsScreenStack from './RestaurantsStack';
import topRestaurantsScreenStack from './TopRestaurantsStack';
import searchScreenStack from './SearchStack';
import accountScreenStack from './AccountStack';

const RootStack = createBottomTabNavigator(
  {
    Restaurants: {
      screen: restaurantsScreenStack,
      navigationOptions: () => ({
        tabBarLabel: 'Restaurantes',
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="compass-outline"
            type="material-community"
            size={22}
            color={tintColor}
          />
        ),
      }),
    },
    TopRestaurants: {
      screen: topRestaurantsScreenStack,
      navigationOptions: () => ({
        tabBarLabel: 'Ranking',
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="star-outline"
            type="material-community"
            size={22}
            color={tintColor}
          />
        ),
      }),
    },
    Search: {
      screen: searchScreenStack,
      navigationOptions: () => ({
        tabBarLabel: 'Buscar',
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="magnify"
            type="material-community"
            size={22}
            color={tintColor}
          />
        ),
      }),
    },
    Account: {
      screen: accountScreenStack,
      navigationOptions: () => ({
        tabBarLabel: 'Cuenta',
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="account-outline"
            type="material-community"
            size={22}
            color={tintColor}
          />
        ),
      }),
    },
  },
  {
    // Si initialRouteName y Order no estan definidas toma el orden
    // que se declararon anteriormente
    initialRouteName: 'Account',
    order: ['Restaurants', 'TopRestaurants', 'Search', 'Account'],
    tabBarOptions: {
      inactiveTintColor: '#646464',
      activeTintColor: '#00A680',
    },
  },
);

RootStack.proptypes = {
  tintColor: PropTypes.string.isRequired,
};

export default createAppContainer(RootStack);
