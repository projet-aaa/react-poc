export const ActionTypes = {
    CHOOSE: "CHOOSE",
    VALIDATE: "VALIDATE"
}


export interface ChooseAction {
    chosen: number
}

export interface ValidateAction { }