"use server";
import { EnquireProps } from "@/types";
import { connectToDB } from "../mongoose";
import Enquiry from "../models/enquiry.model";
import { generateEmailBody, sendEmail } from "../nodemailer";

export async function createNewEnquiry(enquiry: EnquireProps) {
  try {
    await connectToDB();
    const result = await Enquiry.create(enquiry);
    // if (result) {
    //   const emailContent = await generateEmailBody(enquiry, "WELCOME");
    //   await sendEmail(emailContent, [
    //     enquiry.email,
    //     "anuragivinneta@gmail.com",
    //     "rabbuips123@gmail.com",
    //   ]);
    // }

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Error creating bulk users:", error);
  }
}
