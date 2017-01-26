/// <reference path="../../typings/index.d.ts" />

import { combineReducers } from 'redux'

import todo from '../reducers/todo'
import stuff from '../reducers/stuff'

const reducer = combineReducers({
    todo,
    stuff
})

export default reducer