import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon } from 'react-native-elements';

// Screens
import Home from '../screens/Home';
import Search from '../screens/Search';
import TopFive from '../screens/TopFive';

// Screens MyAccount
import MyAccount from '../screens/myaccount/MyAccount';
import Register from '../screens/myaccount/Register';
import Login from '../screens/myaccount/Login';

const homeScreenStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: 'Home',
    }),
  },
});

const topFiveScreenStack = createStackNavigator({
  TopFive: {
    screen: TopFive,
    navigationOptions: ({ navigation }) => ({
      title: 'Top 5 Restaurantes',
    }),
  },
});

const searchScreenStack = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: ({ navigation }) => ({
      title: 'Buscar',
    }),
  },
});

const myAccountScreenStack = createStackNavigator({
  MyAccount: {
    screen: MyAccount,
    navigationOptions: ({ navigation }) => ({
      title: 'Mi cuenta',
    }),
  },
  Register: {
    screen: Register,
    navigationOptions: ({ navigation }) => ({
      title: 'Registro',
    }),
  },
  Login: {
    screen: Login,
    navigationOptions: ({ navitagion }) => ({
      title: 'Login',
    }),
  },
});

const RootStack = createBottomTabNavigator(
  {
    Home: {
      screen: homeScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: 'Home',
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
    TopFive: {
      screen: topFiveScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: 'Top 5',
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
      navigationOptions: ({ navigation }) => ({
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
    MyAccount: {
      screen: myAccountScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: 'Mi cuenta',
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
    initialRouteName: 'MyAccount',
    order: ['Home', 'TopFive', 'Search', 'MyAccount'],
    tabBarOptions: {
      inactiveTintColor: '#646464',
      activeTintColor: '#00A680',
    },
  },
);

export default createAppContainer(RootStack);
