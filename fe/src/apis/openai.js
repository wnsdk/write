import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

export const correctWriting = async (text, title) => {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'user',
                    content: `Please revise the following text (${text}) sentence by sentence to align with the theme of the writing (${title}).
          For each correction, provide a brief explanation of why the change was made in Korean, and please make it friendly and conversational, as if you're speaking directly to someone.
          If there are no corrections, please leave the explanation value as an empty string ("").
          CorrectedTexts must be written in English.
          Also, please highlight only the corrections in the corrected text using bold formatting, and note that this formatting should only apply to the 'correctedTexts' section
          If there is a better expression that generally conveys the same meaning as the original text and is more suitable in terms of the theme and context of the writing, please recommend it. 
          Please provide an evaluation of the text's quality in relation to the theme in Korean, and also assign a score out of 100.
          the evaluation criteria are as follows:
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
        console.error('Error communicating with OpenAI:', error);
        throw error; // 에러를 호출자에게 전달
    }
};

export const correctCopying = async (text, body) => {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'user',
                    content: `Please analyze the text(${text}) below, which is a transcription of the body(${body}). 
          Check sentence by sentence to see if the text matches the body exactly. 
          For any parts that do not match, correct them and highlight those corrections using bold formatting. 
          CorrectedTexts must be written in English.
          Additionally, provide a score based on the percentage of correctly written words compared to the total word count. Please input only the numerical value.
          If a sentence is transcribed correctly, simply input the correctly transcribed sentence as it is in the 'correctedText'. This means that all sentences should be included in both 'originalText' and 'correctedText'.
          Please write it in a grammatically correct format, considering that it will be parsed as JSON later.
          The response format should be as follows: { "originalTexts": ["original text 1", "original text 2"], "correctedTexts": ["corrected text 1", "corrected text 2"], "score": "score" }`,
                },
            ],
        });
        return response.choices[0].message.content;
    } catch (error) {
        console.error('Error communicating with OpenAI:', error);
        throw error; // 에러를 호출자에게 전달
    }
};

export const correctTranslating = async (text, body) => {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'user',
                    content: `Please review the text(${text}), which is a translation of the body(${body}) into English. Provide feedback on the translation by analyzing it sentence by sentence for accuracy and clarity.
          For each correction, provide a brief explanation of why the change was made in Korean, and please make it friendly and conversational, as if you're speaking directly to someone.
          If there are no corrections, please leave the explanation value as an empty string (""). 
          CorrectedTexts must be written in English.
          Also, please highlight only the corrections in the corrected text using bold formatting, and note that this formatting should only apply to the 'correctedTexts' section
          If there is a better expression that generally conveys the same meaning as the original text and is more suitable in terms of the theme and context of the writing, please recommend it. 
          Evaluate the text based on how well the translation aligns with the original text, and also assign a score out of 100.
          Please write it in a grammatically correct format, considering that it will be parsed as JSON later.
          Return the result in the following format: { "koreanTexts": ["korean text 1", "korean text 2"], "originalTexts": ["original text 1", "original text 2"], "correctedTexts": ["corrected text 1", "corrected text 2"], "explanations": ["explanation 1", "explanation 2"], "evaluation": "your evaluation", "score" : "score" }. `,
                },
            ],
        });
        return response.choices[0].message.content;
    } catch (error) {
        console.error('Error communicating with OpenAI:', error);
        throw error; // 에러를 호출자에게 전달
    }
};

export const getResponse = async (text) => {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content:
                        "You are playing the role of an English teacher who helps students learn. Respond to the student's questions in a friendly tone.",
                },
                { role: 'user', content: text },
            ],
        });
        return response.choices[0].message.content;
    } catch (error) {
        console.error('Error communicating with OpenAI:', error);
        throw error; // 에러를 호출자에게 전달
    }
};
