import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import loggedInContext from '../../contexts/loggedInContext';
import Button from '../../components/Button';
import Submit from '../../components/Submit';
import validationSchema from './validation/phonesValidationSchema';
import phonePropType from '../../propTypes/phonePropType';
import { PHONES_URL } from '../../constants/url';
import { PHONES } from '../../constants/dataTypes';
import { fetchProtectedData, getBearerToken } from '../../service/authentication';
import { objectsEqual } from '../../service/tools';
import ModalButton from '../../components/Modal/ModalButton';
import Modal from '../../components/Modal/Modal';

const Phone = (props) => {
  const { source, isEditingId, edit, cancelEditing, submitEditing, deleteItemById } = props;
  const { id, phone, name, department } = source;
  const initialFormValues = { id, phone, name, department };
  const active = id === isEditingId;
  const { loggedIn } = useContext(loggedInContext);

  const savePhone = async (newPhone) => {
    if (objectsEqual(initialFormValues, newPhone)) return;

    fetchProtectedData(async () => {
      const res = await fetch(PHONES_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: getBearerToken(),
        },
        body: JSON.stringify({ newPhone }),
      });

      const { error } = await res.json();

      if (error) {
        throw new Error(error?.message);
      }
    });
  };

  return (
    <Formik
      initialValues={initialFormValues}
      onSubmit={(newPhone) => submitEditing(() => savePhone(newPhone))}
      validationSchema={validationSchema}
    >
      {(innerProps) => {
        const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = innerProps;

        const DELETE_PHONE_MODAL_ID = `deletePhoneModalId${id}`.split(' ').join('');

        const resetValues = () => {
          values.phone = initialFormValues.phone;
          values.name = initialFormValues.name;
          values.department = initialFormValues.department;
        };

        return (
          <>
            <form
              className="container d-flex flex-row my-1"
              id={values.id}
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmit({
                  id: values.id,
                  phone: values.phone,
                  name: values.name,
                  department: values.department
                });
              }}
            >
              <fieldset disabled={!active} className="d-flex flex-row flex-grow-1 me-1">
                <input
                  type="text"
                  name="phone"
                  className="form-control mx-1"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <input
                  type="text"
                  name="name"
                  className="form-control mx-1"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <input
                  type="text"
                  name="department"
                  className="form-control mx-1"
                  value={values.department}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </fieldset>
              <div className="d-flex flex-row ms-1">
                {active && (
                  <>
                    <Button
                      className="btn btn-warning me-1"
                      onClick={() => cancelEditing(resetValues)}
                      disabled={isSubmitting}
                    >
                      <i className="bi bi-x-lg" />
                    </Button>
                    <Submit className="btn btn-success" disabled={isSubmitting}>
                      <i className="bi bi-check-lg" />
                    </Submit>
                  </>
                )}
                {!active && loggedIn && (
                  <>
                    <Button className="btn btn-primary me-1" onClick={() => edit(id)}>
                      <i className="bi bi-pencil-fill" />
                    </Button>
                    <ModalButton
                      className="btn btn-danger"
                      modalId={DELETE_PHONE_MODAL_ID}
                    >
                      <i className="bi bi-trash-fill" />
                    </ModalButton>
                    <Modal
                      modalId={DELETE_PHONE_MODAL_ID}
                      modalText="Are you sure?"
                      closeButtonText="Close"
                      submitButtonText="Delete"
                      onSubmit={() => deleteItemById(id, PHONES)} 
                    />
                  </>
                )}
              </div>
            </form>
            {touched.phone && errors.phone && <div className="input-feedback align-self-center">{errors.phone}</div>}
            {touched.name && errors.name && <div className="input-feedback align-self-center">{errors.name}</div>}
            {touched.department && errors.department &&
              <div className="input-feedback align-self-center">{errors.department}</div>}
          </>
        );
      }}
    </Formik>
  );
};

Phone.propTypes = {
  source: phonePropType.isRequired,
  isEditingId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  edit: PropTypes.func.isRequired,
  cancelEditing: PropTypes.func.isRequired,
  submitEditing: PropTypes.func.isRequired,
  deleteItemById: PropTypes.func.isRequired,
};

export default Phone;
