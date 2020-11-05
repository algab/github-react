import React from 'react';
import ReactDOM from 'react-dom';

import reportWebVitals from './reportWebVitals';

import Context from './contexts';
import Routes from './routes';

import './index.css';

ReactDOM.render(
  <Context>
    <Routes />
  </Context>,
  document.getElementById('root'),
);

reportWebVitals();
