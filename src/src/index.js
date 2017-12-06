import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/App';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

// Style do app
import './styles/style.css';

ReactDOM.render(
    <BrowserRouter><App /></BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();
