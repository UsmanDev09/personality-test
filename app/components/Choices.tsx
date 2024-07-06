'use client'

import { Choice } from "../types/types";

export const Choices = ({ choices, handleSelectedChoices, selectedChoices, questionNumber } : { choices: Choice[], handleSelectedChoices: (choice: Choice) => void, questionNumber: number, selectedChoices: Choice[] }) => {

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, choice: Choice) => {
        if (event.key === 'Enter') {
            handleSelectedChoices(choice);
        }
    };

    return (
        <div role="radiogroup">
            {choices && choices.map((choice, index) => (
                <div role="radio" aria-checked={selectedChoices[questionNumber] === choice} tabIndex={0} onKeyDown={(e) => handleKeyDown(e, choice)} className="flex items-center" key={`${choice.text}-${index}`} data-testid={`choice-${index}`} onClick={() => handleSelectedChoices(choice)}>
                    <input id={`choice-${index}`} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type='radio' name='choice' required={true} checked={selectedChoices[questionNumber] === choice} onChange={() => handleSelectedChoices(choice)} value={choice.text}/>
                    <label htmlFor={`choice-${index}`} className="ms-2 text-lg font-medium text-black dark:text-black">{choice.text}</label>
                </div> 
            ))}
        </div>
    )
}