import React from 'react';
import ReactDOM from 'react-dom';

// CSS
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import './Animation.css';
import Promise from 'promise-polyfill';

// Container Components
import {Router, Route, browserHistory, IndexRoute } from 'react-router';
import {App, View, Home, Write} from 'containers';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

// To add to window
if (!window.Promise) {
  window.Promise = Promise;
}

const rootElement = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="list" component={Home}/>
        <Route path="view" component={View}/>
        <Route path="write" component={Write}/>
      </Route>
    </Router>
  </Provider>,
  rootElement
);
