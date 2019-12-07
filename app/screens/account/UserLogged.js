import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';

import UserInfo from '../../components/MyAccount/MyAccountUser/UserInfo';

// create a component
export default function MyAccountUser(props) {
  const { logout } = props;
  return (
    <View style={styles.container}>
      <UserInfo />
      <Button title="Cerrar sesion" onPress={() => logout()} />
    </View>
  );
}

MyAccountUser.propTypes = {
  logout: PropTypes.func.isRequired,
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
