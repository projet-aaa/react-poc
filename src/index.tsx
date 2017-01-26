/// <reference path="../typings/index.d.ts" />

import 'babel-polyfill'

import thunkMiddleware from 'redux-thunk'
import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import { createStore, applyMiddleware  } from 'redux'
import { Provider } from 'react-redux';

import reducer from './main/reducer'
import App from './containers/todoApp'
import Stuff from './views/stuff'

let store = createStore(
    reducer,
    applyMiddleware(
        thunkMiddleware
    )
)

let MainRouter =
(<Provider store={store}>
    <Router history={hashHistory}>
        <Route path="/" component={App}>
        </Route> 
        <Route path="/stuff" component={Stuff}/>
    </Router>
</Provider>)

ReactDOM.render(MainRouter, document.getElementById('main'))