import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

const Backdrop = (props) => {
  return <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40" onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">          
        <div>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlay');

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
