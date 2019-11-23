import t from 'tcomb-form-native';
import formValidation from '../utils/Validation';
import inputTemplate from './templates/Input';

export const LoginStruct = t.struct({
  email: formValidation.email,
  password: formValidation.password,
});

export const LoginOption = {
  fields: {
    email: {
      template: inputTemplate,
      config: {
        placeholder: 'Ingrese su email',
        iconType: 'material-community',
        iconName: 'at',
      },
    },
    password: {
      template: inputTemplate,
      config: {
        placeholder: 'Ingrese contraseña',
        password: true,
        secureTextEntry: true,
        iconType: 'material-community',
        iconName: 'lock-outline',
      },
    },
  },
};
