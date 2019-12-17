// import liraries
import React, { useRef } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-easy-toast';
import { withNavigation } from 'react-navigation';
import { Image } from 'react-native-elements';

import LogoImage from '../../../assets/img/5-tenedores-letras-icono-logo.png';
import RegisterForm from '../../components/account/RegisterForm';

function Register() {
  const toastRef = useRef();

  return (
    <View style={styles.viewBody}>
      <View style={styles.imageViewStyle}>
        <Image source={LogoImage} style={styles.logo} PlaceholderContent={<ActivityIndicator />} resizeMode="contain" />
      </View>
      <RegisterForm toastRef={toastRef} />
      <Toast ref={toastRef} position="bottom" positionValue={150} opacity={0.8} />
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
  },
  logo: {
    width: 200,
    height: 200,
  },
  imageViewStyle: {
    alignItems: 'center',
    marginLeft: 40,
    marginRight: 40,
    marginTop: 30,
  },
});

export default withNavigation(Register);
