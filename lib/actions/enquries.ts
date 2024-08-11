"use server";
import { EnquireProps } from "@/types";
import { connectToDB } from "../mongoose";
import Enquiry from "../models/enquiry.model";

export async function createNewEnquiry(enquiry: EnquireProps) {
  try {
    await connectToDB();
    const result = await Enquiry.create(enquiry);
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Error creating bulk users:", error);
  }
}
