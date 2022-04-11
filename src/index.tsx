import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';

Bugsnag.start({
  apiKey: process.env.REACT_APP_BUGSNAG_API_KEY!!,
  plugins: [new BugsnagPluginReact()]
})

const ErrorBoundary = Bugsnag.getPlugin('react')!!.createErrorBoundary(React)

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
    <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
