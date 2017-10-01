import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';
import ContactIndex from './components/ContactsIndex';
import ContactsNew from './components/ContactsNew'
import ContactsDetails from './components/ContactsDetails';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/contacts/new" component={ContactsNew} />
          <Route path="/contacts/:id" component={ContactsDetails} />
          <Route path="/" component={ContactIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider >
  , document.querySelector('#root'));

registerServiceWorker();
