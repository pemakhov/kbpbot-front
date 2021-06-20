import React from 'react';
import PropTypes from 'prop-types';

const DataTypeSwitchInput = (props) => {
  const { dataType, currentDataType } = props;
  const id = `data-type-${dataType}`;
  const inputText = `${dataType.charAt(0).toUpperCase()}${dataType.slice(1)}`;

  return (
    <>
      <input
        type="radio"
        className="btn-check"
        name="dataType"
        value={dataType}
        id={id}
        autoComplete="off"
        checked={dataType === currentDataType}
        readOnly
      />
      <label className="btn btn-outline-primary" htmlFor={id}>
        {inputText}
      </label>
    </>
  );
};

DataTypeSwitchInput.propTypes = {
  dataType: PropTypes.string.isRequired,
  currentDataType: PropTypes.string.isRequired,
};

export default DataTypeSwitchInput;
