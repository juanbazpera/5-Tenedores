// import liraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import t from 'tcomb-form-native';

import { RegisterOptions, RegisterStruct } from '../../forms/Register';

const { Form } = t.form;

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registerStruct: RegisterStruct,
      registerOptions: RegisterOptions
    };
  }
  render() {
    const { registerOptions, registerStruct } = this.state;
    return (
      <View style={styles.viewBody}>
        <Text>Register Screen...</Text>
        <Form
          ref="registerForm"
          type={registerStruct}
          options={registerOptions}
        />
      </View>
    );
  }
}
