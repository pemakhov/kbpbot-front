import React from 'react';
import PropTypes from 'prop-types';

const ModalButton = (props) => {
  const { children, className, disabled, modalId } = props;
  return (
    <button
      type="button"
      className={className}
      disabled={disabled}
      data-bs-toggle="modal"
      data-bs-target={`#${modalId}`}
    >
      {children}
    </button>
  );
};

ModalButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  modalId: PropTypes.string.isRequired,
};

ModalButton.defaultProps = {
  className: '',
  disabled: false,
};

export default ModalButton;
