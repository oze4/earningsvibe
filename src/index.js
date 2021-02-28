import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';

import 'bootstrap/dist/css/bootstrap.css';
// ** import custom css here so bootstrap does not override it! **
import 'react-datepicker/dist/react-datepicker.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
