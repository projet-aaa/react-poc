/// <reference path="../../typings/index.d.ts" />

import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import createSocketIoMiddleware from 'redux-socket.io'
import * as io from 'socket.io-client'

// -- ACTION CREATOR HELPERS
export interface Action<T>{
	type: string
	payload: T
    error?: boolean
}

// -- STORE CREATOR HELPER
export const storeFactory = (reducers: any[], url: string) => {
    let socket = io.connect(url),
        reducers2 = {}, len = reducers.length,
        reducer = null

    for(let i = 0; i < len; i++) {
        Object.assign(reducers2, reducers[i])
    }
	reducer = combineReducers(reducers2)
    return createStore(
        reducer,
        applyMiddleware(
            thunk,
            createSocketIoMiddleware(socket, 'SERVER/')
        )
    )
}