import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import 'tachyons';

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import { searchRobots, requestRobots } from './reducers';
import { createLogger } from 'redux-logger';
import { thunk } from 'redux-thunk'
import './index.css';
import App from './containers/App';
import { combineReducers } from 'redux';

const rootReducer = combineReducers(
  {searchRobots, requestRobots}
)

const middleware = [
  // createLogger(),
   thunk];

const storeObj = configureStore({
  reducer:  rootReducer,
  middleware: ()=>middleware,
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={storeObj}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
