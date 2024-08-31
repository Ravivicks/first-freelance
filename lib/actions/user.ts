"use server";
import { IUser } from "@/types";
import { connectToDB } from "../mongoose";
import User from "../models/user.model";

export async function userById(emailId: string): Promise<IUser | null> {
  try {
    await connectToDB();

    const user = await User.findOne({ email: emailId });
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log(error);
    return null;
  }
}
