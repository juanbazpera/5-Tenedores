import t from 'tcomb-form-native';
import formValidation from '../../utils/Validation';

export const RegisterStruct = t.struct({
  name: t.String,
  email: formValidation.email,
  password: formValidation.password,
  passwordConfirmation: formValidation.password,
});

export const RegisterOptions = {
  fields: {
    name: {
      label: 'Nombre (*)',
      placeholder: 'Inserte su nombre completo',
      error: 'Nombre invalido',
    },
    email: {
      label: 'Email (*)',
      placeholder: 'Inserte su email',
      error: 'Email invalido',
    },
    password: {
      label: 'Contraseña (*)',
      placeholder: 'Inserte contraseña',
      error: 'Contraseña invalida',
      password: true,
      secureTextEntry: true,
    },
    passwordConfirmation: {
      label: 'Repetir contraseña',
      placeholder: 'Repetir contraseña',
      error: 'Contraseña invalida',
      password: true,
      secureTextEntry: true,
    },
  },
};
