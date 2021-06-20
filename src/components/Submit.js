import React from 'react';
import PropTypes from 'prop-types';

const Submit = (props) => {
  const { children, className, disabled } = props;
  return <button type="submit" className={className} disabled={disabled}>{children}</button>;
};

Submit.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]).isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

Submit.defaultProps = {
  className: '',
  disabled: false,
};

export default Submit;
