import { createStackNavigator } from 'react-navigation-stack';

import Search from '../screens/Search';

const searchScreenStack = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: () => ({
      title: 'Buscar',
    }),
  },
});

export default searchScreenStack;
