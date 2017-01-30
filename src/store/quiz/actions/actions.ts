import * as fetch from 'isomorphic-fetch'

import { Action } from '../../../utils'
import { ActionTypes, ValidateAction, ChooseAction} from './actionTypes'

export function validateAction(): Action<ValidateAction> {
    return {
        type: ActionTypes.VALIDATE,
        payload: { }
    }
}

export function chooseAction(chosen: number): Action<ChooseAction> {
    return {
        type: ActionTypes.CHOOSE,
        payload: {
            chosen: chosen
        }
    }
}

