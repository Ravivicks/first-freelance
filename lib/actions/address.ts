"use server";

import { IAddress } from "@/types";
import Address from "../models/address.modal";
import { connectToDB } from "../mongoose";
import { generateRandomPassword } from "../utils";
import User from "../models/user.model";
import axios from "axios";
import { generateEmailBody, sendEmail } from "../nodemailer";

export async function createNewAddress(user: IAddress) {
  try {
    await connectToDB();

    const password = generateRandomPassword();

    // Create the address
    const address = await Address.create({
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      email: user.email,
      country: user.country,
      city: user.city,
      phone: user.phone,
      state: user.state,
      zipcode: user.zipcode,
    });

    // Check if the user already exists by email
    let existingUser = await User.findOne({ email: user.email });

    if (!existingUser) {
      // If the email is new (user doesn't exist), create a new user
      const newUser = await User.create({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: password,
      });

      // Create a new Clerk user
      try {
        const newClerkUser = await axios.post(
          "https://api.clerk.dev/v1/users",
          {
            email_address: [user.email],
            password: password,
            first_name: user.firstName,
            last_name: user.lastName,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (newClerkUser) {
          const userData = {
            username: user.email,
            password: password,
          };
          const emailContent = await generateEmailBody("NEW_USER", userData);
          const emailRes = await sendEmail(emailContent, [user.email]);
          console.log(emailRes);
        }
      } catch (clerkError: any) {
        console.error(
          "Error creating Clerk user:",
          clerkError.response?.data || clerkError.message
        );
        throw new Error("Failed to create Clerk user.");
      }

      return JSON.parse(JSON.stringify({ result: newUser, address }));
    }

    return JSON.parse(JSON.stringify({ result: existingUser, address }));
  } catch (error: any) {
    console.error("Error creating or updating user:", error);
    throw new Error("Failed to create or update user and address.");
  }
}

export async function getAllAddresses(emailId: string) {
  try {
    connectToDB();

    const addresses = await Address.find({ email: emailId });

    return JSON.parse(JSON.stringify(addresses));
  } catch (error) {
    console.log(error);
  }
}

export async function getAddressById(
  addressId: string
): Promise<IAddress | null> {
  try {
    await connectToDB();

    // Use lean() to get a plain JavaScript object
    const address = await Address.findOne({ _id: addressId });
    return JSON.parse(JSON.stringify(address));
  } catch (error) {
    console.log(error);
    return null;
  }
}
