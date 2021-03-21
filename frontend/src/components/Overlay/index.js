/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import './index.css';

export default function Overlay(props) {
  const { children, isOpen = false, onClose = (event) => {} } = props;

  return (
    <div>
      <div style={{ width: isOpen ? '100%' : '0%' }} className="overlay">
        <a className="closebtn" onClick={(e) => onClose(e)}>
          &times;
        </a>
        <div className="overlay-content">
          {/*
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Clients</a>
          <a href="#">Contact</a>
          */}
          {children}
        </div>
      </div>

      {/*
      <h2>Fullscreen Overlay Nav Example</h2>
      <p>
        Click on the element below to open the fullscreen overlay navigation
        menu.
      </p>
      <p>
        In this example, the navigation menu will slide in, from left to right:
      </p>
      <span
        style={{ fontSize: '30px', cursor: 'pointer' }}
        onClick={(e) => setWidth('100%')}
      >
        &#9776; open
      </span>
      */}
    </div>
  );
}
