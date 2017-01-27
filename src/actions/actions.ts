/// <reference path="../../typings/index.d.ts" />

import * as fetch from 'isomorphic-fetch'

import { Action } from '../utils/index'
import { ActionTypes, AddTodoAction, RemoveTodoAction, GeneralAction, AskTodoAction, RequestTodoAction, ReceiveTodoAction } from "./actionTypes"

export function addTodo(id: number, text: string): Action<AddTodoAction> {
    return {
        type: ActionTypes.ADD_TODO,
        payload: {
            id: id,
            text: text
        }
    }
}

export function removeTodo(id: number): Action<RemoveTodoAction> {
    return {
        type: ActionTypes.REMOVE_TODO,
        payload: {
            id: id
        }
    }
}

export function close(): Action<GeneralAction> {
    return {
        type: ActionTypes.CLOSE,
        payload: {}
    }
}
export function open(): Action<GeneralAction> {
    return {
        type: ActionTypes.OPEN,
        payload: {}
    }
}

function askTodo(): Action<AskTodoAction> {
    return {
        type: ActionTypes.ASK_TODO,
        payload: {}
    }
}

export function receiveTodo(text): Action<ReceiveTodoAction> {
    console.log("receiveTodo!")
    return {
        type: ActionTypes.RECEIVE_TODO,
        payload: { 
            text: text,
            receivedAt: Date.now()
        }
    }
}

export function requestTodo() {
    return function (dispatch) {
        dispatch(askTodo())
        // return new Promise(
        //     function(resolve, reject) {
        //         setTimeout(
        //             function() {
        //                 resolve();
        //         }, 1000);
        //     }
        // ).then(() => dispatch(receiveTodo("Ceci est un test")))
        return fetch('http://localhost:8000/static/todo.json')
            .then(response => response.json())
            .then(json => dispatch(receiveTodo(json.text)))
    }
}