import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

/**
 * GPT-4o-mini에게 작문 첨삭 요청
 * @param {string} text - 첨삭할 텍스트
 * @returns {Promise<string>} - 첨삭된 텍스트
 */
export const correctWriting = async (text, title) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Please revise the following text (${text}) sentence by sentence to align with the theme of the writing (${title}).
          For each correction, provide a brief explanation of why the change was made in Korean, and please make it friendly and conversational, as if you're speaking directly to someone.
          If there are no corrections, please leave the explanation value as an empty string (""). 
          Also, please highlight only the corrections in the corrected text using bold formatting, and note that this formatting should only apply to the 'correctedTexts' section
          If there is a better expression that generally conveys the same meaning as the original text and is more suitable in terms of the theme and context of the writing, please recommend it. 
          Please provide an evaluation of the text's quality in relation to the theme in Korean, and also assign a score out of 100.
          he evaluation criteria are as follows:
          1. Length of the text (10 points): Evaluate whether the length of the text is appropriate.
          2. Theme delivery (40 points): Assess whether the text effectively conveys the theme.
          3. Grammar (20 points): Evaluate the accuracy of grammar usage.
          4. Structure of the text (20 points): Assess whether the structure of the text is systematic.
          5. Other (10 points): Evaluate various other factors."
          Please write it in a grammatically correct format, considering that it will be parsed as JSON later.
          Return the result in the following format: { "originalTexts": ["original text 1", "original text 2"], "correctedTexts": ["corrected text 1", "corrected text 2"], "explanations": ["explanation 1", "explanation 2"], "evaluation": "your evaluation", "score" : "score" }. `,
        },
      ],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error communicating with OpenAI:", error);
    throw error; // 에러를 호출자에게 전달
  }
};
