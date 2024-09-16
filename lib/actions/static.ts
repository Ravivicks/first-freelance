"use server";
import { connectToDB } from "../mongoose";
import StaticData from "../models/static.model"; // Adjust the import as needed

const GOOGLE_TRANSLATE_API_URL =
  "https://translation.googleapis.com/language/translate/v2";
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY; // Replace with your actual API key

// Regular expression to identify route-like strings
const routeRegex = /^\/[a-zA-Z0-9-_\/]+$/;

async function translateTexts(
  texts: string[],
  targetLanguage: string
): Promise<string[]> {
  try {
    const response = await fetch(`${GOOGLE_TRANSLATE_API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: texts,
        target: targetLanguage,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch translations: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data.translations.map(
      (translation: any) => translation.translatedText
    );
  } catch (error) {
    console.error(`Translation error: ${error}`);
    throw new Error("Failed to translate texts");
  }
}

async function translateObject(obj: any, locale: string): Promise<any> {
  const textsToTranslate: string[] = [];
  const pathsToTranslate: string[] = [];

  // Collect all texts to translate and their paths
  function collectTexts(obj: any, path: string[] = []) {
    for (const [key, value] of Object.entries(obj)) {
      if (
        key === "image" ||
        (typeof value === "string" && routeRegex.test(value))
      ) {
        // Skip translation for fields with the key "image" or if the value is a route
        continue;
      } else if (typeof value === "string") {
        textsToTranslate.push(value);
        pathsToTranslate.push([...path, key].join("."));
      } else if (typeof value === "object" && value !== null) {
        collectTexts(value, [...path, key]);
      }
    }
  }

  collectTexts(obj);

  // Translate texts in batches
  const translatedTexts = await translateTexts(textsToTranslate, locale);

  // Map translated texts back to the object
  function applyTranslations(
    obj: any,
    translations: string[],
    paths: string[]
  ) {
    for (const [index, path] of paths.entries()) {
      const valuePath = path.split(".");
      let current = obj;

      for (let i = 0; i < valuePath.length - 1; i++) {
        current = current[valuePath[i]];
      }

      current[valuePath[valuePath.length - 1]] = translations[index];
    }
  }

  applyTranslations(obj, translatedTexts, pathsToTranslate);

  return obj;
}

export async function getAllStaticData(
  locale: string,
  type: string
): Promise<any> {
  try {
    await connectToDB();

    // Find data by type if provided, otherwise get the first entry
    const staticData = await StaticData.findOne({ type: type }).lean();

    if (!staticData) {
      throw new Error("No static data found");
    }

    // Translate the static data
    const translatedStaticData = await translateObject(staticData, locale);

    return JSON.parse(JSON.stringify(translatedStaticData));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch and translate data");
  }
}
