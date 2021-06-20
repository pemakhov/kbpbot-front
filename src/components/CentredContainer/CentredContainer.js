import React from 'react';
import PropTypes from 'prop-types';
import './CentredContainer.css';

const CentredContainer = (props) => {
  const { children } = props;
  return (
    <div className="centred-container">
      <div className="centred-container__content">
        {children}
      </div>
    </div>
  );
};

CentredContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
};

export default CentredContainer;
