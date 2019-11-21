// import liraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default class MyAccount extends React.Component {
  constructor(props) {
    super(props);
  }

  goToScreen = nameScreen => {
    const { navigation } = this.props;
    navigation.navigate(nameScreen);
  };

  render() {
    return (
      <View style={styles.viewBody}>
        <Text>MyAccount Screen...</Text>
        <Button
          title="Registro"
          onPress={() => this.goToScreen('Register')}
        ></Button>
        <Button title="Login" onPress={() => this.goToScreen('Login')}></Button>
      </View>
    );
  }
}
