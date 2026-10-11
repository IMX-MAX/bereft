import { CohereClient } from 'cohere-ai';

export async function POST(req) {
  try {
    const { prompt, currentEvents } = await req.json();

    const cohere = new CohereClient({
      token: process.env.COHERE_API_KEY,
    });

    const response = await cohere.chat({
      message: `You are a calendar assistant. The user wants to add tasks or events to their calendar.
Current events: ${JSON.stringify(currentEvents || [])}
User request: ${prompt}

Return ONLY a valid JSON array of new event objects with the following keys:
- id: a unique string
- title: string
- start: ISO 8601 string representing the start time (assume current date is ${new Date().toISOString()})
- end: ISO 8601 string representing the end time
- type: string (e.g., 'meeting', 'focus', 'task')

Do not include markdown blocks or any other text. Return just the JSON array.`,
      model: 'command-r-plus',
    });

    let newEvents = [];
    try {
      const text = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
      newEvents = JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse AI response as JSON", response.text);
      return new Response(JSON.stringify({ error: 'AI did not return valid JSON', text: response.text }), { status: 500 });
    }

    return new Response(JSON.stringify({ events: newEvents }), { status: 200 });
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
