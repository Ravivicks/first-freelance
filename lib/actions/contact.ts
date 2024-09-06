"use server";
import { IContact } from "@/types";
import { connectToDB } from "../mongoose";
import Contact from "../models/contact.model";

export async function getAllContacts(): Promise<IContact[] | any> {
  try {
    await connectToDB();

    const contacts = await Contact.find();

    return JSON.parse(JSON.stringify(contacts));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch contacts");
  }
}
