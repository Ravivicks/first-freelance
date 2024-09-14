"use server";
import { IUser, UpdateUserInput } from "@/types";
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

export async function updateUser(
  updates: UpdateUserInput
): Promise<IUser | null> {
  try {
    await connectToDB();

    // Use the $set operator to update fields except for password
    const updatedUser = await User.findOneAndUpdate(
      { email: updates.email },
      { $set: updates },
      { new: true } // Return the updated document
    );

    if (updatedUser) {
      return JSON.parse(JSON.stringify(updatedUser));
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
