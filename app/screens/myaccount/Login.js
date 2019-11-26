/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {
  Image,
  Button,
  Divider,
  SocialIcon,
} from 'react-native-elements';
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

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginStruct: LoginStruct,
      loginOption: LoginOption,
      formData: {
        email: '',
        password: '',
      },
      formErrorMessage: '',
    };
    this.formRef = null;
    this.toastRef = null;
  }

  setFormRef = ref => {
    this.formRef = ref;
  };

  setToastRef = ref => {
    this.toastRef = ref;
  };

  onChangeFormLogin = formData => {
    this.setState({ formData, formErrorMessage: '' });
  };

  login = () => {
    const validate = this.formRef.props.value;
    if (!validate) {
      this.setState({
        formErrorMessage: 'Email o contraseña no valida',
      });
    } else {
      this.setState({
        formErrorMessage: '',
      });
      firebase
        .auth()
        .signInWithEmailAndPassword(validate.email, validate.password)
        .then(() => {
          // console.log(sucess);
          this.toastRef.show('Login correcto', 250, () => {
            const { navigation } = this.props;
            navigation.goBack();
          });
        })
        .catch(() => {
          // console.log(error.code);
          this.setState({
            formErrorMessage: 'Login incorrecto',
          });
        });
    }
  };

  loginFacebook = async () => {
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
            this.toastRef.show(
              userName !== null
                ? userName
                : 'Inicio de sesion exitoso!',
              300,
              () => {
                const { navigation } = this.props;
                navigation.goBack();
              },
            );
          })
          .catch(err => {
            this.toastRef.show(
              'Error accediendo con Facebook, intentelo mas tarde',
              300,
            );
            log.error(err);
          });
      } else if (type === 'cancel') {
        this.toastRef.show('Inicio de sesion cancelado', 300);
      } else {
        this.toastRef.show('Error desconocido', 300);
      }
    } catch ({ messege }) {
      log.error('Facebook login error: ', messege);
    }
  };

  render() {
    const {
      loginOption,
      loginStruct,
      formData,
      formErrorMessage,
    } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.imageViewStyle}>
          <Image
            source={LogoImage}
            style={styles.logo}
            PlaceholderContent={<ActivityIndicator />}
            resizeMode="contain"
          />
        </View>
        <View style={styles.viewFormStyle}>
          <Form
            ref={ref => this.setFormRef(ref)}
            type={loginStruct}
            options={loginOption}
            value={formData}
            onChange={formValue => this.onChangeFormLogin(formValue)}
          />
          <Button
            buttonStyle={styles.buttonRegisterContainer}
            title="Login"
            onPress={() => this.login()}
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
            onPress={() => this.loginFacebook()}
          />
        </View>
        <Toast
          ref={ref => this.setToastRef(ref)}
          position="bottom"
          positionValue={250}
          fadeInDuration={1000}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: '#fff' }}
        />
      </View>
    );
  }
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
  imageViewStyle: {
    alignItems: 'center',
    marginLeft: 40,
    marginRight: 40,
    marginTop: 30,
  },
  logo: {
    width: 200,
    height: 200,
  },
  viewFormStyle: {
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
