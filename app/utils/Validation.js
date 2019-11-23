import t from 'tcomb-form-native';

const formValidation = {
  email: t.refinement(t.String, value => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
  }),
  password: t.refinement(t.String, value => {
    return value.lenght >= 6;
  }),
};

export default formValidation;
