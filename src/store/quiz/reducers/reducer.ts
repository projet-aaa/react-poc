import { handleActions } from "redux-actions";

import { Action } from "../../../utils/index";
import { ActionTypes, ChooseAction, ValidateAction} from "../actions/actionTypes";
import { Quiz } from "../../../models/quiz"

const name = "quiz"
const reducer = handleActions({
    [ActionTypes.CHOOSE]: function(state: Quiz, action: Action<ChooseAction>): Quiz {
        let res = Object.assign({}, state)
        
        res.chosen = action.payload.chosen

        return res
    },
    [ActionTypes.VALIDATE]: function(state: Quiz, action: Action<ValidateAction>): Quiz {
        let res = Object.assign({}, state)
        
        res.isValidated = true

        return res
    }
}, { 
    question: "Ceci est une question?",
    answers: ["ok", "oui", "non"],
    chosen: -1,
    isValidated: false
});

export default { [name]: reducer }