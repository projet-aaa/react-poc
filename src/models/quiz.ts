export interface Quiz {
    id: number
    question: string
    answers: string[]
    chosen: number
    isValidated: boolean
}