import React from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import PropTypes from 'prop-types';
import { Button, Image } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

import backgroundImage from '../../../assets/img/image-my-account-guest-01.jpg';

function UserGuest(props) {
  const { navigation } = props;
  return (
    <ScrollView style={styles.container} centerContent>
      <Image
        style={styles.image}
        source={backgroundImage}
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
      <View style={styles.viewBtn}>
        <Button
          buttonStyle={styles.btnViewStyle}
          containerStyle={styles.btnViewContainer}
          title="Ver tu perfil"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </ScrollView>
  );
}

UserGuest.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func })
    .isRequired,
};

// define your styles
const styles = StyleSheet.create({
  container: {
    marginLeft: 30,
    marginRight: 30,
  },
  image: {
    height: 300,
    width: '100%',
    marginBottom: 40,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 19,
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    lineHeight: 15,
    textAlign: 'center',
    marginBottom: 20,
  },
  viewBtn: {
    flex: 1,
    alignItems: 'center',
  },
  btnViewStyle: {
    backgroundColor: '#00a680',
  },
  btnViewContainer: {
    width: '70%',
  },
});

export default withNavigation(UserGuest);
