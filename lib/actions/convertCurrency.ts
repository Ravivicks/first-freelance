"use server";

import axios from "axios";

const API_KEY = process.env.EXCHANGE_RATE_API_KEY;
const EXCHANGE_RATE_API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`; // Replace with actual URL if different

export async function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): Promise<number> {
  try {
    const response = await axios.get(EXCHANGE_RATE_API_URL);
    const rates = response.data.conversion_rates;

    if (!rates) {
      throw new Error("No rates available");
    }

    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];

    if (!fromRate || !toRate) {
      throw new Error(
        `Invalid currency code: ${fromCurrency} or ${toCurrency}`
      );
    }

    const convertedAmount = (amount / fromRate) * toRate;
    return convertedAmount;
  } catch (error: any) {
    console.error("Error converting currency:", error.message);
    return amount; // Fallback to original amount if conversion fails
  }
}
