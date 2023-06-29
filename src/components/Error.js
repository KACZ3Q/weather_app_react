import React from 'react';
import ReactModal from 'react-modal';

const Modal = ({ isOpen, closeModal }) => {
  ReactModal.setAppElement('#root');

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="Modal"
    >
      <div className="Modal-content" onClick={closeModal}>
        <h2>City not found. Please type again</h2>
        <h3>Click to close</h3>

      </div>
    </ReactModal>
  );
};

export default Modal;