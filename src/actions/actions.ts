/// <reference path="../../typings/index.d.ts" />

import { Action } from '../utils/index'
import { ActionTypes, AddTodoAction, RemoveTodoAction } from "./actionTypes"

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