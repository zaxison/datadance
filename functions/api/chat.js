export async function onRequest(context) {
  if (context.request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const body = await context.request.json();

    // The API key is set directly here for now, per user's request.
    // In a real production scenario, this should be in context.env.MINIMAX_API_KEY
    const apiKey = 'sk-cp-FNNPuDlXvE0RV7QD50WBeh7T_CVkWPG2BaujL64oemMyFVFWvrWh2Lc0z9vs368ujBWWiQYtOUdp4RPe_IFKw651XsV0yfgMbDR8oELd9vXXcZjDiT-omzQ';

    const response = await fetch('https://api.minimax.chat/v1/text/chatcompletion_v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'MiniMax-M2.7', // 确保云函数也使用正确的 M2.7 模型
        messages: body.messages || [],
        stream: body.stream || false
      })
    });

    if (body.stream) {
      return new Response(response.body, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        }
      });
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}