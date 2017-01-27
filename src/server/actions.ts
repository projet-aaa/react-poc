import { Action } from '../utils'

interface SendTextAction {
    text: string
}

export function sendText(text: string): Action<SendTextAction> {
    return {
        type : 'server/msg',
        payload: { text }
    }
}