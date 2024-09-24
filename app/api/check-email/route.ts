import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import Groq from "groq-sdk";

export const POST = async (req: NextRequest) => {
    const { sender, subject, body } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;
    const groq = new Groq({ apiKey });

    if (!sender || !subject || !body) {
        return NextResponse.json(
            { error: 'Sender, subject, and body are required' },
            { status: 400 }
        );
    }

    const prompt = `
      Analyze the following email for signs of a scam. Return the results in only the following structured JSON format, with no additional text.
      The JSON format should include the scam likelihood percentage, flagged sections, detailed breakdown, and action suggestions.

      Here is the email:
      - Sender: ${sender}
      - Subject: ${subject}
      - Body: ${body}

      Return the output in this exact JSON format:

      {
        "scam_likelihood": {
          "percentage": [percentage],
          "risk_level": "[Low/Moderate/High]",
          "description": "[Explanation of the scam likelihood]"
        },
        "flagged_sections": [
          {
            "type": "[phrase/link/sender]",
            "text": "[Flagged content]",
            "reason": "[Reason this was flagged]"
          }
        ],
        "breakdown": {
          "language_and_tone": {
            "score": [score],
            "description": "[Explanation of the language and tone analysis]"
          },
          "sender_info": {
            "score": [score],
            "description": "[Explanation of the sender information analysis]"
          },
          "links_attachments": {
            "score": [score],
            "description": "[Explanation of the links and attachments analysis]"
          }
        },
        "suggestions": {
          "low_risk": "This email seems safe, but always double-check the sender before replying.",
          "moderate_risk": "This email has suspicious elements. Avoid providing personal information.",
          "high_risk": "This email is very likely a scam. Delete it immediately and do not respond."
        }
      }
    `


    try {
        console.log("Processing");

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are an assistant that detects scam emails.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: "llama-3.1-8b-instant"
        })

        const responseContent = chatCompletion.choices[0]?.message?.content;
        if (responseContent) {
            const result = JSON.parse(responseContent);
            console.log(result)
            return NextResponse.json({ result }, { status: 200 });
        } else {
            return NextResponse.json({ error: "No content returned from AI." }, { status: 500 });
        }

    } catch (error: any) {
        console.log("Error occurred", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};