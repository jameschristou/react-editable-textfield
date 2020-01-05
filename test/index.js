import './style.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import TestPage from './TestPage';

// bootstrap the react application but only after document load (we need the container element to exist)
window.onload = function (){
  const wrapper = document.getElementById("app-container");
  wrapper ? ReactDOM.render(<TestPage />, wrapper) : false;
};