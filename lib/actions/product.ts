"use server";

import { IProduct } from "@/types";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";

// import { connectToDB } from "../mongodb";

export async function createBulkProducts(products: IProduct[]) {
  try {
    // await connectToDB();
    const result = await Product.insertMany(products);
    // Call revalidatePath if it's a custom function to revalidate static paths in your app
    // If it's not needed, you can remove this line
    // revalidatePath('/');
    return result;
  } catch (error) {
    console.error("Error creating bulk users:", error);
  }
}

export async function getAllProducts(): Promise<IProduct[] | any> {
  try {
    await connectToDB();
    // Use lean() to get plain JavaScript objects
    const products = await Product.find().lean();
    return products.map((product) => ({
      ...product,
      _id: product._id.toString(), // Convert ObjectId to string
    }));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch products");
  }
}
