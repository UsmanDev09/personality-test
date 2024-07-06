export type Choice = {
    text: string
    weightage: number
}

export type Question = {
    id: string
    question: string
    choices: Choice[]
}

