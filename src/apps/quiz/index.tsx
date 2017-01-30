import 'babel-polyfill'

import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import { Provider } from 'react-redux';

import quizInfo from '../../store/quiz/reducers/reducer'
import App from '../../containers/quiz/quizApp'

import { storeFactory } from '../../utils'

let store = storeFactory([quizInfo], "localhost:8000", true)

let MainRouter =
(<Provider store={store}>
    <Router history={hashHistory}>
        <Route path="/" component={ App }>
        </Route> 
    </Router>
</Provider>)

ReactDOM.render(MainRouter, document.getElementById('main'))