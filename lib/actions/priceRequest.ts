"use server";
import { PriceRequestProps } from "@/types";
import { connectToDB } from "../mongoose";
import { generateEmailBody, sendEmail } from "../nodemailer";
import PriceRequest from "../models/priceRequest.modal";

export async function createNewPriceRequest(enquiry: PriceRequestProps) {
  try {
    await connectToDB();
    const result = await PriceRequest.create(enquiry);
    if (result) {
      const emailContent = await generateEmailBody(
        "REQUEST_FOR_PRICE",
        undefined,
        enquiry
      );
      await sendEmail(emailContent, [
        enquiry.email,
        // "anuragivinneta@gmail.com",
        // "rabbuips123@gmail.com",
      ]);
    }

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Error creating price request:", error);
  }
}
