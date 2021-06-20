import * as Yup from 'yup';

const alphaNumericStringRegExp = /^[0-9a-zA-Z.,\u0400-\u04FF'\s]+$/;

const validationSchema = Yup.object().shape({
  id: Yup.string(),
  phone: Yup.string()
    .min(4)
    .max(32)
    .matches(/^\d[\d-]+\d$/)
    .required('Is required'),
  name: Yup.string()
    .min(2)
    .max(128)
    .matches(alphaNumericStringRegExp)
    .required('Is required'),
  department: Yup.string()
    .min(2)
    .max(128)
    .matches(alphaNumericStringRegExp)
    .required('Is required'),
});

export default validationSchema;
