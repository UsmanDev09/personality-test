import { HttpResponse, http } from 'msw';

export const handlers = [
    http.get('/questions', () => {
        return HttpResponse.json(
            [
                {
                    id: 1,
                    question: 'What is your name?',
                    choices: [
                        {
                            text: 'Usman', 
                            weightage1: 1
                        }, 
                        {
                            text: 'Ali', 
                            weightage1: 1
                        },
                        {
                            text: 'Nawal', 
                            weightage1: -1
                        },
                        {
                            text: 'Ahmad', 
                            weightage1: -1
                        }
                    ]
                }, 
                {
                    id: 2,
                    question: 'What is your age?',
                    choices: [
                        {
                            text: '10+', 
                            weightage1: 1
                        }, 
                        {
                            text: '20+', 
                            weightage1: 1
                        },
                        {
                            text: '30+', 
                            weightage1: -1
                        },
                        {
                            text: '40+', 
                            weightage1: -1
                        }
                    ]
                }
            ]
        )
    }
    )
]