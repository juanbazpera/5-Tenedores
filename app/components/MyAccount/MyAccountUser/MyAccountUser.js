import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';

// create a component
export default function MyAccountUser(props) {
  const { logout } = props;
  return (
    <View style={styles.container}>
      <Text>Logueado correctamente</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  },
});
