import { NextApiRequest, NextApiResponse } from "next";

export async function POST(request: Request) {
  const body = await request.json();

  if (body.input === "") return new Error("input is empty!");

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/fastspeech2-en-ljspeech",
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_API_TOKEN}`,
        },
        method: "POST",
        body: JSON.stringify({
          inputs: body.input,
        }),
      }
    );

    const audioData = await response.arrayBuffer();
    return new Response(audioData, {
      headers: {
        "Content-Type": "audio/mpeg",
      },
    });
  } catch (error) {
    console.log(error)
    return new Response("Error Fetching Data", {
        status: 500
    })
  }
}