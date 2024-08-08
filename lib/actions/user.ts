"use server";

import User from "../models/user.model";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { UserProps } from "@/types";
// import { connectToDB } from "../mongodb";

export async function createUser(data: UserProps) {
  try {
    // await connectToDB();
    const user = await User.create({
      Name: data.Name,
      Age: data.Age,
      City: data.City,
    });
    return user;
  } catch (error) {
    console.log(error);
  }
}

const CHUNK_SIZE = 10000; // Adjust based on performance testing

export async function createBulkUsers(users: UserProps[]) {
  try {
    console.time("bulkInsert"); // Start timing the operation

    // Process in chunks
    for (let i = 0; i < users.length; i += CHUNK_SIZE) {
      const chunk = users.slice(i, i + CHUNK_SIZE);

      // Insert chunk
      const result = await User.insertMany(
        chunk.map((user) => ({
          Name: user.Name,
          Age: user.Age,
          City: user.City,
        })),
        { ordered: false }
      );

      console.log(`Chunk ${i / CHUNK_SIZE + 1} inserted successfully:`, result);
    }

    console.timeEnd("bulkInsert"); // End timing the operation
    console.log("All users created successfully");
  } catch (error) {
    console.error("Error creating bulk users:", error);
  }
}

export async function getAllUsers() {
  try {
    // connectToDB();

    const users = await User.find();

    return users;
  } catch (error) {
    console.log(error);
  }
}
