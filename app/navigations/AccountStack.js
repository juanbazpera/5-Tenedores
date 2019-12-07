import { createStackNavigator } from 'react-navigation-stack';

// Screens MyAccount
import MyAccount from '../screens/account/MyAccount';
import Register from '../screens/account/Register';
import Login from '../screens/account/Login';

const accountScreenStack = createStackNavigator({
  MyAccount: {
    screen: MyAccount,
    navigationOptions: () => ({
      title: 'Mi cuenta',
    }),
  },
  Register: {
    screen: Register,
    navigationOptions: () => ({
      title: 'Registro',
    }),
  },
  Login: {
    screen: Login,
    navigationOptions: () => ({
      title: 'Login',
    }),
  },
});

export default accountScreenStack;
