import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BIRTHDAYS, PHONES } from '../../constants/dataTypes';
import Phones from './Phones';
import Birthdays from './Birthdays';
import phonePropType from '../../propTypes/phonePropType';

const DataTable = (props) => {
  const { data, dataType, deleteItemById } = props;
  const [isEditingId, setIsEditingId] = useState('');

  const edit = (id) => setIsEditingId(id);

  const cancelEditing = (resetValues) => {
    resetValues();
    setIsEditingId(() => '');
  };

  const submitEditing = async (saveData) => {
    await saveData();
    setIsEditingId(() => '');
  };

  let table = null;

  switch (dataType) {
    case PHONES:
      if (data?.length === 0) break;
      table = data.map((phone) => (
        <Phones
          key={phone.id}
          data={phone}
          isEditingId={isEditingId}
          edit={edit}
          cancelEditing={cancelEditing}
          submitEditing={submitEditing}
          deleteItemById={deleteItemById}
        />
      ));
      break;
    case BIRTHDAYS:
      if (data?.length === 0) break;
      table = data.map((birthday) => (
        <Birthdays
          key={birthday.id}
          data={birthday}
          isEditingId={isEditingId}
          edit={edit}
          cancelEditing={cancelEditing}
          submitEditing={submitEditing}
          deleteItemById={deleteItemById}
        />
      ));
      break;
    default:
      table = null;
  }

  return table;
};

DataTable.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.array,
    phonePropType,
  ]).isRequired,
  dataType: PropTypes.string.isRequired,
  deleteItemById: PropTypes.func,
};

export default DataTable;
