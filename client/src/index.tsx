import { config as dotEnvConfig } from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify';
import config from './aws-exports';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

// app entry point
import './index.scss';
import { App } from 'screens/App';
import 'typeface-lato';

Amplify.configure({
  ...config,
  Analytics: {
    disabled: false,
  },
});
toast.configure({
  position: 'bottom-right',
  autoClose: 10000,
  draggable: false,
  className: 'dln-toaster',
});
// Load ENV variables
dotEnvConfig({
  path:
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env.development',
});

ReactDOM.render(<App />, document.getElementById('root'));
