// import liraries
import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { withNavigation } from 'react-navigation';
import t from 'tcomb-form-native';
import { Button, Text, Image } from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';

import LogoImage from '../../../assets/img/5-tenedores-letras-icono-logo.png';

import {
  RegisterOptions,
  RegisterStruct,
} from '../../forms/Register';

const { Form } = t.form;

function Register(props) {
  const registerStruct = RegisterStruct;
  const registerOptions = RegisterOptions;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const [formErrorMessage, setFormErrorMessage] = useState('');
  const [formRef, setFormRef] = useState('');
  const [toastRef, setToastRef] = useState('');

  const register = () => {
    if (formData.password === formData.passwordConfirmation) {
      const validate = formRef.props.value;
      if (validate) {
        setFormErrorMessage('');
        firebase
          .auth()
          .createUserWithEmailAndPassword(
            validate.email,
            validate.password,
          )
          .then(() => {
            // console.log(sucess)
            toastRef.show('Registro Correcto', 100, () => {
              const { navigation } = props;
              navigation.goBack();
            });
          })
          .catch(() => {
            // console.log(error.code);
            toastRef.show('El email ya esta en uso', 2500);
          });
      } else {
        setFormErrorMessage('Formulario invalido');
      }
    } else {
      setFormErrorMessage('Las contraseñas no son correctas');
    }
  };

  const onChangeFormRegister = formValue => {
    setFormData(formValue);
    setFormErrorMessage('');
  };

  return (
    <View style={styles.viewBody}>
      <View style={styles.imageViewStyle}>
        <Image
          source={LogoImage}
          style={styles.logo}
          PlaceholderContent={<ActivityIndicator />}
          resizeMode="contain"
        />
      </View>
      <Form
        ref={ref => setFormRef(ref)}
        type={registerStruct}
        options={registerOptions}
        value={formData}
        onChange={formValue => onChangeFormRegister(formValue)}
      />
      <Button
        buttonStyle={styles.buttonRegisterContainer}
        title="Registrarse"
        onPress={() => register()}
      />
      <Text style={styles.formErrorMessage}>{formErrorMessage}</Text>
      <Toast
        ref={ref => setToastRef(ref)}
        position="bottom"
        positionValue={250}
        fadeInDuration={250}
        fadeOutDuration={250}
        opacity={0.8}
        textStyle={{ color: '#fff' }}
      />
    </View>
  );
}

Register.propTypes = {
  navigation: PropTypes.shape({ goBack: PropTypes.func }).isRequired,
};

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
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
  },
});

export default withNavigation(Register);
