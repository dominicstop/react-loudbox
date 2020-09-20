import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import 'fontsource-roboto';
import { RootContextProvider } from 'contexts/RootContextsProvider';

ReactDOM.render(
  <React.StrictMode>
    <RootContextProvider>
      <App/>
    </RootContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

