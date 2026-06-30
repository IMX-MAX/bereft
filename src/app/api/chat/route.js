import { Mistral } from '@mistralai/mistralai';
import { Composio } from 'composio-core';

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid messages array' }), { status: 400 });
    }

    const mistralApiKey = process.env.MISTRAL_API_KEY;
    const composioApiKey = process.env.COMPOSIO_API_KEY;

    // For the MVP, if API keys are missing, we'll return a simulated response
    if (!mistralApiKey || !composioApiKey) {
      console.warn("API keys not found. Returning simulated response.");
      return new Response(JSON.stringify({
        message: {
          role: 'assistant',
          content: "Done — I scanned your unread Slack, pulled context from Gmail and Notion, and drafted replies. Here's the rundown before anything sends.\n\n### What needs you\n- **Slack** — 4 threads need a reply. 2 are time-sensitive: the Acme renewal and the on-call handoff.\n- **Gmail** — drafted 3 responses, matched to each thread's tone and prior history.\n- **Notion** — logged the decisions from those threads into the Q3 planning doc.\n\n### Queued and ready\n1. **Send all 3 drafts** — reviewed for tone, nothing sends until you approve.\n2. **Snooze Acme** until the signed contract lands in Gmail.\n3. **Create 2 Linear tasks** from the on-call handoff action items."
        }
      }), { status: 200 });
    }

    // Initialize clients
    const mistral = new Mistral({ apiKey: mistralApiKey });
    const composio = new Composio({ apiKey: composioApiKey });

    // 1. Get available tools from Composio
    // Note: In a real app, you would filter tools based on connected apps or the user's specific context.
    const tools = await composio.getTools();
    
    // Convert Composio tools to Mistral tool format (if necessary depending on SDK)
    // The composio SDK might have a helper for this, but for now we assume they are compatible
    // or we just send the user prompt to Mistral if we are just chatting.
    
    // 2. Call Mistral
    const chatResponse = await mistral.chat.complete({
      model: 'mistral-large-latest',
      messages: messages,
      // tools: tools, // Enable when ready to actually execute tools
    });

    const assistantMessage = chatResponse.choices[0].message;

    // 3. Handle Tool Calls (Simplified)
    if (assistantMessage.toolCalls && assistantMessage.toolCalls.length > 0) {
      // In a full implementation, you would iterate over toolCalls,
      // execute them via composio, and send the results back to Mistral.
      // For MVP, we'll just acknowledge them.
      console.log("Tools called:", assistantMessage.toolCalls);
    }

    return new Response(JSON.stringify({ message: assistantMessage }), { status: 200 });
    
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
