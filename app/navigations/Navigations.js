/* eslint-disable react/prop-types */
import React from 'react';
import { createAppContainer } from 'react-navigation';
import restaurantsScreenStack from './RestaurantsStack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon } from 'react-native-elements';

import firebase from 'firebase/app';

import topRestaurantsScreenStack from './TopRestaurantsStack';
import searchScreenStack from './SearchStack';
import accountScreenStack from './AccountStack';
import favouritesScreenStack from './FavouritesStack';

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
        )
      })
    },
    Favourites: {
      screen: favouritesScreenStack,
      navigationOptions: () => ({
        tabBarLabel: 'Favoritos',
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="heart-outline"
            type="material-community"
            size={22}
            color={tintColor}
          />
        )
      })
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
        )
      })
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
        )
      })
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
        )
      })
    }
  },
  {
    // Si initialRouteName y Order no estan definidas toma el orden
    // que se declararon anteriormente
    initialRouteName: 'Restaurants',
    order: ['Restaurants', 'Favourites', 'TopRestaurants', 'Search', 'Account'],
    tabBarOptions: {
      inactiveTintColor: '#646464',
      activeTintColor: '#00A680'
    }
  }
);

export default createAppContainer(RootStack);
