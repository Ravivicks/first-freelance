"use server";
import { IAddress, IUser } from "@/types";
import { connectToDB } from "../mongoose";
import User from "../models/user.model";
import Address from "../models/address.modal";
import { generateRandomPassword } from "../utils";
import axios from "axios";

// export async function createNewUser(user: IAddress) {
//   try {
//     const password = generateRandomPassword();
//     await connectToDB();
//     const address = await Address.create({
//       fullName: user.fullName,
//       address: user.address,
//       email: user.email,
//       country: user.country,
//       city: user.city,
//       phone: user.phone,
//       state: user.state,
//       zipcode: user.zipcode,
//     });

//     const result = await User.create({
//       fullName: user.fullName,
//       email: user.email,
//       password: password,
//     });

//     const newClerkUser = await axios.post(
//       "https://api.clerk.dev/v1/users",
//       { email_address: [user.email], password: password },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return JSON.parse(JSON.stringify({ result, address, newClerkUser }));
//   } catch (error) {
//     console.error("Error creating user:", error);
//   }
// }

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
