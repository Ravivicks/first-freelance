"use server";

import axios from "axios";

const GOOGLE_TRANSLATE_API_URL =
  "https://translation.googleapis.com/language/translate/v2";
const API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY; // Replace with your API key

export async function translateText(
  text: string,
  targetLang: string | any
): Promise<string> {
  try {
    const response = await axios.post(
      GOOGLE_TRANSLATE_API_URL,
      {},
      {
        params: {
          q: text,
          target: targetLang,
          key: API_KEY,
        },
      }
    );
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error("Error translating text:", error);
    return text; // Fallback to original text if translation fails
  }
}
