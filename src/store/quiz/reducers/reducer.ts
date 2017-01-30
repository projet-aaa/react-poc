import { handleActions } from "redux-actions"
import * as imm from "immutable"

import { Action } from "../../../utils"
import { ActionTypes, ChooseAction, ValidateAction} from "../actions/actionTypes"
import { Quiz } from "../../../models/quiz"

interface QuizInfo {
    current: number
    quiz: Quiz[]
}

const name = "quiz"
const reducer = handleActions({
    [ActionTypes.CHOOSE]: function(state: QuizInfo, action: Action<ChooseAction>): QuizInfo {
        return Object.assign({}, state, {
            quiz: state.quiz.map(q => {
                if(q.id == action.payload.id) {
                    return Object.assign({}, q, {
                        chosen: action.payload.chosen
                    })
                }
                return q
            })
        })
    },
    [ActionTypes.VALIDATE]: function(state: QuizInfo, action: Action<ValidateAction>): QuizInfo {
        return Object.assign({}, state, {
            quiz: state.quiz.map((q, index) => {
                if(q.id == action.payload.id) {
                    return Object.assign({}, q, {
                        isValidated: true
                    })
                }
                return q
            })
        })
    }
}, { 
    current: 0,
    quiz: [{
        id: 0,
        question: "Ceci est une question?",
        answers: ["ok", "oui", "non"],
        chosen: -1,
        isValidated: false
    }]
});

export default { [name]: reducer }