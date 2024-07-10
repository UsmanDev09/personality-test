// pages/api/getQuestions.js
import { NextRequest, NextResponse } from 'next/server';
import { client } from '../../lib/db';


export async function GET(req: NextRequest, res: NextResponse) {
    try {
      // Get all keys that match the pattern "question:*"
      const keys = await client.keys('question:*');
      const questions = [];
      // Retrieve all questions and their choices
      for (const key of keys) {
        const questionData = await client.hgetall(key);

        const question = {
          id: key.split(':')[1],
          question: questionData.question,
          choices: [1,2,3,4].map((choiceNumber) => ({
            text: questionData[`choice${choiceNumber}`],
            weightage: parseInt(questionData[`weightage${choiceNumber}`]) || 0,
          })),
        };
        questions.push(question);
      }

      return NextResponse.json({ data: questions }, { status: 200 });
    } catch (error) {
      console.error('Error fetching questions:', error);
      return NextResponse.json({ error }, { status: 500});
    }

}
