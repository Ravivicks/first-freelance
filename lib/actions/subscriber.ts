"use server";

import { ISubscriber } from "@/types";
import { connectToDB } from "../mongoose";
import Subscriber from "../models/subscribe.model";

export async function createNewSubcriber(subscriber: ISubscriber) {
  try {
    await connectToDB();
    const result = await Subscriber.create(subscriber);

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Error creating subscriber:", error);
  }
}
