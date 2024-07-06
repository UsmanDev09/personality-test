
'use client';

import { ProgressBar } from "../components/ProgressBar";
import { Result } from "../components/Result";
import { Question } from "../components/Question";
import { Choices } from "../components/Choices";
import { useEffect, useState } from "react";
import { Choice, Question as QuestionType } from "../types/types";
import toast from "react-hot-toast";
import { Raleway } from "next/font/google";

const raleway = Raleway({
    weight: '700',
    subsets: ['latin'],
})

export const Quiz = ({questions}: {questions: QuestionType[]}) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
    const [selectedChoices, setSelectedChoices] = useState<Choice[]>([]);

    useEffect(() => {
        if(!questions || questions?.length === 0) { 
            toast.error('No questions available!')
        }
    }, [questions])

    const onNext = () => {
        setCurrentQuestion(currentQuestion + 1);
        if(!selectedChoices[currentQuestion + 1]) {
            setNextBtnDisabled(true);
            return;
        } else if(selectedChoices[currentQuestion + 1]){
            setNextBtnDisabled(false);
        } 
    }

    const onBack = () => {
        setCurrentQuestion(currentQuestion - 1);
        if(selectedChoices[currentQuestion - 1]) {
            setNextBtnDisabled(false);
        }
    }


    const handleSelectChoice = (choice: Choice) => {
        const isSelected = selectedChoices[currentQuestion] !== undefined;
        let updatedChoices = [...selectedChoices];

        if (isSelected) {
            updatedChoices[currentQuestion] = choice;
        } else {
            updatedChoices = [...selectedChoices, choice];
        }

        setSelectedChoices(updatedChoices);
        setNextBtnDisabled(false);
    };

    return (
        <div data-testid='quiz' className={`${raleway.className} p-10`}>  
            {submitted ? (
                <Result score={score}/>
            ) : (
                <>
                    <ProgressBar progress={currentQuestion / (questions?.length) * 100 ? currentQuestion / (questions?.length) * 100 : 0} />
                    <div className="flex flex-col gap-2 mt-10">
                        <Question question={questions && questions[currentQuestion]?.question} />
                        <Choices choices={questions && questions[currentQuestion]?.choices} questionNumber={currentQuestion} handleSelectedChoices={handleSelectChoice} selectedChoices={selectedChoices} />
                        <div className="flex gap-4 mt-10">
                            {currentQuestion < (questions?.length) - 1 && <button data-testid='next-button' type="button" disabled={nextBtnDisabled} className={`${nextBtnDisabled ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-800'} text-white p-4 w-28 rounded`} onClick={onNext}>Next</button>}
                            {currentQuestion === (questions?.length) - 1 && <button data-testid='submit-button' disabled={nextBtnDisabled} className={`${nextBtnDisabled ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-800'} text-white p-4 w-28 rounded`} onClick={() => (selectedChoices[currentQuestion]) ? setSubmitted(true) : setNextBtnDisabled(true)}>Submit</button>}
                            {currentQuestion > 0 && <button data-testid='back-button' className="bg-green-500 text-white p-4 w-28 rounded hover:bg-green-800" onClick={onBack}>Back</button>}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}