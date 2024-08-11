"use server";

import { EnquireProps, IProduct } from "@/types";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import Enquiry from "../models/enquiry.model";

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
    // return products.map((product) => ({
    //   ...product,
    //   _id: product._id.toString(), // Convert ObjectId to string
    // }));
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch products");
  }
}

export async function getProductById(
  productId: string
): Promise<IProduct | null> {
  try {
    await connectToDB();

    // Use lean() to get a plain JavaScript object
    const product = await Product.findOne({ _id: productId });
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.log(error);
    return null;
  }
}
