import React from 'react';
import { Toast } from 'react-bootstrap';

export default function AlertToast(props) {
  // Allowed variants : 'info', 'warn', 'error'
  // Default is 'info'
  const { variant, show, onClose, message } = props;

  let bgcolor;
  let color;
  switch (variant) {
    case 'warn': {
      bgcolor = 'yellow';
      color = 'black';
      break;
    }
    case 'error': {
      bgcolor = 'firebrick';
      color = 'white';
      break;
    }
    default: {
      bgcolor = 'blue';
      color = 'black';
      break;
    }
  }

  return (
    <Toast
      autohide
      onClose={() => onClose()}
      style={{
        position: 'absolute',
        top: 10,
        right: 10,
        width: '100%',
        backgroundColor: bgcolor,
        color: color,
        zIndex: 900
      }}
      show={show}
    >
      <Toast.Header
        closeButton
        style={{ color: color, backgroundColor: bgcolor }}
      >
        <img className="rounded mr-2" alt="" />
        <strong className="mr-auto">Error</strong>
        <small>{new Date(Date.now()).toLocaleString()}</small>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}
