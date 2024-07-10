import Link from "next/link"
import Image from "next/image"
import { deleteQuestion } from "../actions/actions"
import { Choice, Quiz } from "../types/types"

/**
 * Cards component which shows question and choices.
 *
 * @component
 * @param {Object} quiz - Information about the quiz comprises id, question and choices
 */

export const Cards = ({ quiz } : { quiz: Quiz[]}) => {

    return (
        quiz && quiz.map((q) => {
            return (
                <div key={q.id} className="block max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-pink dark:border-gray-700">
                    <div className="flex gap-x-2">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">{q.question}</h5>
                    </div>
                    <ol data-testid="list">
                        {q.choices && q.choices.map((choice: Choice, index: number) => {
                            return (
                                <li key={index} className="list-decimal font-normal text-gray-700 dark:text-white-400 ml-4">{choice.text}</li>
                            )
                        })}
                    </ol>
                    <div className="flex mt-2 gap-2">
                        <Link href={`questions/edit/${q.id}`}>
                            <button className={`bg-green-500 text-white p-2 w-20 rounded hover:bg-green-800`}>Edit</button>
                        </Link>
                        <form action={deleteQuestion.bind(null, q.id.toString())}>
                            <button data-testid="delete-button" type='submit' className={`bg-red-500 text-white p-2 w-20 rounded hover:bg-red-800`}>Delete</button>
                        </form>
                    </div>
                </div>
            )
        })
    )
}