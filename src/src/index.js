import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/App';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import { ApolloProvider } from 'react-apollo';
import Client from './apollo/Client';

// Style do app
import './styles/style.css';

ReactDOM.render(
    <ApolloProvider client={Client}>
        <BrowserRouter><App /></BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root'));
registerServiceWorker();
