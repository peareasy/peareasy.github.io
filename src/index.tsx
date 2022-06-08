import React from 'react';
import './index.css';
import App from './App';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from "./redux/store";

Bugsnag.start({
  apiKey: process.env.REACT_APP_BUGSNAG_API_KEY!!,
  plugins: [new BugsnagPluginReact()]
})

const ErrorBoundary = Bugsnag.getPlugin('react')!!.createErrorBoundary(React)


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
);
