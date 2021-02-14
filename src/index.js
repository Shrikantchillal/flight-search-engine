import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/header';
import Home from './components/home';
import {Container} from '@material-ui/core';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import allReducers from './reducers/combineReducer';
import allServices from './services/services';

const store = createStore(allReducers, applyMiddleware(
  thunk,
  allServices
))

ReactDOM.render(
  <React.StrictMode>
    <Container className="main-container" maxWidth="md">
      <Provider store={store}>
        <Router>
          <Header />
          <Route exact path='/' component={Home}></Route>
        </Router>
      </Provider>
    </Container>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
