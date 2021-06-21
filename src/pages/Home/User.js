import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import loggedInContext from '../../contexts/loggedInContext';
import userPropType from '../../propTypes/userPropType';
import { fetchProtectedData, getBearerToken } from '../../service/authentication';
import { USERS_URL } from '../../constants/url';
import { USERS } from '../../constants/dataTypes';
import Button from '../../components/Button';
import Submit from '../../components/Submit';
import ModalButton from '../../components/Modal/ModalButton';
import Modal from '../../components/Modal/Modal';

const User = (props) => {
  const { source, isEditingId, edit, cancelEditing, submitEditing, deleteItemById, setApiError, setData } = props;
  const { id, isAdmin, firstName, lastName, userName } = source;
  const active = id === isEditingId;
  const { loggedIn } = useContext(loggedInContext);

  const saveUser = async (newUser) => {
    if (isAdmin === newUser.isAdmin) return;

    fetchProtectedData(async () => {
      const res = await fetch(USERS_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: getBearerToken(),
        },
        body: JSON.stringify({ newUser }),
      });

      const { error } = await res.json();

      if (error) {
        setApiError(() => error);
        setTimeout(() => setApiError(() => null), 3000);
      }

      setData((prevData) => {
        return ({
          type: prevData.type,
          source: prevData.source.map((user) => (user.id === id ? { ...user, isAdmin: newUser.isAdmin } : user)),
        });
      });
    });
  };

  return (
    <Formik
      initialValues={{ ...source }}
      onSubmit={(newUser) => submitEditing(() => saveUser(newUser))}
    >
      {(innerProps) => {
        const { values, isSubmitting, handleChange, handleBlur, handleSubmit } = innerProps;

        const DELETE_USER_MODAL_ID = `deleteUserModalId${id}`;
        const IS_ADMIN_CHECK_ID = `isAdminCheck${id}`;

        const resetValues = () => {
          values.isAdmin = isAdmin;
        };

        return (
          <form
            className="container d-flex flex-row my-1"
            id={id}
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit({ ...source, isAdmin: values.isAdmin });
            }}
          >
            <fieldset disabled={!active} className="d-flex flex-row flex-grow-1 me-1">
              <input
                type="text"
                name="userName"
                className="form-control mx-1"
                value={userName}
                disabled
              />
              <input
                type="text"
                name="firstName"
                className="form-control mx-1"
                value={firstName}
                disabled
              />
              <input
                type="text"
                name="lastName"
                className="form-control mx-1"
                value={lastName}
                disabled
              />
              <div className="form-check form-switch">
                <label className="form-check-label fs-5 ms-3" htmlFor={IS_ADMIN_CHECK_ID}>
                  <input
                    type="checkbox"
                    id={IS_ADMIN_CHECK_ID}
                    className="form-check-input"
                    checked={values.isAdmin}
                    name="isAdmin"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  Admin
                </label>
              </div>
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
                    modalId={DELETE_USER_MODAL_ID}
                  >
                    <i className="bi bi-trash-fill" />
                  </ModalButton>
                  <Modal
                    modalId={DELETE_USER_MODAL_ID}
                    modalText="Are you sure?"
                    closeButtonText="Close"
                    submitButtonText="Delete"
                    onSubmit={() => deleteItemById(id, USERS)}
                  />
                </>
              )}
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

User.propTypes = {
  source: userPropType.isRequired,
  setData: PropTypes.func.isRequired,
  isEditingId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  edit: PropTypes.func.isRequired,
  cancelEditing: PropTypes.func.isRequired,
  submitEditing: PropTypes.func.isRequired,
  deleteItemById: PropTypes.func.isRequired,
  setApiError: PropTypes.func.isRequired,
};

export default User;
