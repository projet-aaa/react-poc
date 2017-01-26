import { Action } from "../utils/index";
import { ActionTypes, AddTodoAction, RemoveTodoAction } from "../actions/actionTypes";
import { handleActions } from "redux-actions";
import { Todo } from "../models/models"

const reducer = handleActions({
    [ActionTypes.REMOVE_TODO]: function(state: Todo[] = [], action: Action<AddTodoAction>): Todo[] {
        let res = []

        for(let e of state) {
            if(e.id != action.payload.id) {
                res.push(e)
            }
        }
        return res
    },
    [ActionTypes.ADD_TODO]: function(state: Todo[] = [], action: Action<AddTodoAction>): Todo[] {
        return [
            ...state,
            { id: action.payload.id, text: action.payload.text }
        ]
    }
}, [{ id: 0, text: 'Un élément de todo'}, { id: 1, text: 'Un autre élément de todo' }]);

export default reducer;