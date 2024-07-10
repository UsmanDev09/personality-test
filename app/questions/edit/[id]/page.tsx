import { EditQuestionsForm } from "@/app/components/Forms/EditQuestionsForm"

export const dynamic = 'force-dynamic'

export default async function editQuestion({ params } : {  params: { id: string } }) {
    const response = await fetch(`${process.env.CLIENT_URL}/api/question?id=${params.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const quiz = await response.json()

    return (
        <EditQuestionsForm quiz={quiz.data} />
    )
}