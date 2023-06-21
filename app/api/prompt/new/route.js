import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
/*
const response =  await fetch('/api/prompt/new', 
{
    method:'POST',
    body: JSON.stringify({
        prompt: post.prompt,
        tag: post.tag,
        userId: session?.user.id,
    })
})
*/
export const POST = async (req) => {
    const { userId, prompt, tag } = await req.json();

    try {
        await connectToDB(); // need to connect everytime since its Lambda function meaning its going to die when it does its job 
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return new Response('Failed to create a new prompt', { status: 500 })
    }
}