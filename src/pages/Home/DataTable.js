import React from 'react';
import PropTypes from 'prop-types';
import { BIRTHDAYS, PHONES, USERS } from '../../constants/dataTypes';
import Phones from './Phones';
import Birthdays from './Birthdays';
import User from './User';
import phonePropType from '../../propTypes/phonePropType';
import birthdayPropType from '../../propTypes/birthdayPropType';
import userPropType from '../../propTypes/userPropType';

const DataTable = (props) => {
  const { data, deleteItemById, isEditingId, edit, cancelEditing, submitEditing, setApiError, setData } = props;
  const { source, type } = data;

  let table = null;
  if (source?.length === 0) return table;

  switch (type) {
    case PHONES:
      table = source.map((phone) => (
        <Phones
          key={phone.id}
          source={phone}
          isEditingId={isEditingId}
          edit={edit}
          cancelEditing={cancelEditing}
          submitEditing={submitEditing}
          deleteItemById={deleteItemById}
        />
      ));
      break;
    case BIRTHDAYS:
      table = source.map((birthday) => (
        <Birthdays
          key={birthday.id}
          source={birthday}
          isEditingId={isEditingId}
          edit={edit}
          cancelEditing={cancelEditing}
          submitEditing={submitEditing}
          deleteItemById={deleteItemById}
        />
      ));
      break;
    case USERS:
      table = source.map((user) => (
        <User
          key={user.id}
          source={user}
          setData={setData}
          isEditingId={isEditingId}
          edit={edit}
          cancelEditing={cancelEditing}
          submitEditing={submitEditing}
          deleteItemById={deleteItemById}
          setApiError={setApiError}
        />
      ));
      break;
    default:
      table = null;
  }

  return table;
};

DataTable.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string,
    source: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.oneOf([null]),
      phonePropType,
      birthdayPropType,
      userPropType,
    ])),
  }).isRequired,
  setData: PropTypes.func.isRequired,
  deleteItemById: PropTypes.func.isRequired,
  isEditingId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  edit: PropTypes.func.isRequired,
  cancelEditing: PropTypes.func.isRequired,
  submitEditing: PropTypes.func.isRequired,
  setApiError: PropTypes.func.isRequired,
};

export default DataTable;
