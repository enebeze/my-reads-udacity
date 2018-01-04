import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/App';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

// Apolo
import { ApolloProvider } from 'react-apollo';
import Client from './apollo/Client';

// Styles
import "react-rater/lib/react-rater.css";
import './styles/style.css';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'


ReactDOM.render(
    <ApolloProvider client={Client}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root'));
registerServiceWorker();
