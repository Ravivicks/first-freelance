"use server";
import { ISupport } from "@/types";
import { connectToDB } from "../mongoose";
import Support from "../models/support.enquiry.model";

export async function createNewSupport(support: ISupport) {
  try {
    await connectToDB();
    const result = await Support.create(support);
    // if (result) {
    //   const emailContent = await generateEmailBody(
    //     "ENQUIRY",
    //     undefined,
    //     support
    //   );
    //   await sendEmail(emailContent, [
    //     support.email,
    //     // "anuragivinneta@gmail.com",
    //     // "rabbuips123@gmail.com",
    //   ]);
    // }

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Error creating bulk users:", error);
  }
}
