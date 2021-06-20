import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const { children, className, disabled, onClick } = props;
  return (
    <button type="button" className={className} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  className: '',
  disabled: false,
};

export default Button;
