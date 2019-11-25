// import liraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';

import MyAccountGuest from '../../components/MyAccount/MyAccountGuest';

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class MyAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
    };
    this.toastRef = null;
  }

  async componentDidMount() {
    await firebase.auth().onAuthStateChanged(login => {
      if (login) {
        this.setState({ login: true });
        // console.log(logged);
      } else {
        this.setState({ login: false });
      }
    });
  }

  setToastRef = ref => {
    this.toastRef = ref;
  };

  goToScreen = nameScreen => {
    const { navigation } = this.props;
    navigation.navigate(nameScreen);
  };

  logout = () => {
    firebase.auth().signOut();
  };

  render() {
    const { login } = this.state;
    if (login) {
      return (
        <View style={styles.viewBody}>
          <Text>Logueado correctamente</Text>
          <Button
            title="Cerrar sesion"
            onPress={() => this.logout()}
          />
        </View>
      );
    }
    return <MyAccountGuest goToScreen={this.goToScreen} />;
  }
}

MyAccount.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func })
    .isRequired,
};
