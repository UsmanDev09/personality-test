export const Question = ({question}: {question: string}) => {
    return (
        <div>
            <p data-testid='question-element' className="text-3xl">{question}</p>
        </div>
    )
}