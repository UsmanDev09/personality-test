import { updateQuestion } from '../../actions/actions';
import { Choice, Question } from "@/app/types/types";

export const EditQuestionsForm = ({question}: {question: Question}) => {

    const updateQuestionAction = updateQuestion.bind(null)
    
     return (
        <form action={updateQuestionAction}>
            <div className="flex gap-4 flex-wrap mt-8">
                <input type="hidden" name="id" defaultValue={question.id} />
                <input
                    type="text"
                    required
                    name="question"
                    aria-label='Edit question'
                    defaultValue={question.question}
                    placeholder="Enter Question"
                    className="w-full border-gray rounded-lg border border-stroke bg-gray-50 bg-white px-4 py-3 text-black focus:border-2 focus:border-black focus:ring-black focus:border-black focus-visible:outline-none"
                />
                <div className="flex flex-col flex-wrap gap-4" >
                    {question.choices.map((choice: Choice, index: number) => {
                        return (
                            <div key={index} className="flex flex-col gap-4">
                                <input aria-label={`Edit choice ${index + 1}: ${choice.text}}`} name={`choice${index + 1}`} defaultValue={choice.text} className="block p-2.5 w-[400px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter choice"></input>
                                <input name={`weightage${index + 1}`}  type="number" defaultValue={choice.weightage} id="number-input" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5 " placeholder="Weightage" required min='-1' max='1' />
                            </div>
                        )
                    })}
                </div>
                
            </div>
        
            <button className="flex mt-4 w-40 items-center justify-center gap-2 rounded bg-green-500 px-4.5 py-2.5 font-medium text-white hover:bg-green-800 dark:bg-green-800">
                <svg
                    className="fill-current"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                <g clipPath="url(#clip0_60_9740)">
                    <path
                    d="M18.75 9.3125H10.7187V1.25C10.7187 0.875 10.4062 0.53125 10 0.53125C9.625 0.53125 9.28125 0.84375 9.28125 1.25V9.3125H1.25C0.875 9.3125 0.53125 9.625 0.53125 10.0312C0.53125 10.4062 0.84375 10.75 1.25 10.75H9.3125V18.75C9.3125 19.125 9.625 19.4687 10.0312 19.4687C10.4062 19.4687 10.75 19.1562 10.75 18.75V10.7187H18.75C19.125 10.7187 19.4687 10.4062 19.4687 10C19.4687 9.625 19.125 9.3125 18.75 9.3125Z"
                    fill=""
                    />
                </g>
                <defs>
                    <clipPath id="clip0_60_9740">
                    <rect width="20" height="20" fill="white" />
                    </clipPath>
                </defs>
                </svg>
                    Edit question
            </button>
    </form>
    )
}