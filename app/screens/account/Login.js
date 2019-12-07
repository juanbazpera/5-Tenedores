/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  Image,
  Button,
  Divider,
  SocialIcon,
} from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import t from 'tcomb-form-native';
import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import Toast from 'react-native-easy-toast';
import * as log from 'loglevel';

import LogoImage from '../../../assets/img/5-tenedores-letras-icono-logo.png';
import { LoginOption, LoginStruct } from '../../forms/Login';
import facebookApi from '../../utils/Social';

const { Form } = t.form;

function Login(props) {
  const loginStruct = LoginStruct;
  const loginOption = LoginOption;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrorMessage, setFormErrorMessage] = useState('');
  const [formRef, setFormRef] = useState('');
  const [toastRef, setToastRef] = useState('');

  const onChangeFormLogin = formDataValue => {
    setFormData(formDataValue);
    setFormErrorMessage('');
  };

  const loginEmail = () => {
    const validate = formRef.props.value;
    if (!validate) {
      setFormErrorMessage('Email o contraseña no valido');
    } else {
      setFormErrorMessage('');
      firebase
        .auth()
        .signInWithEmailAndPassword(validate.email, validate.password)
        .then(() => {
          // console.log(sucess);
          toastRef.show('Login correcto', 250, () => {
            const { navigation } = props;
            navigation.goBack();
          });
        })
        .catch(() => {
          // console.log(error.code);
          setFormErrorMessage('Login incorrecto');
        });
    }
  };

  const loginFacebook = async () => {
    try {
      const {
        type,
        token,
      } = await Facebook.logInWithReadPermissionsAsync(
        facebookApi.application_id,
        { permissions: facebookApi.permission },
      );
      if (type === 'success') {
        const credentials = firebase.auth.FacebookAuthProvider.credential(
          token,
        );
        let userName = null;
        try {
          const response = await fetch(
            `https://graph.facebook.com/me?access_token=${token}`,
          );
          userName = `Inicio de sesion para ${
            (await response.json()).name
          }!`;
        } catch (ex) {
          log.trace(ex);
          log.error('No se pudo obtener el nombre de usuario');
        }
        firebase
          .auth()
          .signInWithCredential(credentials)
          .then(() => {
            toastRef.show(
              userName !== null
                ? userName
                : 'Inicio de sesion exitoso!',
              300,
              () => {
                const { navigation } = props;
                navigation.goBack();
              },
            );
          })
          .catch(err => {
            toastRef.show(
              'Error accediendo con Facebook, intentelo mas tarde',
              300,
            );
            log.error(err);
          });
      } else if (type === 'cancel') {
        toastRef.show('Inicio de sesion cancelado', 300);
      } else {
        toastRef.show('Error desconocido', 300);
      }
    } catch ({ messege }) {
      log.error('Facebook login error: ', messege);
    }
  };

  const { navigation } = props;
  return (
    <ScrollView>
      <Image
        source={LogoImage}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.viewContainer}>
        <Form
          ref={ref => setFormRef(ref)}
          type={loginStruct}
          options={loginOption}
          value={formData}
          onChange={formValue => onChangeFormLogin(formValue)}
        />
        <Button
          buttonStyle={styles.buttonRegisterContainer}
          title="Login"
          onPress={() => loginEmail()}
        />
        <Text style={styles.textRegister}>
          ¿Aun no tienes cuenta?{' '}
          <Text
            style={styles.registerButton}
            onPress={() => navigation.navigate('Register')}
          >
            {' '}
            Registrarse
          </Text>
        </Text>

        <Text style={styles.formErrorMessage}>
          {formErrorMessage}
        </Text>
        <Divider style={styles.divider} />
        <SocialIcon
          iconStyle={{}}
          title="Inicia sesion con Facebook"
          button
          type="facebook"
          onPress={() => loginFacebook()}
        />
      </View>
      <Toast
        ref={ref => setToastRef(ref)}
        position="bottom"
        positionValue={250}
        fadeInDuration={1000}
        fadeOutDuration={1000}
        opacity={0.8}
        textStyle={{ color: '#fff' }}
      />
    </ScrollView>
  );
}

Login.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
    navigate: PropTypes.func,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: '100%',
    height: 150,
    marginTop: 50,
  },
  viewContainer: {
    marginLeft: 20,
    marginRight: 10,
    marginTop: 10,
  },
  buttonRegisterContainer: {
    backgroundColor: '#00a680',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  formErrorMessage: {
    color: '#f00',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  divider: {
    backgroundColor: '#00a680',
    marginBottom: 10,
  },
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  registerButton: {
    fontWeight: 'bold',
    color: '#00a680',
  },
});

export default withNavigation(Login);
