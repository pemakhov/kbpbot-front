/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import loggedInContext from '../../contexts/loggedInContext';
import { LOGIN_WITH_CODE_URL } from '../../constants/url';
import Submit from '../../components/Submit';
import Button from '../../components/Button';
import { storeTokens } from '../../service/authentication';

const StageTwo = (props) => {
  const { setStage } = props;
  const { logIn } = useContext(loggedInContext);
  const history = useHistory();

  const goToStageOne = () => setStage(1);

  const onSubmit = async (values, { setErrors }) => {
    try {
      const res = await fetch(LOGIN_WITH_CODE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: values.code }),
      });
      const tokensValidationSchema = Yup.object().shape({
        accessToken: Yup.string().required('Access token is required'),
        refreshToken: Yup.string().required('Refresh token is required'),
      });
      const data = await res.json();
      const isValid = await tokensValidationSchema.isValid(data);

      if (!isValid) throw new Error('Something is wrong with tokens');

      storeTokens(...Object.values(data));
      logIn();
      history.push('/');
    } catch (error) {
      setErrors({ code: error.message });
    }
  };

  const validationSchema = Yup.object().shape({
    code: Yup.number().required('Required'),
  });

  return (
    <>
      <h1>Enter the code</h1>
      <Formik initialValues={{ code: '' }} onSubmit={onSubmit} validationSchema={validationSchema}>
        {(innerProps) => {
          const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = innerProps;
          const CODE = 'code';
          return (
            <form className="logInForm" onSubmit={handleSubmit}>
              <label className="form-label" htmlFor={CODE} style={{ display: 'block' }}>
                Confirmation code:
                <input
                  id={CODE}
                  type="text"
                  placeholder="...code"
                  value={values.code}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.code && touched.code ? 'form-control text-input error' : 'form-control text-input'}
                />
              </label>
              {errors.code && touched.code && <div className="input-feedback">{errors.code}</div>}

              <Submit className="btn btn-primary me-1" disabled={isSubmitting}>
                Submit
              </Submit>
              <Button className="btn btn-warning" onClick={goToStageOne}>Back</Button>
            </form>
          );
        }}
      </Formik>
    </>
  );
};

export default StageTwo;
