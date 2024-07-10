export type Choice = {
    text: string
    weightage: number
}

export type Quiz = {
    id: string
    question: string
    choices: Choice[]
}

