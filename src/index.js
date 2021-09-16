import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './js/common/Routes';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Common.scss';

class MyForm extends React.Component {
  render() {
    return (
      <Routes></Routes>
    );
  }
}
ReactDOM.render(<MyForm />, document.getElementById('root'));
reportWebVitals();