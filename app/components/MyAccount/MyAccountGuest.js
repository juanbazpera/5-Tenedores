import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import { Button, Image } from 'react-native-elements';

import backgroundImage from '../../../assets/img/image-my-account-guest-01.jpg';

export default function MyAccountGuest(props) {
  const { goToScreen } = props;
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={backgroundImage}
        PlaceholderContent={<ActivityIndicator />}
        resizeMode="contain"
      />
      <Text style={styles.title}>
        Consulta tu perfil de 5 Tenedores
      </Text>
      <Text style={styles.description}>
        ¿Como describirias tu mejor restaurante? Busca y visualiza los
        mejores restaurantes de una forma sencilla, vota cual te ha
        gustado mas y comenta como ha sido tu experiencia.
      </Text>
      <Button
        buttonStyle={styles.btnViewProfile}
        title="Ver tu perfil"
        onPress={() => goToScreen('Login')}
      />
    </View>
  );
}

MyAccountGuest.propTypes = {
  goToScreen: PropTypes.func.isRequired,
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  },
  image: {
    height: 300,
    width: 300,
    marginBottom: 40,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 19,
    marginBottom: 10,
  },
  description: {
    lineHeight: 15,
    textAlign: 'center',
    marginBottom: 20,
  },
  btnViewProfile: {
    width: 200,
    backgroundColor: '#00a680',
  },
});
