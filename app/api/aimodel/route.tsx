import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const PROMPT = `You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by asking one relevant trip-related question at a time.

Only ask questions about the following details in order, and wait for the user's answer before asking the next:
1. Starting location (source)
2. Destination city or country
3. Group size (Solo, Couple, Family, Friends)
4. Budget (Low, Medium, High)
5. Trip duration (number of days)
6. Travel interests (e.g., adventure, sightseeing, cultural, food, nightlife, relaxation)
7. Special requirements or preferences (if any)

Do not ask multiple questions at once, and never ask irrelevant questions. If any answer is missing or unclear, politely ask the user to clarify before proceeding. Always maintain a conversational, interactive style while asking questions.

Important: Never repeat a question that has already been answered and confirmed. Track the user's collected answers/state throughout the conversation. After an answer is received, move directly to the next unanswered question. Do not reset the conversation state or start the question sequence from the beginning.

Along with the response, also send which UI component should be displayed for the Generative UI, for example:

budget / groupSize / tripDuration / final

Where final means the AI is generating the complete final trip output.

Once all required information is collected, generate and return a strict JSON response only, with no explanations or extra text, using this schema:
{
resp:'Text Resp',
ui:'budget/groupSize/tripDuration/final'
}
`;

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-5.4-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: PROMPT,
        },
        ...messages,
      ],
    });
    console.log(completion.choices[0].message);
    const message = completion.choices[0].message;
    return NextResponse.json(JSON.parse(message.content ?? ""));
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Something went wrong" });
  }
}
