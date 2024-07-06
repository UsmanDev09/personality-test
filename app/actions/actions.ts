'use server'

import { client } from "../lib/db"
import { redirect } from "next/navigation"

export async function createQuestion(formData: FormData) {
  try {
    const choices: string[] = []
    const weightages: string[] = []

    {[1, 2, 3, 4].forEach((number) => {
      choices.push(formData.get(`choice${number}`) as string)
      weightages.push(formData.get(`weightage${number}`) as string)
    })}

    const id = Date.now() + "" + Math.floor(Math.random()*10000000);

    const question = formData.get('question') as string;
    await client.hset(`question:${id}`, 'question', question);

    const promises = [1, 2, 3, 4].map((index: number) => (
      client.hset(`question:${id}`, `choice${index}`, choices[index-1])
    ));
    
    const weightagePromises = [1, 2, 3, 4].map((index: number) => (
      client.hset(`question:${id}`, `weightage${index}`, weightages[index-1].toString())
    ));
    
    await Promise.all([...promises, ...weightagePromises])
    .catch((error) => {
      console.error("Error executing promises:", error);
    });
    
  } catch (err: unknown) {
    if(err instanceof Error) {
      return { error: err.message };
    }
    return { error: 'Something went wrong' };
  }
    
    redirect('/questions')
}

export async function updateQuestion(formData: FormData) {
    try {
      const choices: string[] = []
      const weightages: string[] = []
      const id = formData.get('id') as string;

      {[1, 2, 3, 4].forEach((number) => {
        choices.push(formData.get(`choice${number}`) as string)
        weightages.push(formData.get(`weightage${number}`) as string)
      })}
  
  
      const question = formData.get('question') as string;
      await client.hset(`question:${id}`, 'question', question);
  
      const promises = [1, 2, 3, 4].map((index: number) => (
        client.hset(`question:${id}`, `choice${index}`, choices[index-1])
      ));
      
      const weightagePromises = [1, 2, 3, 4].map((index: number) => (
        client.hset(`question:${id}`, `weightage${index}`, weightages[index-1].toString())
      ));

      await Promise.all([...promises, ...weightagePromises])
      .catch((error) => {
        console.error("Error executing promises:", error);
      });

      } catch (error) {
        console.error('Error updating question:', error);
      }

      redirect('/questions')

}

export async function deleteQuestion(id: string) {
  try {
    const questionKey = `question:${id}`;
    
    // Check if question exists
    const exists = await client.exists(questionKey);
    // Delete the question
    await client.del(questionKey);

  } catch (error) {
    console.error('Error deleting question:', error);
  }

  redirect('/questions')

}
