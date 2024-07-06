import { EditQuestionsForm } from "@/app/components/Questions/EditQuestionsForm"

export const dynamic = 'force-dynamic'

export default async function editQuestion({ params } : {  params: { id: string } }) {
    const questions = await fetch(`${process.env.CLIENT_URL}/api/question?id=${params.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const json = await questions.json()
    console.log('JC', json.data.choices)

    return (
        <EditQuestionsForm question={json.data} />
    )
}