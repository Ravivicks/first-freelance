"use server";
import { CommonEnquireProps, EnquireProps } from "@/types";
import { connectToDB } from "../mongoose";
import Enquiry from "../models/enquiry.model";
import { generateEmailBody, sendEmail } from "../nodemailer";
import CommonEnquiry from "../models/common.enquiry.model";

export async function createNewEnquiry(enquiry: EnquireProps) {
  try {
    await connectToDB();
    const result = await Enquiry.create(enquiry);
    if (result) {
      const emailContent = await generateEmailBody(
        "ENQUIRY",
        undefined,
        enquiry
      );
      await sendEmail(emailContent, [
        enquiry.email,
        "anuragivinneta@gmail.com",
        // "rabbuips123@gmail.com",
      ]);
    }

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Error creating bulk users:", error);
  }
}
export async function createNewCommonEnquiry(enquiry: CommonEnquireProps) {
  try {
    await connectToDB();
    const result = await CommonEnquiry.create(enquiry);
    if (result) {
      const emailContent = await generateEmailBody(
        "ENQUIRY",
        undefined,
        enquiry
      );
      await sendEmail(emailContent, [
        enquiry.email,
        "anuragivinneta@gmail.com",
        // "rabbuips123@gmail.com",
      ]);
    }

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Error creating bulk users:", error);
  }
}
