import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Header from './components/Header';

ReactDOM.render(<React.StrictMode><App /></React.StrictMode>,document.getElementById('root'));
ReactDOM.render(<React.StrictMode><Header /></React.StrictMode>,document.getElementById('signIn'));

