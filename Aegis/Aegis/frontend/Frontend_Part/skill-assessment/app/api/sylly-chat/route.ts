import { NextResponse } from 'next/server';

const CODEGPT_API_URL = 'https://api.codegpt.co/api/v1/chat/completions';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body;

    // Check if environment variables are set
    if (!process.env.NEXT_PUBLIC_CODEGPT_API_KEY || !process.env.NEXT_PUBLIC_CODEGPT_ORG_ID) {
      throw new Error("API key or organization ID is not set.");
    }

    const response = await fetch(CODEGPT_API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CODEGPT_API_KEY}`,
        'CodeGPT-Org-Id': process.env.NEXT_PUBLIC_CODEGPT_ORG_ID,
      },
      body: JSON.stringify({
        agentId: process.env.NEXT_PUBLIC_CODEGPT_SYLLY_ID,
        messages: [
          { role: 'user', content: message }
        ],
        stream: false,
        format: 'json'
      })
    });

    if (!response.ok) {
      throw new Error(`CodeGPT API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json({
      response: data.choices[0].message.content,
    });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ response: "I'm sorry, I couldn't process your request." }, { status: 500 });
  }
}