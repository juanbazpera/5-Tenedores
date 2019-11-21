// import liraries
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';
import t from 'tcomb-form-native';
import Toast, { DURATION } from 'react-native-easy-toast';

import { RegisterOptions, RegisterStruct } from '../../forms/Register';
import * as firebase from 'firebase';
const { Form } = t.form;

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registerStruct: RegisterStruct,
      registerOptions: RegisterOptions,
      formData: {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      },
      formErrorMessage: ''
    };
  }

  register = () => {
    const { password, passwordConfirmation } = this.state.formData;
    if (password === passwordConfirmation) {
      const validate = this.refs.registerForm.getValue();
      if (validate) {
        this.setState({
          formErrorMessage: ''
        });
        firebase
          .auth()
          .createUserWithEmailAndPassword(validate.email, validate.password)
          .then(result => {
            this.refs.toast.show('Registro Correcto', 100, () => {
              const { navigation } = this.props;
              navigation.goBack();
            });
          })
          .catch(error => {
            this.refs.toast.show('El email ya esta en uso', 2500);
          });
      } else {
        this.setState({
          formErrorMessage: 'Formulario Invalido'
        });
      }
    } else {
      this.setState({
        formErrorMessage: 'Las contraseñas no son correctas'
      });
    }
  };

  onChangeFormRegister = formValue => {
    this.setState({
      formData: formValue
    });
  };

  render() {
    const {
      registerOptions,
      registerStruct,
      formData,
      formErrorMessage
    } = this.state;
    return (
      <View style={styles.viewBody}>
        <Text>Register Screen...</Text>
        <Form
          ref="registerForm"
          type={registerStruct}
          options={registerOptions}
          value={formData}
          onChange={formValue => this.onChangeFormRegister(formValue)}
        />
        <Button
          buttonStyle={styles.buttonRegisterContainer}
          title="Registrarse"
          onPress={() => this.register()}
        />
        <Text styl={styles.formErrorMessage}>{formErrorMessage}</Text>
        <Toast
          ref="toast"
          position="bottom"
          positionValue={150}
          fadeInDuration={1000}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: '#fff' }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  buttonRegisterContainer: {
    backgroundColor: '#00a680',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  formErrorMessage: {
    color: '#f00',
    textAlign: 'center',
    marginTop: 30
  }
});
