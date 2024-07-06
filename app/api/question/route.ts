import { NextRequest, NextResponse } from 'next/server';
import { client } from '../../lib/db';


export async function GET(req: NextRequest, res: NextResponse) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    try {
      const key = `question:${id}`;
        const questionData = await client.hgetall(key);

        if (!questionData || Object.keys(questionData).length === 0) {
          return NextResponse.json({ error: `Question with ID ${id} not found` }, { status: 404 });
        }

        const question = {
          id: key.split(':')[1],
          question: questionData.question,
          choices: [1,2,3,4].map((choiceNumber) => ({
            text: questionData[`choice${choiceNumber}`],
            weightage: parseInt(questionData[`weightage${choiceNumber}`]) || 0,
          })),
        };
      
      return NextResponse.json({ data: question }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error }, { status: 500});
    }

}


