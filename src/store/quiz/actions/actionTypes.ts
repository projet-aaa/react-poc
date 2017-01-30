export const ActionTypes = {
    CHOOSE: "QUIZ/CHOOSE",
    VALIDATE: "QUIZ/VALIDATE"
}


export interface ChooseAction {
    id: number
    choice: any
}

export interface ValidateAction {
    id: number 
}