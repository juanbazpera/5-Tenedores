import t from "tcomb-form-native";

const formValidation = {
  email: t.refinement(t.String, value => {
    return /@/.test(value);
  }),
  password: t.refinement(t.String, value => {
    return value.lenght >= 6;
  })
};

export default formValidation;
