import React from 'react'
import ReactDOM from 'react-dom/client'
import { store } from './features/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ClerkProviderRouter from './ClerkProviderRouter';

import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ClerkProviderRouter />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
