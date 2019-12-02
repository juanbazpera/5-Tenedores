// import liraries
import React from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';

import MyAccountGuest from '../../components/MyAccount/MyAccountGuest';
import MyAccountUser from '../../components/MyAccount/MyAccountUser';

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
      return <MyAccountUser logout={this.logout} />;
    }
    return <MyAccountGuest goToScreen={this.goToScreen} />;
  }
}

MyAccount.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func })
    .isRequired,
};
