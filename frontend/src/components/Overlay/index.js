import React from 'react';
import './index.css';

export default function Overlay(props) {
  const {
    children,
    isOpen = false,
    hasCloseButton = true,
    onClose = (event) => {}
  } = props;

  return (
    <div>
      <div style={{ width: isOpen ? '100%' : '0%' }} className="overlay">
        {hasCloseButton && (
          <p className="closebtn" onClick={(e) => onClose(e)}>
            &times;
          </p>
        )}
        <div className="overlay-content">
          {children}
        </div>
      </div>
    </div>
  );
}
