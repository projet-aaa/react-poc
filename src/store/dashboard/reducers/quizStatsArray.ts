import { handleActions } from "redux-actions"

import { Action } from "../../../utils"
import { ActionTypes, LaunchAction, UpdateFeedbackAction } from "../actions/actionTypes"
import { StudentFeedback, QuizStats } from "../../../models/dashboard"

interface QuizStatsArrayInfo {
    quizStatsArray: QuizStats[]
}

let initialState: QuizStatsArrayInfo = {
   quizStatsArray: [
       {
           choices: [
               {
                   id: 1,
                   text: "choix 1",
                   percentChosen: 64
               },
               {
                   id: 2,
                   text: "choix 2",
                   percentChosen: 36
               }
           ],
           id: 0,
           correctAnswer: 2,
           state: 0
       },
       {
           choices: [
               {
                   id: 1,
                   text: "choix 1 q2",
                   percentChosen: undefined
               },
               {
                   id: 2,
                   text: "choix 2 q2",
                   percentChosen: undefined
               }
           ],
           id: 1,
           correctAnswer: 1,
           state: 2
       }
   ]
}

const name = "dahsboard"
const reducer = handleActions({
    [ActionTypes.LAUNCH]: function(state: QuizStatsArrayInfo, action: Action<LaunchAction>): QuizStatsArrayInfo {
         return Object.assign({}, state, {
            quizStatsArray: state.quizStatsArray.map(quiz => {
                if(quiz.id == action.payload.id) {
                    return Object.assign({}, quiz, {
                        state: 1
                    })
                }
                return quiz
            })
        })
    },
}, initialState);

export default { [name]: reducer }