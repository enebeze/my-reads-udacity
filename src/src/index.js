import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/App';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import { ApolloProvider } from 'react-apollo';
import client from './apollo/client';

// Style do app
import './styles/style.css';

ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter><App /></BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root'));
registerServiceWorker();
