import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import loggedInContext from '../../contexts/loggedInContext';
import Button from '../../components/Button';
import Submit from '../../components/Submit';
import validationSchema from './validation/birthdaysValidationSchema';
import birthdaysPropType from '../../propTypes/birthdayPropType';
import { BIRTHDAYS } from '../../constants/dataTypes';
import { BIRTHDAYS_URL } from '../../constants/url';
import { fetchProtectedData, getBearerToken } from '../../service/authentication';
import ModalButton from '../../components/Modal/ModalButton';
import Modal from '../../components/Modal/Modal';

const Birthdays = (props) => {
  const { data, isEditingId, edit, cancelEditing, submitEditing, deleteItemById } = props;
  const { id, name, date, day, month, year } = data;
  const initialFormValues = { id, name, date, day, month, year };
  const active = id === isEditingId;
  const { loggedIn } = useContext(loggedInContext);

  const saveBirthday = async (newBirthday) => {
    if (newBirthday.date === date && newBirthday.name === name) return;

    fetchProtectedData(async () => {
      const res = await fetch(BIRTHDAYS_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: getBearerToken(),
        },
        body: JSON.stringify({ newBirthday }),
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
      onSubmit={(nextDate) => submitEditing(() => saveBirthday(nextDate))}
      validationSchema={validationSchema}
    >
      {(innerProps) => {
        const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = innerProps;

        const DELETE_BIRTHDAY_MODAL_ID = `deleteBirthdayModalId${id}`.split(' ').join('');

        const resetValues = () => {
          values.name = initialFormValues.name;
          values.date = initialFormValues.date;
          values.day = initialFormValues.day;
          values.month = initialFormValues.month;
          values.year = initialFormValues.year;
        };

        const gatherData = (nextDate, nextName) => {
          const [nextYear, nextMonth, nextDay] = nextDate.split('-').map((x) => parseInt(x));
          return {
            id: values.id,
            date: nextDate,
            day: nextDay,
            month: nextMonth,
            year: nextYear,
            name: nextName,
          };
        };

        return (
          <>
            <form
              className="container d-flex flex-row my-1"
              id={values.id}
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmit(gatherData(values.date, values.name));
              }}
            >
              <fieldset disabled={!active} className="d-flex flex-row flex-grow-1 me-1">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <input
                  type="date"
                  name="date"
                  className="form-control"
                  value={values.date}
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
                      modalId={DELETE_BIRTHDAY_MODAL_ID}
                    >
                      <i className="bi bi-trash-fill" />
                    </ModalButton>
                    <Modal
                      modalId={DELETE_BIRTHDAY_MODAL_ID}
                      modalText="Are you sure?"
                      closeButtonText="Close"
                      submitButtonText="Delete"
                      onSubmit={() => deleteItemById(values.id, BIRTHDAYS)} 
                    />
                  </>
                )}
              </div>
            </form>
            {touched.name && errors.name && <div className="input-feedback align-self-center">{errors.name}</div>}
            {touched.date && errors.date && <div className="input-feedback align-self-center">{errors.date}</div>}
          </>
        );
      }}
    </Formik>
  );
};

Birthdays.propTypes = {
  data: birthdaysPropType.isRequired,
  isEditingId: PropTypes.string.isRequired,
  edit: PropTypes.func.isRequired,
  cancelEditing: PropTypes.func.isRequired,
  submitEditing: PropTypes.func.isRequired,
  deleteItemById: PropTypes.func.isRequired,
};

export default Birthdays;
