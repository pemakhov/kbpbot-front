import React from 'react';
import PropTypes from 'prop-types';

const Modal = (props) => {
  const { modalId, modalText, closeButtonText, submitButtonText, onSubmit } = props;
  return (
    <div
      className="modal fade"
      id={modalId}
      tabIndex="-1"
      aria-labelledby="modalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
          <div className="modal-body">{modalText}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              {closeButtonText}
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={onSubmit}
            >
              {submitButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  modalId: PropTypes.string.isRequired,
  modalText: PropTypes.string.isRequired,
  closeButtonText: PropTypes.string.isRequired,
  submitButtonText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Modal;
