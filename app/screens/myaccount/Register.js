// import liraries
import React from 'react';
import { View, StyleSheet } from 'react-native';
import t from 'tcomb-form-native';
import { Button, Text } from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';

import {
  RegisterOptions,
  RegisterStruct,
} from '../../forms/Register';

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
        passwordConfirmation: '',
      },
      formErrorMessage: '',
    };
    this.formRef = null;
    this.toastRef = null;
  }

  setFormRefs = ref => {
    this.formRef = ref;
  };

  setToastRefs = ref => {
    this.toastRef = ref;
  };

  register = () => {
    const { formData } = this.state;
    if (formData.password === formData.passwordConfirmation) {
      const validate = this.formRef.props.value;
      if (validate) {
        this.setState({
          formErrorMessage: '',
        });
        firebase
          .auth()
          .createUserWithEmailAndPassword(
            validate.email,
            validate.password,
          )
          .then(() => {
            this.toastRef.show('Registro Correcto', 100, () => {
              const { navigation } = this.props;
              navigation.goBack();
            });
          })
          .catch(() => {
            this.toastRef.show('El email ya esta en uso', 2500);
          });
      } else {
        this.setState({
          formErrorMessage: 'Formulario Invalido',
        });
      }
    } else {
      this.setState({
        formErrorMessage: 'Las contraseñas no son correctas',
      });
    }
  };

  onChangeFormRegister = formValue => {
    this.setState({
      formData: formValue,
      formErrorMessage: '',
    });
  };

  render() {
    const {
      registerOptions,
      registerStruct,
      formData,
      formErrorMessage,
    } = this.state;
    return (
      <View style={styles.viewBody}>
        <Form
          ref={ref => this.setFormRefs(ref)}
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
        <Text style={styles.formErrorMessage}>
          {formErrorMessage}
        </Text>
        <Toast
          ref={ref => this.setToastRefs(ref)}
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

Register.propTypes = {
  navigation: PropTypes.shape.isRequired,
};

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
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
