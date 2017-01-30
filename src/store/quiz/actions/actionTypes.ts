export const ActionTypes = {
    CHOOSE: "CHOOSE",
    VALIDATE: "VALIDATE"
}


export interface ChooseAction {
    id: number
    chosen: number
}

export interface ValidateAction {
    id: number 
}