import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Provider } from 'react-redux';
import store from './components/store/Store.js';
import { BrowserRouter } from 'react-router-dom';
import { SearchBusProvider } from './components/SearchBusContext';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <SearchBusProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SearchBusProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();