import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { CODE_REQUEST_URL } from '../../constants/url';
import Submit from '../../components/Submit';

const StageOne = (props) => {
  const { setStage } = props;

  const onSubmit = async (values, { setErrors }) => {
    const res = await fetch(CODE_REQUEST_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: values.telegramName }),
    });

    const data = await res.json();

    if (res.status === 200) {
      setStage(2);
    } else {
      setErrors({ telegramName: data.message });
    }
  };

  const validationSchema = Yup.object().shape({
    telegramName: Yup.string().min(3).max(50).required('Required'),
  });

  return (
    <>
      <h1>Log In</h1>
      <Formik initialValues={{ telegramName: '' }} onSubmit={onSubmit} validationSchema={validationSchema}>
        {(innerProps) => {
          const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = innerProps;
          const TG_NAME = 'telegramName';
          return (
            <form className="logInForm" onSubmit={handleSubmit}>
              <label className="form-label" htmlFor={TG_NAME} style={{ display: 'block' }}>
                Telegram name:
                <div className="input-group mb-3">
                  <span className="input-group-text">@</span>
                  <input
                    id={TG_NAME}
                    type="text"
                    placeholder="me-in-telegram"
                    value={values.telegramName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.telegramName && touched.telegramName
                        ? 'form-control text-input error'
                        : 'form-control text-input'
                    }
                  />
                </div>
              </label>
              {errors.telegramName && touched.telegramName && (
                <div className="input-feedback">{errors.telegramName}</div>
              )}

              <Submit className="btn btn-primary" disabled={isSubmitting}>
                Submit
              </Submit>
            </form>
          );
        }}
      </Formik>
    </>
  );
};

StageOne.propTypes = {
  setStage: PropTypes.func.isRequired,
};

export default StageOne;
